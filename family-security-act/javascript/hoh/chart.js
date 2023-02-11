/*DEFAULT GRAPH: Standard deduction for both single filer & HOH */
var hoh_chart = c3.generate({
    bindto: '#hoh_chart',
    data: {
        xs: {
            'HOH_Savings' : 'x',
            'point'       : 'x_point',
        },
        columns: [
            ['x',            0, 12950, 19400, 23225, 34050, 54725, 75300, 102025, 108450, 183000, 189450, 228900, 235350, 552850, 559300, 600000],
            ['HOH_Savings',  0, 0,     645,   645,   861.5, 861.5, 2919,  2919,   3047.5, 3047.5, 3563.5, 3563.5, 3757,   3757,   3886,   3886],

            ['x_point', 50000],
            ['point',   862],
        ],
        names: {
            HOH_Savings: 'HOH Tax Savings',
        },
        colors: {
            HOH_Savings : '#f7c22f',
            point       : '#f7c22f',
        },
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 70,
        right: 22,
    },
    legend: {
        position: 'bottom',
        hide: ['point'],
    },
    tooltip: {
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
            height: 45,
        },
        y: {
            label: {text: 'Tax Savings', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000]
            },
            padding: {bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 50000, text: 'Your income'}]
        },
        y: {
            lines: [{value: 0}]
        }
    }
});

/* Zooms graph on lower incomes */
function zoomHOHGraph(){
    if(zoom_switch_HOH.checked === true){
        myRange_HOH.max = "100000";
            setTimeout(function () {
                hoh_chart.axis.max({x: 100000});
        }, );
        hoh_chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
    }
    else{
        myRange_HOH.max = "600000";
            setTimeout(function () {
                hoh_chart.axis.max({x: 600000});
        }, );
        hoh_chart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
    }
}

/* Moves the income slider */
function modifyIncome_HOH(){
    let income = myRange_HOH.value;
    setTimeout(function () {
        hoh_chart.xgrids([{value: income, text:'Your income'}]);
    }, );

    difference = taxDifferenceatIncomeValue(income, myRange_ID.value);
    hoh_chart.load({ 
        columns: [
            ['x_point', income],
            ['point', difference],
        ]
    });
}

/* Adjusts the chart according to user input */
function modifyGraph_HOH(){
    data = taxDifference(myRange_ID.value);
    combined_brackets = data[0];
    combined_brackets.unshift('x');
    tax_dif = data[1];
    tax_dif.unshift('HOH_Savings');

    hoh_chart.load({
        columns: [
            combined_brackets,
            tax_dif
        ]
    });
}

var hoh_previous_income = 50000;
function hoh_screenshot_mode(){
    hoh_previous_income = myRange_HOH.value;
    if(hoh_screenshot_mode_switch.checked){
        document.getElementById('hoh_inputs').style.display = 'none';
        document.getElementById('hoh_outputs').style.display = 'none';
        $('#hoh_container').css('border', 'none');
        hoh_chart.hide(['point']);
        hoh_chart.xgrids([]);
    }
    else {
        document.getElementById('hoh_inputs').style.display = 'block';
        document.getElementById('hoh_outputs').style.display = 'block';
        $('#hoh_container').css('border', 'solid');
        hoh_chart.show(['point']);
        hoh_chart.xgrids([{value: hoh_previous_income, text: 'Your income'}]);
    }
}