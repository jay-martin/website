/*DEFAULT GRAPH: Standard deduction for both single filer & HOH */
var chart = c3.generate({
    bindto: '#chart',
    data: {
        xs: {
            total : 'x',
            total_hidden: 'x',
            max   : 'x',
            ctc   : 'x',
            eitc  : 'x',
            hoh   : 'x',
        },
        columns: [
            ['x',            0,     2500, 10979,   11833, 12950, 18950, 20131, 43492, 50000],
            ['total_hidden', 0,     850,  5004.85, 5133,  5133,  5733,  5733,  2000,  2000],
            ['total',        0,     850,  5004.85, 5133,  5133,  5733,  5733,  2000,  2000],
            ['max',          5733,  4883, 728.15,  600,   600,   0,]
        ],
        types: {
            total: 'line',
            total_hidden: 'area',
            max:   'area',
        },
        names: {
            total: 'CTC+EITC',
            max:   'Missing Benefits',
        },
        colors: {
            total: 'black',
            total_hidden: 'white',
            max: 'red',
        },
        groups: [
            ['total_hidden', 'max'],
        ],
        order: 'none',
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 60,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: 'total_hidden',
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
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000]
            },
            padding: {left: 0, right: 25},
            max: 50000,
        },
        y: {
            label: {text: 'Benefit', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000]
            },
            max: 7000,
            padding: {top: 0, bottom: 10},
        }
    },
    grid: {
        x: {
            lines: [{value: 10000, text: 'Your income'}],
            min: 0,
        },
        y: {
            lines: [{value: 0, text: ''},],
        }
    }
});

/* Zooms graph on lower incomes */
function zoom_chart(){
    if(zoom_switch.checked === true){
        chart.internal.config.axis_x_tick_values = [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000];
        chart.axis.max({x: 20000});
    }
    else{
        chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000];
        chart.axis.max({x: 50000});
    }
}

/* Moves the income slider */
function modifyIncome(){
    income = user_income.value;
    chart.xgrids([{value: income, text:'Your income'}]);
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
