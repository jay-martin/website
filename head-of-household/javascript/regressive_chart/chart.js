/******************************************************************************************
 * This file contains the function creating the c3.js chart
 * DEFAULT GRAPH: Standard deduction for both single filer & HOH
 * ****************************************************************************************/
var regressive_chart = c3.generate({
    bindto: '#regressive_chart',
    data: {
        xs: {
            'HOH_Savings'     : 'x',
            'max_benefit'     : 'x',
            'difference_line' : 'x_line',
        },
        columns: [
            ['x',            0,    13850, 20800, 24850, 36500, 58575, 80650,  109225, 116150, 195950, 202900, 245100, 252050, 591975, 598900, 620000],
            ['HOH_Savings',  0,    0,     695,   695,   928,   928,   3135.5, 3135.5, 3274,   3274,   3830,   3830,   4038.5, 4038.5, 4177,   4177],
            ['max_benefit',  4177, 4177,  3482,  3482,  3249,  3249,  1041.5, 1041.5, 903,    903,    347,    347,    138.5,   138.5,   0,      0],

            ['x_line',          50000, 50000],
            ['difference_line', 928,   4177],
        ],
        types: {
            HOH_Savings: 'area',
            max_benefit : 'area'
        },
        groups: [ ['max_benefit', 'HOH_Savings'] ], 
        order: false,
        names: {
            HOH_Savings: 'HOH Tax Savings',
            max_benefit: 'Max Benefit',
        },
        colors: {
            HOH_Savings     :  white_or_black,
            max_benefit     : 'red',
            difference_line : 'red',
        },
    },
    transition: {
        duration: 200,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 60,
        right: 10,
    },
    legend: {
        position: 'bottom',
        hide: ['difference_line'],
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
        x: {
            min: 0,
        },
        y: {
        }
    }
});
