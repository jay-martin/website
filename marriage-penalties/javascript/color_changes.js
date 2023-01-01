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
	MPchart.data.colors({
		married       : '#dbdbdb',
		point_married : '#dbdbdb',
	});

	hohFixChart.data.colors({
		married       : '#dbdbdb',
		point_married : '#dbdbdb',
	});

	eitcExplainer.data.colors({
		married_plateau  : '#dbdbdb',
		married_phasein   : '#dbdbdb',
		married_phaseout : '#dbdbdb',
		point_married    : '#dbdbdb',
	});

	eitcReform.data.colors({
		married       : '#dbdbdb',
		point_married : '#dbdbdb',
	});

	existingEITC.data.colors({
		married       : '#dbdbdb',
		point_married : '#dbdbdb',
	});

	simplerEITC.data.colors({
		married: '#dbdbdb',
	});

	fsaEITC.data.colors({
		childless_single  : '#dbdbdb',
		childless_married : '#dbdbdb',
	});

	standardCredit.data.colors({
		married       : '#dbdbdb',
		point_married : '#dbdbdb',
	});
}

// Changes for light/sepia mode
function light_mode(){
	MPchart.data.colors({
		married       : 'black',
		point_married : 'black',
	});

	hohFixChart.data.colors({
		married       : 'black',
		point_married : 'black',
	});

	eitcExplainer.data.colors({
		married_plateau  : 'black',
		maried_phasein   : 'black',
		married_phaseout : 'black',
		point_married    : 'black',
	});

	eitcReform.data.colors({
		married       : 'black',
		point_married : 'black',
	});

	existingEITC.data.colors({
		married       : 'black',
		point_married : 'black',
	});

	simplerEITC.data.colors({
		married: 'black',
	});

	fsaEITC.data.colors({
		childless_single  : 'black',
		childless_married : 'black',
	});

	standardCredit.data.colors({
		married       : 'black',
		point_married : 'black',
	});
}