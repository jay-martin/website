/******************************************************************************************
 * This file contains the functions the make page-specific color changes when the user
 * switches between light, sepia, and dark modes
 * ****************************************************************************************/

/******* Page Load Colors ********/
if(color_preference === 'dark'){
    white_or_black = '#dbdbdb';
    purple_shade = '#cb3ede';
    green_shade = '#03c900';
}
else if(color_preference === 'sepia' || color_preference === 'light'){
    white_or_black = 'black';
    purple_shade = '#770087';
    green_shade = '#0c6300';
}
else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    white_or_black = '#dbdbdb';
    purple_shade = '#cb3ede';
    green_shade = '#03c900';
}
else{
    white_or_black = 'black';
    purple_shade = '#770087';
    green_shade = '#0c6300';
}

/** Controls page-specific changes that must be made when toggling between light, sepia, and dark modes
 * @param {string} - the mode the user selects ('light', 'sepia', or 'dark')
 * */
function page_color_mode(mode){
	if(mode == 'dark'){
		dark_mode();
	}
	else if(mode == 'light' || mode == 'sepia'){
		light_mode();
	}
}

// Changes for dark mode
function dark_mode(){
	chart.data.colors({
		total          : '#dbdbdb',
		existing_point : '#dbdbdb',
	});
}

// Changes for light mode
function light_mode(){
	chart.data.colors({
		total          : 'black',
		existing_point : 'black',
	});
}