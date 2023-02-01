/******************************************************************************************
 * This file contains the function creating the c3.js chart for the Top Chart
 * ****************************************************************************************/

var complexity_chart = c3.generate({
    bindto: '#complexity_chart',
    data: {
        xs: {
            'single_one'  : 'x_single_one',
            'single_two'  : 'x_single_two',

            'hoh_one'     : 'x_hoh_one',
            'hoh_two'     : 'x_hoh_two',

            'married_one' : 'x_married_one',
            'married_two' : 'x_married_two',

            'single_one_point'  : 'x_point',
            'single_two_point'  : 'x_point',

            'hoh_one_point'     : 'x_point',
            'hoh_two_point'     : 'x_point',

            'married_one_point' : 'x_point',
            'married_two_point' : 'x_point',
        },
        columns: [

            ['x_single_two', 0, 13850, 24850, 29183, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['single_two',   0, 0,     1100,  1620,  1620,  1560,  1560,  1500,  1500,  1440,  1440,  1380,  1380,  1320,  1320,  1260,  1260,  1200,  1200],

            ['x_hoh_two', 0, 20800, 35200, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['hoh_two',   0, 0,     1440,  1440,  1380,  1380,  1320,  1320,  1260,  1260,  1200,  1200],

            ['x_married_two', 0, 27700, 40900, 41000, 41001, 43000, 43001, 60000],
            ['married_two',   0, 0,     1320,  1320,  1260,  1260,  1200,  1200],

            ['x_single_one', 0, 13850, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['single_one',   0, 0,     915,   900,   900,   870,   870,   840,   840,   810,   810,   780,   780,   750,   750,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],

            ['x_hoh_one', 0, 20800, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['hoh_one',   0, 0,     820,   810,   810,   780,   780,   750,   750,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],

            ['x_married_one', 0, 27700, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['married_one',   0, 0,     730,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],

            ['x_point',           26000],
            ['single_two_point',  1238],
            ['single_one_point',  870],
            ['hoh_two_point',     520],
            ['hoh_one_point',     520],
            ['married_two_point', 0],
            ['married_one_point', 0],
            
        ],
        names: {
            credit_rate : 'Credit Rate',

            single_one  : 'Single, One Child',
            single_two  : 'Single, Two Children',
            hoh_one     : 'HOH, One Child',
            hoh_two     : 'HOH, Two Children',
            married_one : 'Married, One Child',
            married_two : 'Married, Two Children',
        },
        types: {

        },
        colors: {
            single_one       : '#6ab6fc',
            single_one_point : '#6ab6fc',
            single_two       : '#0065c2',
            single_two_point : '#0065c2',

            hoh_one       : '#f7c22f',
            hoh_one_point : '#f7c22f',
            hoh_two       : '#856100',
            hoh_two_point : '#856100',

            married_one       : '#fa0000',
            married_one_point : '#fa0000',
            married_two       : '#6e0000',
            married_two_point : '#6e0000',
        },
    },
    size: {
        height: 375,
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 65,
        right: 65,
    },
    legend: {
        position: 'bottom',
        hide: ['point_credit_rate', 'point_credit_amount', 'single_one_point', 'single_two_point', 'hoh_one_point', 'hoh_two_point', 'married_one_point', 'married_two_point',],
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
        },
        y: {
            show: true,
            label: {text: 'Maximum Usable Amount of Credit', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250]
            },
            max: 2000,
            padding: {top: 0, bottom: 0},
        },
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 26000, text: 'Your income'}],
            min: 0,
        },
    }
});
