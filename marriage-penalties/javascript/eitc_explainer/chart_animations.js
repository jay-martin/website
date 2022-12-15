eitc_explainer_currentStep = 0;
eitc_explainer_text = document.querySelector('.explainer_text_container');

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

	// Show text
	document.getElementById('eitc_explainer_start_prompt').style.display = 'none';
	document.getElementById('eitc_explainer_step1').style.display = 'block';
	$('#eitc_explainer_step1A_text').css('border-right', '.15em solid #adadad');
	$('#eitc_explainer_step1A_text').addClass('type_text');

	setTimeout(function () {
		//Next text line
		document.getElementById('eitc_explainer_step1A_text').style.width = '100%';
		document.getElementById('eitc_explainer_step1A_text').style.border = 'none';
		$('#eitc_explainer_step1A_text').removeClass('type_text');

		$('#eitc_explainer_step1B_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step1B_text').addClass('type_text');
	}, 3000);


	setTimeout(function () {
		eitcExplainer.ygrids([{value: 3000}]);
	}, 5500);

	setTimeout(function () {
		//Next text line
		document.getElementById('eitc_explainer_step1B_text').style.width = '100%';
		document.getElementById('eitc_explainer_step1B_text').style.border = 'none';
		$('#eitc_explainer_step1B_text').removeClass('type_text');

		$('#eitc_explainer_step1C_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step1C_text').addClass('type_text_medium');
	}, 7000);

	setTimeout(function () {
		eitcExplainer.axis.max({y: 7000});
	}, 9000);

	setTimeout(function () {
		eitcExplainer.ygrids([{value: 6000}]);
	}, 10000);

	setTimeout(function () {
		//Next text line
		document.getElementById('eitc_explainer_step1C_text').style.width = '100%';
		document.getElementById('eitc_explainer_step1C_text').style.border = 'none';
		$('#eitc_explainer_step1C_text').removeClass('type_text');

		$('#eitc_explainer_step1D_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step1D_text').addClass('type_text');
	}, 12000);

	setTimeout(function () {
		//Next text line
		document.getElementById('eitc_explainer_step1D_text').style.width = '100%';
		document.getElementById('eitc_explainer_step1D_text').style.border = 'none';
		$('#eitc_explainer_step1D_text').removeClass('type_text');

		$('#eitc_explainer_step1E_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step1E_text').addClass('type_text');
	}, 15000);

	setTimeout(function () {
		eitcExplainer.load({
			columns: [
				['married_plateau', 6000,  6000],
				['married_phaseout', 6000],
			]
		})
	}, 18000);

	setTimeout(function () {
		eitcExplainer.hide(['point1', 'point2']);
		eitcExplainer.xgrids([]);
		eitcExplainer.ygrids([]);
	}, 19000);

	setTimeout(function () {
		// Enable buttons
		document.getElementById('eitc_explainer_back_button').disabled = false;
		document.getElementById('eitc_explainer_next_button').disabled = false;
	}, 19400);

	eitc_explainer_currentStep++;
}

