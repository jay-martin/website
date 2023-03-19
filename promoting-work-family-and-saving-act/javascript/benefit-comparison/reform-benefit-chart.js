/******************************************************************************************
 * This file contains the function creating the c3.js chart for the Top Chart
 * ****************************************************************************************/

var benefits_comparison_reformed_benefits = c3.generate({
    bindto: '#benefits_comparison_reformed_benefits',
    data: {
        xs: {
            'ctc'   : 'x_ctc',
            'snap'  : 'x_snap',
            'eitc'  : 'x_eitc',
        },
        columns: [
            ['x_eitc', 0, 20000, 50000, 75000],
            ['eitc',   0, 6330,  6330,  0],

            ['x_snap', 0,     50000],
            ['snap',   12000, 0],

            ['x_ctc', 0,   100000],
            ['ctc',  6000, 6000],
        ],
        names: {
            ctc:  'CTC',
            snap: 'SNAP',
            eitc: 'EITC',
        },
        colors: {
            ctc  : '#eb3734',
            snap : purple_shade,
            eitc : '#6ab6fc',
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
        hide: [],
    },
    tooltip: {
        show: false
    },
    size: {
        height: wide_chart_height,
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
                values: [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 15000]
            },
            padding: {top: 0, bottom: 0},
            max: 12000,
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 50000, class: 'dashed'}],
            min: 0,
        },
    }
});
