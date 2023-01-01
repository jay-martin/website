/******************************************************************************************
 * This file contains the functions the make page-specific color changes when the user
 * switches between light, sepia, and dark modes
 * ****************************************************************************************/


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