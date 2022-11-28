/*DEFAULT GRAPH: Standard deduction for both single filer & HOH */
var chart = c3.generate({
    bindto: '#chart',
    data: {
        xs: {
            total : 'x',
        },
        columns: [
            ['x',                   0, 12949, 12950, 23224, 23225, 54724, 54725, 102024, 102025, 182999, 183000, 228899, 228900, 552849, 552850, 600000],
            ['total',               0, 0,     10,    10,    12,    12,    22,    22,     24,     24,     32,     32,     35,     35,     37,     37],
        ],
        types: {
            total: 'area',
        },
        names: {
            total: 'Effective Marginal Tax Rate',
        },
        colors: {
            total: '#f7c22f',
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
    if(zoom_switch.checked === true){
        chart.axis.max({x: 60000});
    }
    else{
        chart.axis.max({x: 600000});
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
