/******************************************************************************************
 * This file contains the functions the make page-specific color changes when the user
 * switches between light, sepia, and dark modes
 * ****************************************************************************************/

/****** Page Load Colors *******/
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
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
	else if(mode == 'sepia' || mode=='light'){
		light_mode();
	}
}

// Changes for dark mode
function dark_mode(){
    mp_chart.data.colors({
        married : '#dbdbdb',
        point_married : '#dbdbdb',
    });
}

// Changes for light/sepia mode
function light_mode(){
    mp_chart.data.colors({
        married : 'black',
        point_married : 'black',
    });
}