function eitc_explainer_step2(){
	// Disable buttons
	document.getElementById('eitc_explainer_back_button').disabled = true;
	document.getElementById('eitc_explainer_next_button').disabled = true;

	// Show text
	document.getElementById('eitc_explainer_step1').style.display = 'none';
	document.getElementById('eitc_explainer_step2').style.display = 'block';
	$('#eitc_explainer_step2A_text').css('border-right', '.15em solid #adadad');
	$('#eitc_explainer_step2A_text').addClass('type_text');

	setTimeout(function () {
		eitcExplainer.show('point2');
		eitcExplainer.load({
			columns: [
				['x_point2', 10000,],
				['point2',   3000,],
			]
		});
	}, 2500);

	setTimeout(function () {
		// Show text
		document.getElementById('eitc_explainer_step2A_text').style.width = '100%';
		document.getElementById('eitc_explainer_step2A_text').style.border = 'none';
		$('#eitc_explainer_step2A_text').removeClass('type_text');

		$('#eitc_explainer_step2B_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step2B_text').addClass('type_text');
	}, 4500);

	setTimeout(function () {
		eitcExplainer.xgrids([ {value: 10000}]);
		eitcExplainer.ygrids([ {value: 3000}]);
	}, 6500);

	setTimeout(function () {
		// Show text
		document.getElementById('eitc_explainer_step2B_text').style.width = '100%';
		document.getElementById('eitc_explainer_step2B_text').style.border = 'none';
		$('#eitc_explainer_step2B_text').removeClass('type_text');

		$('#eitc_explainer_step2C_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step2C_text').addClass('type_text');
	}, 8000);

	setTimeout(function () {
		eitcExplainer.xgrids([ {value: 20000}]);
		eitcExplainer.ygrids([ {value: 6000}]);
		eitcExplainer.load({
			columns: [
				['x_point2', 20000,],
				['point2',   6000,],
			]
		})
	}, 10500);

	setTimeout(function () {
		// Show text
		document.getElementById('eitc_explainer_step2C_text').style.width = '100%';
		document.getElementById('eitc_explainer_step2C_text').style.border = 'none';
		$('#eitc_explainer_step2C_text').removeClass('type_text');

		$('#eitc_explainer_step2D_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step2D_text').addClass('type_text_medium');
	}, 12000);


	setTimeout(function () {
		eitcExplainer.load({
			columns: [
				['x_phasein',       0,     20000],
				['married_phasein', 0,     6000],
			]
		})
	}, 15000);

	setTimeout(function () {
		eitcExplainer.load({
			columns: [
				['x_plateau',       20000, 25000],
				['married_plateau', 6000,  6000],
				['x_phaseout',       25000],
				['married_phaseout', 6000],
			]
		})
	}, 16000);

	setTimeout(function () {
		eitcExplainer.xgrids([]);
		eitcExplainer.ygrids([]);
		eitcExplainer.hide('point2');
	}, 17000);

	setTimeout(function () {
		// Show text
		document.getElementById('eitc_explainer_step2D_text').style.width = '100%';
		document.getElementById('eitc_explainer_step2D_text').style.border = 'none';
		$('#eitc_explainer_step2D_text').removeClass('type_text');

		$('#eitc_explainer_step2E_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step2E_text').addClass('type_text');
	}, 18000);

	setTimeout(function () {
		// Show text
		document.getElementById('eitc_explainer_step2E_text').style.width = '100%';
		document.getElementById('eitc_explainer_step2E_text').style.border = 'none';
		$('#eitc_explainer_step2E_text').removeClass('type_text');

		$('#eitc_explainer_step2F_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step2F_text').addClass('type_text');
	}, 20000);

	//Enable buttons
	setTimeout(function () {
		document.getElementById('eitc_explainer_back_button').disabled = false;
		document.getElementById('eitc_explainer_next_button').disabled = false;
	}, 22000);

	eitc_explainer_currentStep++;
}

