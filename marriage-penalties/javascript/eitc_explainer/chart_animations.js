eitc_explainer_currentStep = 0;

function eitc_explainer_next(){
	if(eitc_explainer_currentStep == 0){
		eitc_explainer_step1();
	}
	else if(eitc_explainer_currentStep == 1){
		eitc_explainer_step2();
	}
	else if(eitc_explainer_currentStep == 2){
		eitc_explainer_step3();
	}
	else if(eitc_explainer_currentStep == 3){
		eitc_explainer_step4();
	}
}

function eitc_explainer_back(){
	if(eitc_explainer_currentStep == 1){
		eitc_explainer_reverse_step1();
	}
	else if(eitc_explainer_currentStep == 2){
		eitc_explainer_reverse_step2();
	}
	else if(eitc_explainer_currentStep == 3){
		eitc_explainer_reverse_step3();
	}
	else if(eitc_explainer_currentStep == 4){
		eitc_explainer_reverse_step4();
	}
}

function eitc_explainer_step1(){
	// Disable buttons
	document.getElementById('eitc_explainer_back_button').disabled = true;
	document.getElementById('eitc_explainer_next_button').disabled = true;

	setTimeout(function () {
		eitcExplainer.axis.max({y: 7000});
	}, 500);

	setTimeout(function () {
		eitcExplainer.load({
			columns: [
				['married_plateau', 6000,  6000],
			]
		})
	}, 1500);

	//Enable buttons
	setTimeout(function () {
		document.getElementById('eitc_explainer_back_button').disabled = false;
		document.getElementById('eitc_explainer_next_button').disabled = false;
	}, 1900);
	

	eitc_explainer_currentStep++;
}

function eitc_explainer_reverse_step1(){
	// Disable buttons
	document.getElementById('eitc_explainer_back_button').disabled = true;
	document.getElementById('eitc_explainer_next_button').disabled = true;

	eitcExplainer.load({
		columns: [
			['married_plateau', 3000,  3000],
		]
	});

	setTimeout(function () {
		eitcExplainer.axis.max({y: 4000});
	}, 1000);

	//Enable next button (back button remains disbaled because we're not at step 0)
	setTimeout(function () {
		document.getElementById('eitc_explainer_next_button').disabled = false;
	}, 1400);

	eitc_explainer_currentStep--;
}

function eitc_explainer_step2(){
	// Disable buttons
	document.getElementById('eitc_explainer_back_button').disabled = true;
	document.getElementById('eitc_explainer_next_button').disabled = true;

	eitcExplainer.load({
		columns: [
			['married_phasein', 0, 6000],
		]
	})

	setTimeout(function () {
		eitcExplainer.load({
			columns: [
				['x_phasein',       0,     20000],
				['married_phasein', 0,     6000],
				['x_plateau',       20000, 25000],
				['married_plateau', 6000,  6000],
			]
		})
	}, 1000);

	//Enable buttons
	setTimeout(function () {
		document.getElementById('eitc_explainer_back_button').disabled = false;
		document.getElementById('eitc_explainer_next_button').disabled = false;
	}, 1400);

	eitc_explainer_currentStep++;
}

function eitc_explainer_reverse_step2(){
	// Disable buttons
	document.getElementById('eitc_explainer_back_button').disabled = true;
	document.getElementById('eitc_explainer_next_button').disabled = true;

	eitcExplainer.load({
		columns: [
			['x_phasein',       0,     10000],
			['married_phasein', 0,     6000],
			['x_plateau',       10000, 15000],
			['married_plateau', 6000,  6000],
		]
	});

	setTimeout(function () {
		eitcExplainer.load({
			columns: [
				['married_phasein', 0, 3000],
			]
		})
	}, 1000);

	//Enable buttons
	setTimeout(function () {
		document.getElementById('eitc_explainer_back_button').disabled = false;
		document.getElementById('eitc_explainer_next_button').disabled = false;
	}, 1400);

	eitc_explainer_currentStep--;
}

function eitc_explainer_step3(){
	// Disable buttons
	document.getElementById('eitc_explainer_back_button').disabled = true;
	document.getElementById('eitc_explainer_next_button').disabled = true;

	eitcExplainer.xgrids([ {value: 15000,}, {value: 15000,}, ]);

	setTimeout(function () {
		eitcExplainer.xgrids([ {value: 15000,}, {value: 30000,}, ]);
	}, 1000);

	setTimeout(function () {
		eitcExplainer.load({
			columns: [
				['x_plateau',       20000, 30000],
				['married_plateau', 6000,  6000],
			]
		})
	}, 2000);

	setTimeout(function () {
		eitcExplainer.xgrids([]);
	}, 3000);

	//Enable buttons
	setTimeout(function () {
		document.getElementById('eitc_explainer_back_button').disabled = false;
		document.getElementById('eitc_explainer_next_button').disabled = false;
	}, 3400);
	
	eitc_explainer_currentStep++;
}

function eitc_explainer_reverse_step3(){
	// Disable buttons
	document.getElementById('eitc_explainer_back_button').disabled = true;
	document.getElementById('eitc_explainer_next_button').disabled = true;

	eitcExplainer.xgrids([{value: 15000,}, {value: 30000,},]);

	setTimeout(function () {
		eitcExplainer.load({
			columns: [
				['x_plateau',       20000, 25000],
				['married_plateau', 6000,  6000],
			]
		})
	}, 1000);

	setTimeout(function () {
		eitcExplainer.xgrids([ {value: 15000,}, {value: 15000,}, ]);
	}, 2000);

	setTimeout(function () {
		eitcExplainer.xgrids([]);
	}, 3000);

	//Enable buttons
	setTimeout(function () {
		document.getElementById('eitc_explainer_back_button').disabled = false;
		document.getElementById('eitc_explainer_next_button').disabled = false;
	}, 3400);

	eitc_explainer_currentStep--;
}

function eitc_explainer_step4(){
	// Disable buttons
	document.getElementById('eitc_explainer_back_button').disabled = true;
	document.getElementById('eitc_explainer_next_button').disabled = true;

	eitcExplainer.axis.max({x: 60000});

	setTimeout(function () {
		eitcExplainer.load({
			columns: [
				['x_phaseout',       30000, 60000],
				['married_phaseout', 6000,  0],
			]
		})
	}, 1000);

	// Enable back button (next button remains disabled because there is no next step)
	setTimeout(function () {
		document.getElementById('eitc_explainer_back_button').disabled = false;
	}, 1400);

	eitc_explainer_currentStep++;
}

function eitc_explainer_reverse_step4(){
	// Disable buttons
	document.getElementById('eitc_explainer_back_button').disabled = true;
	document.getElementById('eitc_explainer_next_button').disabled = true;

	eitcExplainer.load({
		columns: [
			['x_phaseout',       15000, 30000],
			['married_phaseout', 3000,  0],
		]
	});

	setTimeout(function () {
		eitcExplainer.axis.max({x: 35000});
	}, 1000);

	// Enable buttons
	setTimeout(function () {
		document.getElementById('eitc_explainer_back_button').disabled = false;
		document.getElementById('eitc_explainer_next_button').disabled = false;
	}, 1400);

	eitc_explainer_currentStep--;
}

