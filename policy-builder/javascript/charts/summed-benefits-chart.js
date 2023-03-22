/******************************************************************************************
 * This file contains the function creating the c3.js chart for the Top Chart
 * ****************************************************************************************/

var summed_benefits_chart = c3.generate({
    bindto: '#summed_benefits_chart',
    data: {
        xs: {
            'summed_benefits' : 'x_summed_benefits',
        },
        columns: [
            ['x_summed_benefits', 0,    5000, 50000, 60000, 1000000],
            ['summed_benefits',   3000, 5000, 5000,  3000,   3000],
        ],
        names: {
            'summed_benefits': 'Sum of Benefits',
        },
        colors: {
            summed_benefits : white_or_black,
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
        hide: [],
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
