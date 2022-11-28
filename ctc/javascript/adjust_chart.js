personal_income_tax_isActive = true;
fica_isActive = false;
eitc_isActive = false;
ctc_isActive = false;
snap_isActive = false;
ptc_isActive = false;

function load_data(){
	if(chart_type.value === 'EMTR'){
		load_emtr_data();
	}
	else{
		load_ei_data();
	}
}

function switch_chart(){
	if(chart_type.value === 'EMTR'){
		switch_to_emtr();
	}
	else{
		switch_to_ei();
	}
}

function switch_to_emtr(){
	chart.unload({ids: ['income_tax_and_transfer', 'tangent_line']});
	adjust_axes();
    adjust_y_axis();
	setTimeout(function () {
		load_emtr_data();
	}, 500);
}

function switch_to_ei(){
	chart.unload({ids: ['personal_income_tax', 'fica', 'eitc', 'ctc', 'snap', 'total']});
	adjust_axes();
	adjust_y_axis();
	setTimeout(function () {
		load_ei_data();
	}, 500);
}

function load_emtr_data(){
	numChildren = num_children.value;
	filingStatus = filingstatus.value;
	xVals = [];
	personal = [];
	fica =  [];
	eitc =  [];
	ctc =   [];
	snap =  [];
	ptc =   [];
	total = [];

	xVals = get_x_values_marginal();
	for (var i = 0; i < xVals.length; i++) {
		taxRates = tax_and_transfer_at_income_marginal(xVals[i], numChildren, filingStatus);

		personal[i] = taxRates[0]; 
		fica[i] = taxRates[1];
		eitc[i] = taxRates[2];
		ctc[i] = taxRates[3];
		snap[i] = taxRates[4];
		ptc[i] = taxRates[5]
		total[i] = taxRates[6];
	}

	/* add beginning string */
	xVals.unshift('x');
	personal.unshift('personal_income_tax');
	fica.unshift('fica');
	eitc.unshift('eitc');
	ctc.unshift('ctc');
	snap.unshift('snap');
	ptc.unshift('ptc');
	total.unshift('total');

	/* load relevant charts */
	chart.load({columns: [xVals, total],});
	/*
	if(personal_income_tax_isActive === true){
		chart.load({columns: [xVals, personal]});
	}
	if(fica_isActive === true){
		chart.load({columns: [xVals, fica]});
	}
	if(eitc_isActive === true){
		chart.load({columns: [xVals, eitc]});
	}
	if(ctc_isActive === true){
		chart.load({columns: [xVals, ctc]});
	}
	if(snap_isActive === true){
		chart.load({columns: [xVals, snap]});
	}
	*/
}

function load_ei_data(){
	income_tax_and_transfer = [];
	xVals = get_x_values_effective_income();
	for (var i = 0; i < xVals.length; i++) {
		income_tax_and_transfer[i] = tax_and_transfer_at_income(xVals[i], numChildren)[5];
	}

	/* add beginning string */
	xVals.unshift('x');
	income_tax_and_transfer.unshift('income_tax_and_transfer');

	/* load data */
	chart.load({columns: [xVals, income_tax_and_transfer]});
	add_tangent_line(user_income.value, numChildren);
}

function adjust_axes(){
	if(chart_type.value === 'EMTR'){
        chart.internal.config.axis_y_tick_format = function(value){return d3.format('.0%')(value/100)};
        chart.axis.labels({y: 'Effective Marginal Tax Rate'});
        if(zoom_switch.checked === true){
        	user_income.max = "60000";
            chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
            chart.internal.config.axis_y_tick_values = [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
            chart.axis.max({y: 60});
            chart.axis.min({y: -50});
            chart.axis.max({x: 60000});
        }
        else{
            chart.internal.config.axis_y_tick_values = [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
            chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
            chart.axis.max({y: 60});
            chart.axis.min({y: -50});
            chart.axis.max({x: 600000});
        }
    }
    else{
        chart.internal.config.axis_y_tick_format = d3.format('$,');
        chart.axis.labels({y: 'Difference in Income'});
        if(zoom_switch.checked === true){
        	user_income.max = "40000";
            chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000];
            chart.axis.max({x: 40000});
            chart.internal.config.axis_y_tick_values = [-8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000];
            chart.axis.max({y: 8000});
            chart.axis.min({y: -4000});
        }
        else{
        	user_income.max = "100000";
            chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
            chart.axis.max({x: 100000});
            chart.internal.config.axis_y_tick_values = [-20000, -15000, -10000, -5000, 0, 5000, 10000];
            chart.axis.max({y: 10000});
            chart.axis.min({y: -20000});
        }
    }
}

function adjust_axes_numChildren(){
	numChildren = num_children.value;
	if(numChildren === 'three'){
		chart.axis.max({y: 80});
	}
	else if(numChildren === 'two'){
		chart.axis.max({y: 80});
	}
	else{
		chart.axis.max({y: 60});
	}
}

function add_tangent_line(income, numChildren){
	/* add tangent line */
    slope = slope_at_point(income, numChildren) * -1;
    yInitial = tax_and_transfer_at_income(income, numChildren)[5];

    y0 = slope * (0 - income) + yInitial;
    yEnd = slope * (600000 - income) + yInitial;

    chart.load({columns: [ ['x_tangent', 0, 600000], ['tangent_line', y0, yEnd], ['x_point', income], ['point', yInitial] ] });
}

function add_personal_income_tax(){
	if(personal_income_tax_isActive === false){
		personal_income_tax_isActive = true;
		document.getElementById('tax_brackets_button').style.backgroundColor = '#d1d1d1';
		load_data();
	}
	else{
		personal_income_tax_isActive = false;
		document.getElementById('tax_brackets_button').style.backgroundColor = '#f5f3f2';
		load_data();
		chart.unload('personal_income_tax');
	}
}

function add_fica(){
	if(fica_isActive === false){
		fica_isActive = true;
		document.getElementById('fica_button').style.backgroundColor = '#d1d1d1';
		load_data();
	}
	else{
		fica_isActive = false;
		document.getElementById('fica_button').style.backgroundColor = '#f5f3f2';
		load_data();
		chart.unload('fica');
	}
}

function add_eitc(){
	if(eitc_isActive === false){
		eitc_isActive = true;
		document.getElementById('eitc_button').style.backgroundColor = '#d1d1d1';
		load_data();
	}
	else{
		eitc_isActive = false;
		document.getElementById('eitc_button').style.backgroundColor = '#f5f3f2';
		load_data();
		chart.unload('eitc');
	}
}

function add_ctc(){
	if(ctc_isActive === false){
		ctc_isActive = true;
		document.getElementById('ctc_button').style.backgroundColor = '#d1d1d1';
		load_data();
	}
	else{
		ctc_isActive = false;
		document.getElementById('ctc_button').style.backgroundColor = '#f5f3f2';
		load_data();
		chart.unload('ctc');
	}
}

function add_snap(){
	if(snap_isActive === false){
		snap_isActive = true;
		document.getElementById('snap_button').style.backgroundColor = '#d1d1d1';
		load_data();
	}
	else{
		snap_isActive = false;
		document.getElementById('snap_button').style.backgroundColor = '#f5f3f2';
		load_data();
		chart.unload('snap');
	}
}

function add_ptc(){
	if(ptc_isActive === false){
		ptc_isActive = true;
		document.getElementById('ptc_button').style.backgroundColor = '#d1d1d1';
		load_data();
	}
	else{
		ptc_isActive = false;
		document.getElementById('ptc_button').style.backgroundColor = '#f5f3f2';
		load_data();
		chart.unload('ptc');
	}
}
