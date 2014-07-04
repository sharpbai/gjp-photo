/*global Qiniu */
/*global plupload */
/*global FileProgress */
/*global hljs */
AV.initialize("x64no4s4xs5x22t7qngnabkqwp4qmxt9g3roojw8hd7rabhd", "kjo7tv4wxwzep0n9dhill3reedjf1t86qw72pi1vxeq1b0x9");

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function uploadToAvos(hash, key, score, callback) {
    var Photo = AV.Object.extend("Photo");
    var photo = new Photo();
    photo.set("score", score);
    photo.set("key", key);
    photo.set("hash", hash);
    photo.save(null, {
      success: function(photo) {
        // Execute any logic that should take place after the object is saved.
        console.log('Upload to Avos successful');
        callback();
      },
      error: function(photo, error) {
        // Execute any logic that should take place if the save fails.
        // error is a AV.Error with an error code and description.
        if(error.code === 137) {
            alert('This photo has been uploaded\nPlease upload another photo');
        } else {
            alert('Sorry, upload failed');
        }
        console.log('Upload to Avos failed: ' + error.description);
      }
    });
}

function showScoreAndShare(score, hash) {
    document.location = "result.html?id=" + hash;
}

var uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4',
    browse_button: 'pickfiles',
    container: 'container',
    drop_element: 'container',
    max_file_size: '100mb',
    flash_swf_url: 'js/plupload/Moxie.swf',
    dragdrop: true,
    chunk_size: '4mb',
    uptoken_url: '/token',
    domain: 'http://sharpbai-gjp-photo.qiniudn.com/',
    // unique_names: true,
    // save_key: true,
    // x_vars: {
    //     'id': '1234',
    //     'time': function(up, file) {
    //         var time = (new Date()).getTime();
    //         // do something with 'time'
    //         return time;
    //     },
    // },
    auto_start: true,
    init: {
        'FilesAdded': function(up, files) {
            //$('table').show();
            //$('#success').hide();
            //plupload.each(files, function(file) {
            //    var progress = new FileProgress(file, 'fsUploadProgress');
            //    progress.setStatus("等待...");
            //});
        },
        'BeforeUpload': function(up, file) {
            //var progress = new FileProgress(file, 'fsUploadProgress');
            //var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
            //if (up.runtime === 'html5' && chunk_size) {
            //    progress.setChunkProgess(chunk_size);
            //}
        },
        'UploadProgress': function(up, file) {
            //var progress = new FileProgress(file, 'fsUploadProgress');
            //var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
            //progress.setProgress(file.percent + "%", up.total.bytesPerSec, chunk_size);

        },
        'UploadComplete': function() {
            //$('#success').show();
        },
        'FileUploaded': function(up, file, info) {
            //var progress = new FileProgress(file, 'fsUploadProgress');
            //progress.setComplete(up, info);
            info = JSON.parse(info);
            var score = - Math.floor(Math.random() * 256);
            console.log(info.hash);
            console.log(info.key);
            uploadToAvos(info.hash, info.key, score, function() {
                showScoreAndShare(score, info.hash);
            });

        },
        'Error': function(up, err, errTip) {
            //$('table').show();
            //var progress = new FileProgress(err.file, 'fsUploadProgress');
            //progress.setError();
            //progress.setStatus(errTip);
            alert(errTip);
        },
        'Key': function(up, file) {
            var key = file.name;
            var n = key.lastIndexOf('.');
            key = guid() + key.substr(n);
            return key;
        }
    }
});

uploader.bind('FileUploaded', function() {
    console.log('hello man,a file is uploaded');
});

$(function() {
    $('#container').on(
        'dragenter',
        function(e) {
            e.preventDefault();
            $('#container').addClass('draging');
            e.stopPropagation();
        }
    ).on('drop', function(e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragleave', function(e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragover', function(e) {
        e.preventDefault();
        $('#container').addClass('draging');
        e.stopPropagation();
    });
});
