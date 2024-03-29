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
	else if(mode == 'sepia'){
		sepia_mode();
	}
	else if(mode == 'light'){
		light_mode();
	}
}

// Changes for dark mode
function dark_mode(){

}

// Changes for sepia mode
function sepia_mode(){

}

// Changes for light mode
function light_mode(){

}