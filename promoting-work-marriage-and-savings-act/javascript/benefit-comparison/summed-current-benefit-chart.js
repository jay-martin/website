/******************************************************************************************
 * This file contains the function creating the c3.js chart for the Top Chart
 * ****************************************************************************************/

var benefits_comparison_summed_current_benefits = c3.generate({
    bindto: '#benefits_comparison_summed_current_benefits',
    data: {
        xs: {
            'total_benefit' : 'x_total',
        },
        columns: [
            ['x_total',       0,     2500,  2895,     16510,   23833,    27700,   28120, 35700,     36084,     36085,     59478, 400000, 480000],
            ['total_benefit', 11268, 12268, 12485.25, 16705.9, 16046.88, 15118.8, 15060, 12402.452, 12229.4216, 8926.571, 4000,  4000,   0],
        ],
        names: {
            total_benefit: 'Sum of EITC, CTC, and SNAP Benefits',
        },
        colors: {
            total_benefit  : white_or_black,
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
                values: [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000, 28000, 30000]
            },
            padding: {top: 0, bottom: 0},
            max: 22000,
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
