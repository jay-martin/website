/******************************************************************************************
 * This file contains the functions the make page-specific color changes when the user
 * switches between light, sepia, and dark modes
 * ****************************************************************************************/

/****** Page Load Colors ******/
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    white_or_black = '#dbdbdb';
}
else{
    white_or_black = 'black';
}

/** Controls page-specific changes that must be made when toggling between light, sepia, and dark modes
 * @param {string} - the mode the user selects ('light', 'sepia', or 'dark')
 * */
function page_color_mode(mode){
	if(mode == 'dark'){
		dark_mode();
	}
	else if(mode == 'sepia' || mode == 'light'){
		light_mode();
	}
}

// Changes for dark mode
function dark_mode(){
	chart.data.colors({
		point: '#dbdbdb',
	});
}

// Changes for light mode
function light_mode(){
	chart.data.colors({
		point: 'black',
	});
}