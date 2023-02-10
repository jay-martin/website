/******************************************************************************************
 * This file contains the function creating the c3.js chart for the Top Chart
 * ****************************************************************************************/

var top_chart_chart = c3.generate({
    bindto: '#top_chart',
    data: {
        xs: {
            'eitc'  : 'x',
            'point' : 'x_point',
        },
        columns: [
            ['x',    0, 11750, 21560, 46560],
            ['eitc', 0, 3995,  3995,  0],

            ['x_point', 20000],
            ['point',   3995],
        ],
        names: {
            eitc: 'EITC, Single/HOH with One Child',
        },
        colors: {
            eitc  : '#6ab6fc',
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
        hide: ['point',],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000, 65000],
            },
            padding: {left: 0, right: 0},
            max: 50000,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
            },
            max: 5500,
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
