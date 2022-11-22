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
            baseline_income : 'x',
            income_tax_and_transfer : 'x',
            tangent_line : 'x_tangent',
        },
        columns: [
            ['x',                   0, 12949, 12950, 23224, 23225, 54724, 54725, 102024, 102025, 182999, 183000, 228899, 228900, 552849, 552850, 600000],
            ['total',               0, 0,     10,    10,    12,    12,    22,    22,     24,     24,     32,     32,     35,     35,     37,     37],
        ],
        types: {
            total: 'area',
            personal_income_tax: 'line',
            fica: 'line',
            eitc: 'line',
            snap: 'line',
            income_tax_and_transfer: 'line',
            tangent_line: 'line',
        },
        names: {
            total: 'Effective Marginal Tax Rate',
            personal_income_tax: 'Personal Income Tax',
            fica: 'FICA Tax',
            eitc: 'Earned income tax credit',
            ctc:  'Child tax credit',
            snap: 'SNAP (Food Stamps)',
            income_tax_and_transfer: 'Difference between Income after Taxes & Transfers and Employment Income',
            tangent_line: 'Effective Marginal Tax Rate',
        },
        colors: {
            total: '#f7c22f',
            personal_income_tax:'#fc200380',
            fica: '#0dff0080',
            eitc: '#8700a680',
            ctc:  '#0008ff80',
            snap: '#00e5ffB3',
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
    },
    tooltip: {
        show: false
    },
    point: {
        show: false
    },
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
            user_income.max = "60000";
            chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
            chart.axis.max({x: 60000});
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
                chart.internal.config.axis_y_tick_values = [-4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
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

    /* if income chart, adjust tangent curve */
    if(chart_type.value === 'EI'){
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
