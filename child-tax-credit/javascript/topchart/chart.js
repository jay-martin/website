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
            ['x',   0, 2500, 13167, 20800, 24800, 200000, 240000],
            ['ctc', 0, 0,    1600,  1600,  2000,  2000,   0],

            ['x_point', 18000],
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
                values: [0, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 225000, 250000, 275000, 300000, 325000]
            },
            padding: {left: 0, right: 0},
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
            lines: [{value: 18000, text: 'Your income'}],
            min: 0,
        },
    }
});
