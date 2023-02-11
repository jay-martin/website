/******************************************************************************************
 * This file contains the function creating the c3.js chart for the Top Chart
 * ****************************************************************************************/

var bizarre_chart = c3.generate({
    bindto: '#bizarre_chart',
    data: {
        xs: {
            'credit_rate' : 'x_credit_rate',
            'credit_rate_line' : 'x_credit_rate',

            'childcare_cost_max' : 'x_horizontal',

            'single_one'  : 'x_single_one',
            'single_two'  : 'x_single_two',

            'hoh_one'     : 'x_hoh_one',
            'hoh_two'     : 'x_hoh_two',

            'married_one' : 'x_married_one',
            'married_two' : 'x_married_two',
        },
        columns: [

            ['x_horizontal',       0,    60000],
            ['childcare_cost_max', 3000, 3000],

            //['x_single_two', 0, 13850, 24850, 29183, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            // ['single_two',   0, 0,     1100,  1620,  1620,  1560,  1560,  1500,  1500,  1440,  1440,  1380,  1380,  1320,  1320,  1260,  1260,  1200,  1200],

            //['x_hoh_two', 0, 20800, 35200, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            // ['hoh_two',   0, 0,     1440,  1440,  1380,  1380,  1320,  1320,  1260,  1260,  1200,  1200],

            //['x_married_two', 0, 27700, 40900, 41000, 41001, 43000, 43001, 60000],
            //['married_two',   0, 0,     1320,  1320,  1260,  1260,  1200,  1200],

            ['x_credit_rate', 0,   15000, 15001, 17000, 17001, 19000, 19001, 21000, 21001, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['credit_rate',   .35, .35,   .34,   .34,   .33,   .33,   .32,   .32,   .31,   .31,   .30,   .30,   .29,   .29,   .28,   .28,   .27,   .27,   .26,   .26,   .25,   .25,   .24,   .24,   .23,   .23,   .22,   .22,   .21,   .21,   .20,   .20],

            ['x_single_one', 0, 13850, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['single_one',   0, 0,     915,   900,   900,   870,   870,   840,   840,   810,   810,   780,   780,   750,   750,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],

            ['x_hoh_one', 0, 20800, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['hoh_one',   0, 0,     820,   810,   810,   780,   780,   750,   750,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],

            ['x_married_one', 0, 27700, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['married_one',   0, 0,     730,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],
            
        ],
         axes: {
            credit_rate      : 'y',
            credit_rate_line : 'y',

            single_one    : 'y2',
            single_two    : 'y2',
            hoh_one       : 'y2',
            hoh_two       : 'y2',
            married_one   : 'y2',
            married_two   : 'y2',
            childcare_cost_max : 'y2',
        },
        names: {
            childcare_cost_max : 'Maximum Applicable Childcare Costs',

            credit_rate : 'Credit Rate',

            single_one  : 'Single, One Child',
            single_two  : 'Single, Two Children',
            hoh_one     : 'HOH, One Child',
            hoh_two     : 'HOH, Two Children',
            married_one : 'Married, One Child',
            married_two : 'Married, Two Children',
        },
        types: {
            childcare_cost_max : 'area',
            credit_rate        : 'area',
            single_one         : 'area',
            single_two         : 'area',
            hoh_one            : 'area',
            hoh_two            : 'area',
            married_one        : 'area',
            married_two        : 'area',
        },
        colors: {
            childcare_cost_max : '#6ab6fc',
            credit_rate : '#fa0000',
            credit_rate_line : '#fa0000',

            single_one  : '#1764ff',
            single_two  : '#1764ff',

            hoh_one     : '#35b000',
            hoh_two     : '#856100',

            married_one : '#d21cff',
            married_two : '#d21cff',
        },
    },
    size: {
        height: 450,
    },
    transition: {
        duration: 1000,
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 55,
        right: 65,
    },
    legend: {
        position: 'bottom',
        hide: ['credit_rate_line'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000]
            },
            padding: {left: 0, right: 0},
            max: 60000,
            height: 45,
        },
        y: {
            show: true,
            label: {text: 'Credit Rate', position: 'outer-middle'},
            tick: {
                format: d3.format('.0%'),
                values: [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
            },
            max: 1,
            min: 0,
            padding: {top: 0, bottom: 0},
        },
        y2: {
            show: true,
            label: {text: 'Credit Amount/Childcare Costs', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500]
            },
            min: 0,
            max: 3000,
            padding: {top: 0, bottom: 0},
        },
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            min: 0,
        },
    }
});
