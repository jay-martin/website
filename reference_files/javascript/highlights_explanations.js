/******************************************************************************************
 * This file contains the functions that open and close highlights
 * ****************************************************************************************/

function show_explanation1(){
	if(isMobile){
		container = document.getElementById('highlights_container1_mobile');
		heights = highlights_heights_mobile;
	}
	else{
		container = document.getElementById('highlights_container1');
		heights = highlights_heights;
	}

	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = heights[0];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation2(){
	if(isMobile){
		container = document.getElementById('highlights_container2_mobile');
		heights = highlights_heights_mobile;
	}
	else{
		container = document.getElementById('highlights_container2');
		heights = highlights_heights;
	}

	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = heights[1];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation3(){
	if(isMobile){
		container = document.getElementById('highlights_container3_mobile');
		heights = highlights_heights_mobile;
	}
	else{
		container = document.getElementById('highlights_container3');
		heights = highlights_heights;
	}

	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = heights[2];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation4(){
	if(isMobile){
		container = document.getElementById('highlights_container4_mobile');
		heights = highlights_heights_mobile;
	}
	else{
		container = document.getElementById('highlights_container4');
		heights = highlights_heights;
	}

	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = heights[3];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation5(){
	if(isMobile){
		container = document.getElementById('highlights_container5_mobile');
		heights = highlights_heights_mobile;
	}
	else{
		container = document.getElementById('highlights_container5');
		heights = highlights_heights;
	}

	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = heights[4];
	}
	else{
		container.style.height = '0px';
	}
}

function show_explanation6(){
	if(isMobile){
		container = document.getElementById('highlights_container6_mobile');
		heights = highlights_heights_mobile;
	}
	else{
		container = document.getElementById('highlights_container6');
		heights = highlights_heights;
	}

	const height = window.getComputedStyle(container).height;
	if(height === '0px'){
		container.style.height = heights[5];
		/* This is the bottom button: the bottom border needs to be straightened out after expanding */
		document.getElementById('bottom_button').style.borderBottomRightRadius = '0px';
		document.getElementById('bottom_button').style.borderBottomLeftRadius = '0px';
	}
	else{
		container.style.height = '0px';
		/* This is the bottom button: the bottom border edges need to be smoothed out after contracting */
		document.getElementById('bottom_button').style.borderBottomRightRadius = '5px';
		document.getElementById('bottom_button').style.borderBottomLeftRadius = '5px';
	}
}