function eitc_explainer_step3(){
	// Disable buttons
	document.getElementById('eitc_explainer_back_button').disabled = true;
	document.getElementById('eitc_explainer_next_button').disabled = true;

	// Show text
	document.getElementById('eitc_explainer_step2').style.display = 'none';
	document.getElementById('eitc_explainer_step3').style.display = 'block';
	$('#eitc_explainer_step3A_text').css('border-right', '.15em solid #adadad');
	$('#eitc_explainer_step3A_text').addClass('type_text');

	setTimeout(function () {
		eitcExplainer.load({
			columns: [
				['x_point2', 15000],
				['point2',   3000],
			]
		});
		eitcExplainer.show('point2');
	}, 2500);

	setTimeout(function () {
		document.getElementById('eitc_explainer_step3A_text').style.width = '100%';
		document.getElementById('eitc_explainer_step3A_text').style.border = 'none';
		$('#eitc_explainer_step3A_text').removeClass('type_text');

		$('#eitc_explainer_step3B_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step3B_text').addClass('type_text');
	}, 3500);

	setTimeout(function () {
		eitcExplainer.xgrids([ {value: 15000,},]);
		eitcExplainer.ygrids([ {value: 3000},]);
	}, 6000);

	setTimeout(function () {
		document.getElementById('eitc_explainer_step3B_text').style.width = '100%';
		document.getElementById('eitc_explainer_step3B_text').style.border = 'none';
		$('#eitc_explainer_step3B_text').removeClass('type_text');

		$('#eitc_explainer_step3C_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step3C_text').addClass('type_text');
	}, 7000);

	setTimeout(function () {
		eitcExplainer.xgrids([  {value: 30000,},]);
		eitcExplainer.ygrids([  {value: 6000}]);
		eitcExplainer.load({
			columns: [
				['x_point2', 30000],
				['point2',   6000],
			]
		});
	}, 10000);

	setTimeout(function () {
		eitcExplainer.ygrids([]);
	}, 11000);

	setTimeout(function () {
		document.getElementById('eitc_explainer_step3C_text').style.width = '100%';
		document.getElementById('eitc_explainer_step3C_text').style.border = 'none';
		$('#eitc_explainer_step3C_text').removeClass('type_text');

		$('#eitc_explainer_step3D_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step3D_text').addClass('type_text');
	}, 12000);

	setTimeout(function () {
		document.getElementById('eitc_explainer_step3D_text').style.width = '100%';
		document.getElementById('eitc_explainer_step3D_text').style.border = 'none';
		$('#eitc_explainer_step3D_text').removeClass('type_text');

		$('#eitc_explainer_step3E_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step3E_text').addClass('type_text');
	}, 14000);

	setTimeout(function () {
		eitcExplainer.load({
			columns: [
				['x_plateau',       20000, 30000],
				['married_plateau', 6000,  6000],
			]
		});
	}, 17000);

	setTimeout(function () {
		eitcExplainer.hide('point2');
		eitcExplainer.xgrids([]);
		eitcExplainer.load({
			columns: [
				['x_phaseout',       29999, 30000],
				['married_phaseout', 6000,  6000],
			]
		});
	}, 18500);

	//Enable buttons
	setTimeout(function () {
		document.getElementById('eitc_explainer_back_button').disabled = false;
		document.getElementById('eitc_explainer_next_button').disabled = false;
	}, 18900);
	
	eitc_explainer_currentStep++;
}

