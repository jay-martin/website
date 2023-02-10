/*DEFAULT GRAPH: Married with one child */
var eitc_chart = c3.generate({
    bindto: '#eitc_chart',
    data: {
        xs: {
            'FSA_EITC' : 'x',
            'EITC'     : 'x',
            'dif'      : 'x',

            'current_point'    : 'x_point',
            'fsa_point'        : 'x_point',
            'difference_point' : 'x_point',
        },
        columns: [
            ['x',        0, 10979, 18000, 26262, 33000, 49622, 54000, 60000],
            ['FSA_EITC', 0, 1830,  3000,  3000,  3000,  625,   0,     0],
            ['EITC',     0, 3733,  3733,  3733,  2666,  0,     0,     0],
            ['dif',      0, -1903, -733, -733,  334,   625,   0,      0],

            ['x_point',         20000],
            ['current_point',   3733],
            ['fsa_point',       3000],
            ['difference_point', -733]
        ],
        names: {
            FSA_EITC: 'Family Security Act EITC',
            EITC: 'Earned Income Tax Credit (2022)',
            dif: 'Change in Benefit'
        },
        colors: {
            FSA_EITC : '#f7c22f',
            fsa_point : '#f7c22f',

            EITC : '#6ab6fc',
            current_point : '#6ab6fc',

            dif              : 'red',
            difference_point : 'red',
        },
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 70,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: ['fsa_point', 'current_point', 'difference_point'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000]
            },
            padding: {left: 0, right: 0},
        },
        y: {
            label: {text: 'Benefit / Benefit Difference', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [-4000, -3000, -2000, -1000, 0, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000]
            },
            padding: {bottom: 10},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 20000, text: 'Your income'}]
        },
        y: {
            lines: [{value: 0}]
        }
    }
});

function eitc_adjust_chart(){
    modify_eitc_chart(filingstatus_eitc.value, numchildren_eitc.value);
}

function eitc_only_difference_curve(){
    if(eitc_only_difference_switch.checked == true){
        eitc_chart.axis.labels({y: 'Difference in Benefit'});
        eitc_chart.hide(['FSA_EITC', 'EITC', 'current_point', 'fsa_point']);
    }
    else{
        eitc_chart.axis.labels({y: 'Benefit / Benefit Difference'});
        if(eitc_hide_outputs_switch.checked){
            eitc_chart.show(['FSA_EITC', 'EITC']);
        }
        else{
            eitc_chart.show();
        }
    }
}

function eitc_hide_difference_curve(){
    if(eitc_hide_difference_switch.checked == true){
        eitc_chart.axis.labels({y: 'Benefit'});
        eitc_chart.hide(['dif', 'difference_point']);
    }
    else{
        eitc_chart.axis.labels({ y: 'Benefit / Benefit Difference'});
        if(eitc_hide_outputs_switch.checked){
            eitc_chart.show(['dif']);
        }
        else{
            eitc_chart.show();
        }
    }
}

var eitc_previous_income = 20000;
function eitc_hide_outputs(){
    eitc_previous_income = eitc_income.value;
    if(eitc_hide_outputs_switch.checked){
        document.getElementById('eitc_outputs').style.display = 'none';
        document.getElementById('eitc_income_container').style.display = 'none';
        eitc_chart.hide(['current_point', 'fsa_point', 'difference_point']);
        eitc_chart.xgrids([]);
    }
    else {
        document.getElementById('eitc_outputs').style.display = 'block';
        document.getElementById('eitc_income_container').style.display = 'block';
        eitc_chart.show(['current_point', 'fsa_point', 'difference_point']);
        eitc_chart.xgrids([{value: eitc_previous_income, text: 'Your income'}]);
    }
}

function eitc_description_generator(){
    let filing_status  = capitalize_filing_status(filingstatus_eitc.value);
    let num_children   = capitalize_num_children(numchildren_eitc.value);

    // Generate description based on current user inputs
    document.getElementById('eitc_title_description').innerHTML = filing_status + ", " + num_children;
}



