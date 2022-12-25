/********************************Twitter & Substack Icons**********************************/
function switch_icon(id_current, id_new){
	document.getElementById(id_current).style.display = 'none';
	document.getElementById(id_new).style.display = 'inline-block';
}

function text_color(id, color){
	document.getElementById(id).style.color = color;
}