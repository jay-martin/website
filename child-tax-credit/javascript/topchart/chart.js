/******************************************************************************************
 * This file contains the function creating the c3.js chart for the Top Chart
 * ****************************************************************************************/

var topChart = c3.generate({
    bindto: '#topchart',
    data: {
        xs: {
            'ctc'   : 'x',
            'point' : 'x_point',
        },
        columns: [
            ['x',    0, 2500, 13167, 27700, 31700, 400000, 440000],
            ['ctc',  0, 0,    1600,  1600,  2000,  2000,   0 ],

            ['x_point', 20000],
            ['point',   1600],
            
        ],
        names: {
            ctc: 'Child Tax Credit',
        },
        colors: {
            ctc   : '#6ab6fc',
            point : '#6ab6fc',
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
                values: [0, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000]
            },
            padding: {left: 0, right: 10},
        },
        y: {
            label: {text: 'CTC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000,]
            },
            padding: {top: 85, bottom: 0},
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
