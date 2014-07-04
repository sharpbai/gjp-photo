AV.initialize("x64no4s4xs5x22t7qngnabkqwp4qmxt9g3roojw8hd7rabhd", "kjo7tv4wxwzep0n9dhill3reedjf1t86qw72pi1vxeq1b0x9");

function queryString(item){
	var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
	return svalue ? svalue[1] : svalue;
}

function showScore(score, image) {
	document.getElementById('score1').innerHTML = score.toString();
	document.getElementById('score2').innerHTML = score.toString();
	document.getElementById('image').src = image;
}

$(document).ready(function() {
	var Photo = AV.Object.extend("Photo");
	var query = new AV.Query(Photo);
		query.equalTo("hash", queryString('id'));
		query.first({
			success: function(photo) {
				// Successfully retrieved the object.
				showScore(photo.get('score'), 
					'http://sharpbai-gjp-photo.qiniudn.com/' + photo.get('key'));
			},
			error: function(error) {
				//alert("Error: " + error.code + " " + error.message);
			}
	});
});