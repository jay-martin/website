/******************************************************************************************
 * This file contains the functions the make page-specific color changes when the user
 * switches between light, sepia, and dark modes
 * ****************************************************************************************/

/****** Page Load Colors ******/
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    white_or_black = '#dbdbdb';
    purple_shade = '#cb3ede';
}
else{
    white_or_black = 'black';
    purple_shade = '#770087';
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
	HOHchart.data.colors({
		point: '#dbdbdb',
	});

	regressiveChart.data.colors({
		outline : '#dbdbdb',
	});

	marriagePenaltyChart.data.colors({
		married       : '#dbdbdb',
		point_married : '#dbdbdb', 
		person2 : '#cb3ede',
		person2_dashed : '#cb3ede',
		point2: '#cb3ede',
	});
}

// Changes for light/sepia mode
function light_mode(){
		HOHchart.data.colors({
		point: 'black',
	});

	regressiveChart.data.colors({
		outline : 'black',
	});

	marriagePenaltyChart.data.colors({
		married       : 'black',
		point_married : 'black', 
		person2 : '#770087',
		person2_dashed : '#770087',
		point2 : '#770087',
	});
}