function eitc_explainer_step4(){
	// Disable buttons
	document.getElementById('eitc_explainer_back_button').disabled = true;
	document.getElementById('eitc_explainer_next_button').disabled = true;

	// Show text
	document.getElementById('eitc_explainer_step3').style.display = 'none';
	document.getElementById('eitc_explainer_step4').style.display = 'block';
	$('#eitc_explainer_step4A_text').css('border-right', '.15em solid #adadad');
	$('#eitc_explainer_step4A_text').addClass('type_text');

	setTimeout(function () {
		eitcExplainer.show(['point2',]);
		eitcExplainer.load({
			columns: [
				['x_point2', 30000],
				['point2',   0],
				['x_point1', 50000],
				['point1',   0],
			]
		});
	}, 3000);

	setTimeout(function () {
		document.getElementById('eitc_explainer_step4A_text').style.width = '100%';
		document.getElementById('eitc_explainer_step4A_text').style.border = 'none';
		$('#eitc_explainer_step4A_text').removeClass('type_text');

		$('#eitc_explainer_step4B_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step4B_text').addClass('type_text');
	}, 4500);

	setTimeout(function () {
		eitcExplainer.xgrids([ {value: 30000, text: 'Person 1 Income'}, {value: 30000, text: 'Person 2 Income', position: 'middle'} ]);
		eitcExplainer.ygrids([ {value: 0},]);
	}, 7000);

	setTimeout(function () {
		eitcExplainer.axis.max({x : 70000})
	}, 8000);

	setTimeout(function () {
		eitcExplainer.xgrids([{value: 30000, text: 'Person 1 Income'}, {value: 30000, text: 'Person 2 Income', position: 'middle'}, {value: 60000, text: 'Combined Income'} ]);
	}, 9000);

	setTimeout(function () {
		document.getElementById('eitc_explainer_step4B_text').style.width = '100%';
		document.getElementById('eitc_explainer_step4B_text').style.border = 'none';
		$('#eitc_explainer_step4B_text').removeClass('type_text');

		$('#eitc_explainer_step4C_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step4C_text').addClass('type_text');
	}, 10000);

	setTimeout(function () {
		eitcExplainer.xgrids([ {value: 20000, text: 'Person 1 Income'}, {value: 30000, text: 'Person 2 Income', position: 'middle'}, {value: 50000, text: 'Combined Income'}]);
		eitcExplainer.ygrids([ {value: 2000}]);
		eitcExplainer.load({
			columns: [
				['x_point2', 20000],
				['point2',   2000],
			]
		});
	}, 14000);

	setTimeout(function () {
		document.getElementById('eitc_explainer_step4C_text').style.width = '100%';
		document.getElementById('eitc_explainer_step4C_text').style.border = 'none';
		$('#eitc_explainer_step4C_text').removeClass('type_text');

		$('#eitc_explainer_step4D_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step4D_text').addClass('type_text');
	}, 16000);

	setTimeout(function () {
		eitcExplainer.show('point1');
		eitcExplainer.load({
			columns: [
				['x_point1', 50000],
				['point1',   2000],
			]
		});
	}, 19000);

	setTimeout(function () {
		document.getElementById('eitc_explainer_step4D_text').style.width = '100%';
		document.getElementById('eitc_explainer_step4D_text').style.border = 'none';
		$('#eitc_explainer_step4D_text').removeClass('type_text');

		$('#eitc_explainer_step4E_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step4E_text').addClass('type_text');
	}, 21000);

	setTimeout(function () {
		eitcExplainer.xgrids([ {value: 22500, text: 'Person 1 Income'}, {value: 30000, text: 'Person 2 Income', position: 'middle'}, {value: 52500, text: 'Combined Income'}]);
		eitcExplainer.ygrids([ {value: 1500}]);
		eitcExplainer.load({
			columns: [
				['x_point2', 22500],
				['point2',   1500],
				['x_point1', 52500],
				['point1',   1500],
			]
		});
	}, 24000);

	setTimeout(function () {
		eitcExplainer.xgrids([ {value: 25000, text: 'Person 1 Income'}, {value: 30000, text: 'Person 2 Income', position: 'middle'}, {value: 55000, text: 'Combined Income'}]);
		eitcExplainer.ygrids([ {value: 1000}]);
		eitcExplainer.load({
			columns: [
				['x_point2', 25000],
				['point2',   1000],
				['x_point1', 55000],
				['point1',   1000],
			]
		});
	}, 25000);

	setTimeout(function () {
		eitcExplainer.xgrids([ {value: 27500, text: 'Person 1 Income'}, {value: 30000, text: 'Person 2 Income', position: 'middle'}, {value: 57500, text: 'Combined Income'}]);
		eitcExplainer.ygrids([ {value: 500}]);
		eitcExplainer.load({
			columns: [
				['x_point2', 27500],
				['point2',   500],
				['x_point1', 57500],
				['point1',   500],
			]
		});
	}, 26000);

	setTimeout(function () {
		eitcExplainer.xgrids([ {value: 30000, text: 'Person 1 Income'}, {value: 30000, text: 'Person 2 Income', position: 'middle'}, {value: 60000, text: 'Combined Income'}]);
		eitcExplainer.ygrids([ {value: 0}]);
		eitcExplainer.load({
			columns: [
				['x_point2', 30000],
				['point2',   0],
				['x_point1', 60000],
				['point1',   0],
			]
		});
	}, 27000);

	setTimeout(function () {
		document.getElementById('eitc_explainer_step4E_text').style.width = '100%';
		document.getElementById('eitc_explainer_step4E_text').style.border = 'none';
		$('#eitc_explainer_step4E_text').removeClass('type_text');

		$('#eitc_explainer_step4F_text').css('border-right', '.15em solid #adadad');
		$('#eitc_explainer_step4F_text').addClass('type_text');
	}, 29000);

	setTimeout(function () {
		eitcExplainer.load({
			columns: [
				['x_phaseout',       30000, 60000],
				['married_phaseout', 6000,  0],
			]
		})
	}, 32000);

	setTimeout(function () {
		eitcExplainer.xgrids([]);
		eitcExplainer.ygrids([]);
		eitcExplainer.hide(['point1', 'point2']);
	}, 33000);

	// Enable back button (next button remains disabled because there is no next step)
	setTimeout(function () {
		document.getElementById('eitc_explainer_back_button').disabled = false;
	}, 33400);

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

