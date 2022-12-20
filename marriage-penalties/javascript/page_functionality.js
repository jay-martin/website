spongebobMeme = false;

function show_spongebob_meme(){
	if(spongebobMeme){
		document.getElementById('spongebob_meme').style.display = 'none';
		document.getElementById('eitc_2023').style.display = 'block';
		document.getElementById('meme_button').value = 'Meme Version';
		spongebobMeme = false;
	}
	else{
		document.getElementById('eitc_2023').style.display = 'none';
		document.getElementById('spongebob_meme').style.display = 'block';
		document.getElementById('meme_button').value = 'Chart';
		spongebobMeme = true;
	}
}