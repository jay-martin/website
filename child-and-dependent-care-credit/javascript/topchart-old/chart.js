/******************************************************************************************
 * This file contains the function creating the c3.js chart for the Top Chart
 * ****************************************************************************************/

var topChart = c3.generate({
    bindto: '#topchart',
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

            ['x_point',             20000],
            ['point_credit_amount', 615],
            
        ],
        names: {
            credit_rate:   'Credit Rate',
            credit_amount: 'Credit Amount',
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
        top: 10,
        left: 65,
        right: 20,
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
        },
        y: {
            label: {text: 'Credit Amount', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000]
            },
            max: 1000,
            padding: {top: 0, bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 20000, text: 'Your income'}],
            min: 0,
        },
    }
});
