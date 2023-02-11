/*DEFAULT GRAPH: Married with one child */
var top_chart_chart = c3.generate({
    bindto: '#top_chart',
    data: {
        xs: {
            'ctc'  : 'x_current',
            'eitc' : 'x_current',
            'hoh'  : 'x_current',

            'fsa_ca'   : 'x_fsa',
            'fsa_eitc' : 'x_fsa',

            'difference' : 'x_difference',

            'current_point'    : 'x_point',
            'fsa_point'        : 'x_point',
            'difference_point' : 'x_point',
        },
        columns: [
            ['x_current', 0,    2500,   10000, 10979,  11833,  18000, 25900, 26262, 31900, 33000, 49622, 54000, 400000, 440000, 460000],
            ['x_fsa',     0,    2500,   10000, 10979,  11833,  18000, 25900, 26262, 31900, 33000, 49622, 54000, 400000, 440000, 460000],
            ['hoh',],
            ['ctc',       0,    0,      1125,  1272,   1400,   1400,  1400,  1436,  2000,  2000,  2000,  2000,  2000,   0,      0],
            ['eitc',      0,    850,    3400,  3733,   3733,   3733,  3733,  3733,  2842,  2666,  0,     0,     0,      0,      0],
            ['fsa_ca',    0,    750,    3000,  3000,   3000,   3000,  3000,  3000,  3000,  3000,  3000,  3000,  3000,   1000,   0],
            ['fsa_eitc',  0,    416.5,  1667,  1830,   1972.5, 3000,  3000,  3000,  3000,  3000,  625,   0,     0,      0,      0],

            ['x_difference', 0,    2500,   10000, 10979,  11833,  18000, 25900, 26262, 31900, 33000, 49622, 54000, 400000, 440000, 460000],
            ['difference',   0,    316.5,  142,   -175,   -160.5, 867,   867,   831,   1158,  1334,  1625,  1000,  1000,   1000,   0],

            ['x_point',          20000],
            ['current_point',    5133],
            ['fsa_point',        6000],
            ['difference_point', 867],
        ],
        types: {
            ctc: 'area',
            eitc: 'area',
            hoh: 'area',

            fsa_ca: 'area',
            fsa_eitc: 'area',

            difference: 'line',
        },
        groups: [['fsa_ca', 'fsa_eitc'], ['hoh', 'ctc', 'eitc',]],
        order: false,
        names: {
            fsa_ca: 'FSA Child Benefit',
            fsa_eitc: 'FSA EITC',
            eitc: 'Earned Income Tax Credit (2022)',
            ctc: 'Child Tax Credit (2022)',
            hoh: 'Head of Household Tax Savings (2022)',
            difference: 'Change in Benefit',
        },
        colors: {
            eitc          : '#6ab6fc',
            ctc           : '#6ab6fc',
            hoh           : '#6ab6fc',
            current_point : '#6ab6fc',

            fsa_ca    : '#f7c22f',
            fsa_eitc  : '#f7c22f',
            fsa_point : '#f7c22f',

            difference       : 'red',
            difference_point : 'red',
        },
    },
    size: {
      height: 400,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 70,
        right: 15,
    },
    legend: {
        position: 'bottom',
        hide: ['hoh', 'current_point', 'fsa_point', 'difference_point'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000]
            },
            padding: {left: 0},
            height: 45,
        },
        y: {
            label: {text: 'Benefit / Benefit Difference', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [-5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000]
            },
            padding: {bottom: 7, top: 20},
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

function top_chart_hide_inputs_outputs(){
    if(top_chart_hide_outputs_switch.checked){
        document.getElementById('top_chart_outputs').style.display = 'none';
        document.getElementById('top_chart_income_container').style.display = 'none';
        top_chart_chart.hide(['current_point', 'fsa_point', 'difference_point']);
        top_chart_chart.xgrids([]);
    }
    else {
        document.getElementById('top_chart_outputs').style.display = 'block';
        document.getElementById('top_chart_income_container').style.display = 'block';
        top_chart_chart.show(['current_point', 'fsa_point', 'difference_point']);
        top_chart_chart.xgrids([{value: eitc_previous_income, text: 'Your income'}]);
    }
}

function top_chart_description_generator(){
    let filing_status  = capitalize_filing_status(top_chart_filing_status.value);
    let old_children   = capitalize_num_children(top_chart_num_old_children.value);
    let young_children = capitalize_num_children(top_chart_num_young_children.value);

    // Generate description based on current user inputs
    document.getElementById('top_chart_title_description').innerHTML = filing_status + ", " + old_children + " Age 6–17 and " + young_children + " Age 0–5";

    // Generate title based on whether FSA 1.0 or 2.0
    if(top_chart_fsa1_or_2.value == 'one'){
        document.getElementById('top_chart_title').innerHTML = 'The Family Security Act 1.0:<br>Comparison with 2022 Policy';
    }
    else {
        document.getElementById('top_chart_title').innerHTML = 'The Family Security Act 2.0:<br>Comparison with 2022 Policy';
    }
}



