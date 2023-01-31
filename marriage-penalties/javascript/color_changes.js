/******************************************************************************************
 * This file contains the functions the make page-specific color changes when the user
 * switches between light, sepia, and dark modes
 * ****************************************************************************************/

/**** Page Load Colors *******/
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
	else if(mode == 'light' || mode == 'sepia'){
		light_mode();
	}
}

// Changes for dark mode
function dark_mode(){
	top_chart_chart.data.colors({
		married        : '#dbdbdb',
		point_married  : '#dbdbdb',
		person2        : '#cb3ede',
		person2_dashed : '#cb3ede',
		point2         : '#cb3ede',
	});

	hoh_tax_chart.data.colors({
		married        : '#dbdbdb',
		point_married  : '#dbdbdb',
		person2        : '#cb3ede',
		person2_dashed : '#cb3ede',
		point2         : '#cb3ede',
	});

	single_tax_chart.data.colors({
		married        : '#dbdbdb',
		point_married  : '#dbdbdb',
		person2        : '#cb3ede',
		person2_dashed : '#cb3ede',
		point2         : '#cb3ede',
	});

	eitc_marriage_penalty_chart.data.colors({
		married        : '#dbdbdb',
		point_married  : '#dbdbdb',
		person2        : '#cb3ede',
		person2_dashed : '#cb3ede',
		point2         : '#cb3ede',
	});

	eitcExplainer.data.colors({
		married_plateau  : '#dbdbdb',
		married_phasein  : '#dbdbdb',
		married_phaseout : '#dbdbdb',
		point_married    : '#dbdbdb',
	});

	eitcReform.data.colors({
		married        : '#dbdbdb',
		point_married  : '#dbdbdb',
		person2        : '#cb3ede',
		person2_dashed : '#cb3ede',
		point2         : '#cb3ede',
	});

	existingEITC.data.colors({
		married        : '#dbdbdb',
		point_married  : '#dbdbdb',
		person2        : '#cb3ede',
		person2_dashed : '#cb3ede',
		point2         : '#cb3ede',
	});

	eitc2023.data.colors({
		three_single  : '#03c900',
		three_married : '#03c900',
	});

	eitc2023_full_fix.data.colors({
		three_single  : '#03c900',
		three_married : '#03c900',
	});

	simplerEITC.data.colors({
		married : '#dbdbdb',
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
	top_chart_chart.data.colors({
		married        : 'black',
		point_married  : 'black',
		person2        : '#770087',
		person2_dashed : '#770087',
		point2         : '#770087',
	});

	hoh_tax_chart.data.colors({
		married        : 'black',
		point_married  : 'black',
		person2        : '#770087',
		person2_dashed : '#770087',
		point2         : '#770087',
	});

	single_tax_chart.data.colors({
		married        : 'black',
		point_married  : 'black',
		person2        : '#770087',
		person2_dashed : '#770087',
		point2         : '#770087',
	});

	eitc_marriage_penalty_chart.data.colors({
		married        : 'black',
		point_married  : 'black',
		person2        : '#770087',
		person2_dashed : '#770087',
		point2         : '#770087',
	});

	eitcExplainer.data.colors({
		married_plateau  : 'black',
		maried_phasein   : 'black',
		married_phaseout : 'black',
		point_married    : 'black',
	});

	eitcReform.data.colors({
		married        : 'black',
		point_married  : 'black',
		person2        : '#770087',
		person2_dashed : '#770087',
		point2         : '#770087',
	});

	existingEITC.data.colors({
		married        : 'black',
		point_married  : 'black',
		person2        : '#770087',
		person2_dashed : '#770087',
		point2         : '#770087',
	});

	eitc2023.data.colors({
		three_single  : '#0c6300',
		three_married : '#0c6300',
	});

	eitc2023_full_fix.data.colors({
		three_single  : '#0c6300',
		three_married : '#0c6300',
	});

	simplerEITC.data.colors({
		married : 'black',
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