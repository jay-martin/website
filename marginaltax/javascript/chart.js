/*DEFAULT GRAPH: Standard deduction for both single filer & HOH */
var chart = c3.generate({
    bindto: '#chart',
    data: {
        xs: {
            total : 'x',
            personal_income_tax : 'x',
            fica : 'x',
            eitc : 'x',
            ctc : 'x',
            snap : 'x',
            ptc : 'x',
            baseline_income : 'x',
            income_tax_and_transfer : 'x',
            tangent_line : 'x_tangent',
            point: 'x_point',
        },
        columns: [
            ['x',                   0, 12949, 12950, 23224, 23225, 54724, 54725, 102024, 102025, 182999, 183000, 228899, 228900, 552849, 552850, 600000],
            ['total',               0, 0,     10,    10,    12,    12,    22,    22,     24,     24,     32,     32,     35,     35,     37,     37],
            ['x_point', 50000],
            ['point', 12],
        ],
        types: {
            total: 'area',
            personal_income_tax: 'line',
            fica: 'line',
            eitc: 'line',
            snap: 'line',
            ptc:  'line',
            income_tax_and_transfer: 'line',
            tangent_line: 'line',
            point: 'line',
        },
        names: {
            total: 'Effective Marginal Tax Rate',
            personal_income_tax: 'Personal Income Tax',
            fica: 'FICA Tax',
            eitc: 'Earned income tax credit',
            ctc:  'Child tax credit',
            snap: 'SNAP (Food Stamps)',
            ptc:  'Medicaid & Premium Tax Credits',
            income_tax_and_transfer: 'Difference between Income after Taxes & Transfers and Employment Income',
            tangent_line: 'Effective Marginal Tax Rate Tangent Line',
        },
        colors: {
            total: '#f7c22f',
            personal_income_tax:'#fc200380',
            fica: '#0dff0080',
            eitc: '#8700a680',
            ctc:  '#0008ff80',
            snap: '#00e5ffB3',
            point: 'black'
        },
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 75,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: 'point',
    },
    tooltip: {
        show: false
    },
    /*point: {
        show: false
    }, */
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 100000, 200000, 300000, 400000, 500000, 600000]
            },
            padding: {left: 0, right: 0},
            max: 600000,
        },
        y: {
            label: {text: 'Effective Marginal Tax Rate', position: 'outer-middle'},
            tick: {
                format: function(value){
                    return d3.format('.0%')(value/100)
                    },
                values: [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
            },
            max: 60,
            padding: {top: 0, bottom: 10},
        }
    },
    grid: {
        x: {
            lines: [{value: 50000, text: 'Your income'}],
            min: 0,
        },
        y: {
            lines: [{value: 0, text: ''}],
        }
    }
});

/* Zooms graph on lower incomes */
function zoom_chart(){
    if(chart_type.value === 'EMTR'){
        if(zoom_switch.checked === true){
            user_income.max = "100000";
            chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
            chart.axis.max({x: 100000});
        }
        else{
            user_income.max = "600000";
            chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
            chart.axis.max({x: 600000});
        }
    }
    else{
        if(zoom_switch.checked === true){
            user_income.max = "40000";
            chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000];
            chart.axis.max({x: 40000});

            setTimeout(function () {
                chart.internal.config.axis_y_tick_values = [-8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000];
                chart.axis.max({y: 8000});
                chart.axis.min({y: -4000})
            }, 500);
        }
        else{
            chart.internal.config.axis_y_tick_values = [-600000, -500000, -400000, -300000, -200000, -100000, 0, 100000, 200000, 300000, 400000, 500000, 600000];
            chart.axis.max({y: 100000});
            chart.axis.min({y: -200000});

            setTimeout(function () {
                user_income.max = "600000";
                chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
                chart.axis.max({x: 600000});
            }, 500);
        }
    }
    /* adjust for particular selection of charts */
    setTimeout(function () {
        adjust_y_axis();
    }, 500);
}

