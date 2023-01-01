/******************************************************************************************
 * This file contains the function creating the c3.js chart
 * DEFAULT GRAPH: Standard deduction for both single filer & HOH
 * ****************************************************************************************/
var regressiveChart = c3.generate({
    bindto: '#regressive_chart',
    data: {
        xs: {
            'HOH_Savings' : 'x',
            'outline' : 'x',
            'person1' : 'x1',
            'person2' : 'x2',
            'after_ctc' : 'x3',

            'max_benefit' : 'x',
            'point_top'   : 'x_point',

            'difference_line' : 'x_line',

            'point' : 'x_point',
        },
        columns: [
            ['x',               0,    12950, 19400, 23225, 34050,  54725,  75300, 102025, 108450, 183000, 189450, 228900, 235350, 552850, 559300, 600000],
            ['HOH_Savings',     0,    0,     645,   645,   861.5,  861.5,  2919,  2919,   3047.5, 3047.5, 3563.5, 3563.5, 3757,   3757,   3886,   3886],
            ['outline',         0,    0,     645,   645,   861.5,  861.5,  2919,  2919,   3047.5, 3047.5, 3563.5, 3563.5, 3757,   3757,   3886,   3886],
            ['max_benefit',     3886, 3886,  3241,  3241,  3024.5, 3024.5, 967,   967,    838.5,  838.5,  322.5,  322.5,  129,    129,    0,      0],

            ['x_point',         50000],
            ['point',           862],
            ['point_top',       3886],

            ['x_line',          50000, 50000],
            ['difference_line', 861.5, 3886],
        ],
        types: {
            HOH_Savings: 'area',
            person1: 'area',
            person2: 'area',
            after_ctc: 'area',

            max_benefit : 'area'
        },
        groups: [ ['max_benefit', 'HOH_Savings'] ], 
        order: false,
        names: {
            outline: 'HOH Tax Savings',
            person1: 'Person 1',
            person2: 'Person 2',
            after_ctc: 'HOH Tax Savings after CTC',

            max_benefit: 'Max Benefit',
        },
        colors: {
            HOH_Savings : 'white',
            outline     : color_mode_color,
            after_ctc   : '#6ab6fc',
            point       : color_mode_color,

            max_benefit : 'red',
            point_top   : 'red',
            difference_line : 'red',
        },
    },
    transition: {
        duration: 200,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 65,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: ['point', 'point_top', 'HOH_Savings', 'difference_line'],
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
            max: 600000,
        },
        y: {
            label: {text: 'Tax Savings', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000]
            },
            max: 4000,
            padding: {top: 0},
        }
    },
    grid: {
        x: {
            //lines: [{value: 50000, text: 'Your income'}],
            min: 0,
        },
        y: {
        }
    }
});
