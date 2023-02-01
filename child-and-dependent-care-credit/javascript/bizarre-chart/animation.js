var bizarre_timeout;

function start_bizarre_animation(){
	step1();
}

function stop_bizarre_animation() {
    clearTimeout(bizarre_timeout);
}

function step1(){
	bizarre_chart.hide(['childcare_cost_max', 'credit_rate', 'single_one', 'hoh_one', 'married_one']);
	bizarre_chart.legend.hide(['single_one', 'hoh_one', 'married_one']);
	bizarre_timeout = setTimeout(step2, 1000);
}

function step2(){
	bizarre_chart.load({
		columns: [
			['childcare_cost_max', 0, 0],
		]
	});

	document.getElementById('bizarre_output').innerHTML = "For families with one child, the CDCC allows up to $3,000 worth of childcare expenses to be used for the credit.";
	bizarre_timeout = setTimeout(step3, 1000);
}

function step3(){
	bizarre_chart.show(['childcare_cost_max']);
	bizarre_chart.load({
		columns: [
			['childcare_cost_max', 3000, 3000],
		]
	});
	bizarre_timeout = setTimeout(step4, 1000);
}

function step4(){
	document.getElementById('bizarre_output').innerHTML = "However, the full value of childcare costs cannot be subtracted from your tax liability.";
	bizarre_timeout = setTimeout(step5, 1000);
}

function step5(){
	document.getElementById('bizarre_output').innerHTML = "Instead, you multiply the value of your childcare costs by a <em>credit rate</em>.";
	bizarre_timeout = setTimeout(step6, 1000);
}

function step6(){
	document.getElementById('bizarre_output').innerHTML = "Is this a single, simple credit rate that applies to everyone? Say, of 35%?";
	bizarre_chart.load({
		columns: [
			['x_credit_rate', 0, 60000],
			['credit_rate',   0, 0],
		]
	});

	bizarre_timeout = setTimeout(step7, 1000);
}

function step7(){
	bizarre_chart.show(['credit_rate']);
	bizarre_chart.load({
		columns: [
			['credit_rate', .35, .35],
		]
	});

	bizarre_timeout = setTimeout(step8, 1000);
}

function step8(){
	bizarre_chart.hide(['credit_rate']);

	document.getElementById('bizarre_output').innerHTML = "Of course not. That would be much too convenient, and we can't have that.";
	bizarre_timeout = setTimeout(step9, 1000);
}

function step9(){
	bizarre_chart.load({
		columns: [
			['x_credit_rate',       0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,   0,   0,   0,    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,],
			['credit_rate_line',   .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35, .35,],
		]
	});

	bizarre_chart.load({
		columns: [
			['x_credit_rate',    0,   15000, 15001, 17000, 17001, 19000, 19001, 21000, 21001, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000,],
			['credit_rate',    .35, .35,   .34,   .34,   .33,   .33,   .32,   .32,   .31,   .31,   .30,   .30,   .29,   .29,   .28,   .28,   .27,   .27,   .26,   .26,   .25,   .25,   .24,   .24,   .23,   .23,   .22,   .22,   .21,   .21,   .20,   .20, ],
		]
	});

	document.getElementById('bizarre_output').innerHTML = "The credit rate is instead a bizarre step-wise function that looks like this:";
	bizarre_timeout = setTimeout(step10, 2000);
}

function step10(){
	construct_rate();
}


