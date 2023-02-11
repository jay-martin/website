/******************************************************************************************
 * This file contains the function creating the c3.js chart for the Top Chart
 * ****************************************************************************************/

var top_chart = c3.generate({
    bindto: '#top_chart',
    data: {
        xs: {
            'credit_rate'   : 'x_credit_rate',
            'credit_amount' : 'x_credit_amount',
            
            'point_credit_rate' : 'x_point',
            'point_credit_amount' : 'x_point',
        },
        columns: [
            ['x_credit_amount', 0, 13850, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['credit_amount',   0, 0,     915,   900,   900,   870,   870,   840,   840,   810,   810,   780,   780,   750,   750,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],

            ['x_credit_rate', 0,   15000, 15001, 17000, 17001, 19000, 19001, 21000, 21001, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['credit_rate',   .35, .35,   .34,   .34,   .33,   .33,   .32,   .32,   .31,   .31,   .30,   .30,   .29,   .29,   .28,   .28,   .27,   .27,   .26,   .26,   .25,   .25,   .24,   .24,   .23,   .23,   .22,   .22,   .21,   .21,   .20,   .20],

            ['x_point',             20000],
            ['point_credit_amount', 615],
            ['point_credit_rate',   .32],
            
        ],
        axes: {
            credit_rate         : 'y',
            point_credit_rate   : 'y',
            credit_amount       : 'y2',
            point_credit_amount : 'y2',
        },
        names: {
            credit_rate:   'Credit Rate',
            credit_amount: 'Credit Amount',
        },
        types: {
            'credit_amount' : 'area',
        },
        colors: {
            credit_rate       : '#6ab6fc',
            point_credit_rate : '#6ab6fc',

            credit_amount       : '#f7c22f',
            point_credit_amount : '#f7c22f',
        },
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 50,
        right: 65,
    },
    legend: {
        position: 'bottom',
        hide: ['point_credit_rate', 'point_credit_amount'],
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
            height: 50,
        },
        y: {
            show: true,
            label: {text: 'Credit Rate', position: 'outer-middle'},
            tick: {
                format: d3.format('.0%'),
                values: [0, .05, .1, .15, .2, .25, .3, .35, .4]
            },
            max: .4,
            min: 0,
            padding: {top: 0, bottom: 0},
        },
        y2: {
            show: true,
            label: {text: 'Credit Amount', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250]
            },
            max: 1200,
            padding: {top: 0, bottom: 0},
        },
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 20000, text: 'Your income'}],
            min: 0,
        },
    },
});
