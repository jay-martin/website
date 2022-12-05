function reveal_status_line(criteria){
	if(criteria === 'disability'){
		disability_status('disability_status');
	}
	else if(criteria === 'catElg'){
		categorical_eligibility('cat_elg_status');
	}
}

function disability_status(id){
	if(blind_elderly.value === 'yes' || disabled.value === 'yes'){
		document.getElementById(id).style.display = 'block';
		document.getElementById(id).innerHTML = '<b>Eligible</b>';
		document.getElementById(id).style.color = 'green';
	}
	else if(disabled.value === 'no' && blind_elderly.value === 'no'){
		document.getElementById(id).style.display = 'block';
		document.getElementById(id).innerHTML = '<b>Ineligible</b>';
		document.getElementById(id).style.color = 'red';
	}
	else{
		document.getElementById(id).innerHTML = 'Uncertain';
		document.getElementById(id).style.color = '#919191';
	}
}

function categorical_eligibility(id){
	if(cat_elg.value === 'yes'){
		document.getElementById(id).style.display = 'block';
		document.getElementById(id).innerHTML = '<b>Yes</b>';
		document.getElementById(id).style.color = 'green';
	}
	else if(cat_elg.value === 'no'){
		document.getElementById(id).style.display = 'block';
		document.getElementById(id).innerHTML = '<b>No</b>';
		document.getElementById(id).style.color = 'red';
	}
	else{
		document.getElementById(id).innerHTML = 'Uncertain';
		document.getElementById(id).style.color = '#919191';
	}
}