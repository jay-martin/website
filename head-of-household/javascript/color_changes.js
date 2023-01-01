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
	});
}