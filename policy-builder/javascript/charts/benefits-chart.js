/******************************************************************************************
 * This file contains the function creating the c3.js chart for the Top Chart
 * ****************************************************************************************/

var benefits_chart = c3.generate({
    bindto: '#benefits_chart',
    data: {
        xs: {
            '1' : 'x1',
            '2' : 'x2',
            '3' : 'x3',
            '4' : 'x4',
        },
        columns: [
            ['x1', 0, 0, 5000, 50000, 60000, 1000000],
            ['1',  0, 0, 2000, 2000, 0,      0],

            ['x2', 0,    1000000],
            ['2',  3000, 3000],
            
        ],
        names: {
            '1': 'New Policy 1',
            '2': 'New Policy 2',
        },
        colors: {
        },
    },
    transition: {
        duration: 400,
    },
    point: {
      show: false,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 60,
        right: 35,
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
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000],
            },
            padding: {left: 0, right: 10},
            height: 45,
            max: 100000,
        },
        y: {
            label: {text: 'Benefit Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500]
            },
            padding: {top: 40, bottom: 0},
            min: 0,
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [],
            min: 0,
        },
    }
});
