/******************************************************************************************
 * This file contains the function creating the c3.js chart
 * DEFAULT GRAPH: Standard deduction for both single filer & HOH
 * ****************************************************************************************/
var top_chart_chart = c3.generate({
    bindto: '#HOHchart',
    data: {
        xs: {
            'HOH_Savings' : 'x',
            'person1' : 'x1',
            'person2' : 'x2',
            'after_ctc' : 'x3',

            'point' : 'x_point',
        },
        columns: [
            ['x',            0, 13850, 20800, 24850, 36500, 58575, 80650,  109225, 116150, 195950, 202900, 245100, 252050, 591975, 598900, 620000],
            ['HOH_Savings',  0, 0,     695,   695,   928,   928,   3135.5, 3135.5, 3274,   3274,   3830,   3830,   4038.5, 4038.5, 4177,   4177],

            ['x_point', 50000],
            ['point',   928],

            /* 2022 Values
            ['x',            0, 12950, 19400, 23225, 34050, 54725, 75300, 102025, 108450, 183000, 189450, 228900, 235350, 552850, 559300, 600000],
            ['HOH_Savings',  0, 0,     645,   645,   861.5, 861.5, 2919,  2919,   3047.5, 3047.5, 3563.5, 3563.5, 3757,   3757,   3886,   3886],

            ['x_point', 50000],
            ['point', 862],
            */
        ],
        types: {
            HOH_Savings: 'area',
            person1: 'area',
            person2: 'area',
            after_ctc: 'area',
        },
        names: {
            HOH_Savings: 'HOH Tax Savings',
            person1: 'Person 1',
            person2: 'Person 2',
            after_ctc: 'HOH Tax Savings after CTC'
        },
        colors: {
            HOH_Savings : '#f7c22f',
            after_ctc   : '#6ab6fc',
            point       : '#f7c22f',
        },
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 60,
        right: 10,
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
            max: 620000,
            height: 45,
        },
        y: {
            label: {text: 'Tax Savings', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500,]
            },
            max: 4500,
            padding: {top: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 50000, text: 'Your income'}],
            min: 0,
        },
        y: {
        }
    }
});