/* adjust y-axis to fit chart */
function adjust_y_axis(){
    numBenefitsActive = eitc_isActive + ctc_isActive + snap_isActive;
    numTaxesActive = personal_income_tax_isActive + fica_isActive;

    if(chart_type.value === 'EMTR'){

    }
    else{
        if(zoom_switch.checked === true){
            if(numBenefitsActive == 3 && numTaxesActive == 0){
                chart.axis.max({y: 12000});
                chart.axis.min({y: 0});
            }
            else if(numBenefitsActive == 3 && (numTaxesActive == 1 || numTaxesActive == 2)){
                chart.axis.max({y: 12000});
                chart.axis.min({y: -4000});
            }
            else if(numBenefitsActive == 2 && numTaxesActive == 0){
                chart.axis.max({y: 8000});
                chart.axis.min({y: 0});
            }
            else if(numBenefitsActive == 2 && numTaxesActive == 1 ){
                chart.axis.max({y: 8000});
                chart.axis.min({y: -4000});
            }
            else if(numBenefitsActive == 2 && numTaxesActive == 2){
                chart.axis.max({y: 8000});
                chart.axis.min({y: -6000});
            }
            else if(numBenefitsActive == 1 && snap_isActive == true && (numTaxesActive == 0 || numTaxesActive == 1)){
                chart.axis.max({y: 6000});
                chart.axis.min({y: -4000});
            }
            else if(numBenefitsActive == 1 && ctc_isActive == true && (numTaxesActive == 0 || numTaxesActive == 1)){
                chart.axis.max({y: 4000});
                chart.axis.min({y: -2000});
            }
            else if(numBenefitsActive == 1 && (numTaxesActive == 0 || numTaxesActive == 1)){
                chart.axis.max({y: 6000});
                chart.axis.min({y: -2000});
            }
            else if(numBenefitsActive == 1 && snap_isActive == true && numTaxesActive == 2){
                chart.axis.max({y: 6000});
                chart.axis.min({y: -6000});
            }
            else if(numBenefitsActive == 1 && ctc_isActive == true && numTaxesActive == 2){
                chart.axis.max({y: 2000});
                chart.axis.min({y: -4000});
            }
            else if(numBenefitsActive == 1 && eitc_isActive == true && numTaxesActive == 2){
                chart.axis.max({y: 6000});
                chart.axis.min({y: -6000});
            }
            else if(numBenefitsActive == 0 && numTaxesActive == 2){
                chart.axis.max({y: 2000});
                chart.axis.min({y: -7000});
            }
            else if(numBenefitsActive == 0 && numTaxesActive == 1){
                chart.axis.max({y: 2000});
                chart.axis.min({y: -4000});
            }
            else{
                chart.axis.max({y: 8000});
                chart.axis.min({y: -4000});
            }
        }  
    }
}

/* Toggles show only the total tax rate */
function only_total(){
    if(total_switch.checked === true){
        chart.hide(['personal_income_tax', 'fica', 'eitc', 'ctc', 'snap']);
        chart.show('total');
    }
    else{
        chart.show();
    }
}

/* Moves the income slider */
function modifyIncome(){
    income = user_income.value;
    /* move xgrid */
    chart.xgrids([{value: income, text:'Your income'}]);

    /* if EMTR chart, adjust ponit */
    if(chart_type.value === 'EMTR'){
        val = tax_and_transfer_at_income_marginal(income, num_children.value, filingstatus.value)[6];
        chart.load({columns: [ ['x_point', income], ['point', val] ] });
    }
    /* if income chart, adjust tangent curve */
    else if(chart_type.value === 'EI'){
        add_tangent_line(income, num_children.value);
    }
}

function show_arbitrary_income(){
    if(arbitrary_income_switch.checked){
        arbitray_income_container.style.display = 'block';
        user_income.step = "1";
    }
    else{
        arbitray_income_container.style.display = 'none';
        user_income.step = "1000";
    }
}

function arbitrary_income_input(){
    income = arbitray_income.value;
    user_income.value = income;
    user_income_output.innerText = income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    user_income.step = "1";
}

function adjust_arbitrary_income(){
    /*adjust arbitrary input box if slider is moved */
    arbitray_income.value = income;
}
