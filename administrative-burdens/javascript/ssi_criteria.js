isDisabled = 'uncertain';
grossIncome = 0;
countableIncome = -10; // values less than zero mean countable income is uncertain based on current user inputs
assetsValue = -10; // values less than zero mean the value of assets is uncertain based on current user inputs

function check_eligibility(){
	if(isDisabled === 'notDisabled'){
		document.getElementById('eligibility_status').innerHTML = '<em><b>Not Eligible</b></em>';
		document.getElementById('eligibility_status').style.color = 'red';
	}
	else if(countable_income_not_blind.value >= 914){
		document.getElementById('eligibility_status').innerHTML = '<em><b>Not Eligible</b></em>';
		document.getElementById('eligibility_status').style.color = 'red';
	}
	else if(assets.value > 2000){
		document.getElementById('eligibility_status').innerHTML = '<em><b>Not Eligible</b></em>';
		document.getElementById('eligibility_status').style.color = 'red';
	}
	else if(isDisabled === 'disabled' && (countableIncome < 914 && countableIncome >= 0) && (assetsValue <= 2000 && assetsValue >= 0)){
		document.getElementById('eligibility_status').innerHTML = '<em><b>Eligible</b></em>';
		document.getElementById('eligibility_status').style.color = 'green';
	}
	else{
		document.getElementById('eligibility_status').innerHTML = '<em><b>Not Enough Information</b></em>';
		document.getElementById('eligibility_status').style.color = '#919191';
	}
}

function calculate_gross_income(){
	earnedIncome = earned_income.value;
	unearnedIncome = unearned_income.value;

	grossIncome = earned_income + unearned_income;
}

function calculate_countable_income(){
	earnedIncome = earned_income.value;
	unearnedIncome = unearned_income.value;

	remainder = 0;
	if(unearnedIncome < 20){
		unearnedIncome = 0;
		remainder = 20 - unearnedIncome;
	}
	else{
		unearnedIncome -= 20;
	}

	if(earnedIncome < (remainder + 65)){
		earnedIncome = 0;
	}
	else{
		earnedIncome = earnedIncome - remainder - 65;
		earnedIncome = parseInt(.5 * earnedIncome);
	}

	countableIncome = earnedIncome + unearnedIncome;
	console.log(countableIncome);
}

function reveal_status_line(criteria){
	if(criteria === 'disability'){
		disability_status('disability_status');
	}
	else if(criteria === 'catElg'){
		categorical_eligibility('cat_elg_status');
	}
	else if(criteria === 'countableIncome'){
		countable_income('countable_income_eligibility');
	}
	else if(criteria === 'assets'){
		asset_test('asset_eligibility')
	}
}

function disability_status(id){
	if(blind_elderly.value === 'yes' || disabled.value === 'yes'){
		document.getElementById(id).innerHTML = '<b>Eligible</b>';
		document.getElementById(id).style.color = 'green';
		isDisabled = 'disabled';
	}
	else if(disabled.value === 'no' && blind_elderly.value === 'no'){
		document.getElementById(id).innerHTML = '<b>Ineligible</b>';
		document.getElementById(id).style.color = 'red';
		isDisabled = 'notDisabled';
	}
	else{
		document.getElementById(id).innerHTML = 'Uncertain';
		document.getElementById(id).style.color = '#919191';
		isDisabled = 'uncertain';
	}
}

function countable_income(id){
	if(countable_income_not_blind.value != countableIncome){}
	else if(countable_income_not_blind.value > 914){
		document.getElementById(id).innerHTML = '<b>Ineligible</b>';
		document.getElementById(id).style.color = 'red';
	}
	else{
		document.getElementById(id).innerHTML = '<b>Eligible</b>';
		document.getElementById(id).style.color = 'green';
	}
}

function asset_test(id){
	if(assets.value > 2000){
		document.getElementById(id).innerHTML = '<b>Ineligible</b>';
		document.getElementById(id).style.color = 'red';
	}
	else{
		document.getElementById(id).innerHTML = '<b>Eligible</b>';
		document.getElementById(id).style.color = 'green';
	}
}