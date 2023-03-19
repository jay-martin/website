/******************************************************************************************
 * This file contains the function creating the c3.js chart for the Top Chart
 * ****************************************************************************************/

var eitc_reform_chart = c3.generate({
    bindto: '#eitc_reform_chart',
    data: {
        xs: {
            'single_zero'  : 'x_single_zero',
            'single_one'   : 'x_single_one',
            'single_two'   : 'x_single_two',
            'single_three' : 'x_single_three',

            'married_zero'  : 'x_married_zero',
            'married_one'   : 'x_married_one',
            'married_two'   : 'x_married_two',
            'married_three' : 'x_married_three',
        },
        columns: [
            ['x_married_three', 0, 20000, 62500, 87500],
            ['married_three',   0, 6330, 6330,  0], 

            ['x_married_two', 0, 20000, 50000, 75000],
            ['married_two',   0, 6330,  6330,  0], 

            ['x_married_one', 0, 20000, 37500, 62500],
            ['married_one',   0, 6330,  6330,  0],  

            ['x_married_zero', 0, 20000, 25000, 50000],
            ['married_zero',   0, 6330,  6330,  0], 

            ['x_single_three',  0, 10000, 50000, 62500],
            ['single_three',    0, 3165,  3165,  0],

            ['x_single_two',  0, 10000, 37500, 50000],
            ['single_two',    0, 3165,  3165,  0],

            ['x_single_one',  0, 10000, 25000, 37500],
            ['single_one',    0, 3165,  3165,  0],

            ['x_single_zero',  0, 10000, 12500, 25000],
            ['single_zero',    0, 3165,  3165,  0],        
            
        ],
        names: {
            single_zero:  'Single EITC',
            married_zero: 'Married EITC',
        },
        colors: {
            single_zero  : '#6ab6fc',
            single_one   : '#6ab6fc',
            single_two   : '#6ab6fc',
            single_three : '#6ab6fc',

            married_zero  : purple_shade,
            married_one   : purple_shade,
            married_two   : purple_shade,
            married_three : purple_shade,
        },
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 65,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: ['single_one', 'single_two', 'single_three', 'married_one', 'married_two', 'married_three'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000],
            },
            padding: {left: 0, right: 10},
            height: 45,
            max: 100000,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
            },
            padding: {top: 40, bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            //lines: [{value: 20000, text: 'Your income'}],
            min: 0,
        },
    }
});
