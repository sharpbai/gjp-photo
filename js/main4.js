AV.initialize("x64no4s4xs5x22t7qngnabkqwp4qmxt9g3roojw8hd7rabhd", "kjo7tv4wxwzep0n9dhill3reedjf1t86qw72pi1vxeq1b0x9");

function addRecord(score, rank, src) {
  var html = '<div class="rank_item fl"><div class="rank_img_wrap"><img src="'
    + src + '" height="180"></div><div class="rank_content cf"><span class="rank fl">No.'
    + rank + '</span><span class="rank_score fr">'
    + score +'分</span></div></div>';
    $("#list").append(html);
}

$(document).ready(function() {
  var Photo = AV.Object.extend("Photo");
    var query = new AV.Query(Photo);
    query.limit(9);
    query.ascending("score");
    query.find({
    success: function(photos) {
      // Successfully retrieved the object.
      for(var i = 0; photos[i]; i++) {
        var photo = photos[i];
        addRecord(photo.get('score'), i + 1,
        'http://sharpbai-gjp-photo.qiniudn.com/' + photo.get('key'));
      }
    },
    error: function(error) {
      //alert("Error: " + error.code + " " + error.message);
    }
  });
});