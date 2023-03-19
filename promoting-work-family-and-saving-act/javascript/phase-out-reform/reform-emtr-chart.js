/******************************************************************************************
 * This file contains the function creating the c3.js chart
 * ****************************************************************************************/

var phase_out_reform_emtr_chart = c3.generate({
    bindto: '#phase_out_reform_emtr_chart',
    data: {
        xs: {
            total : 'x',
            snap  : 'x_snap',
            eitc  : 'x_eitc',
        },
        columns: [
            ['x',     0,     19999, 20000, 74999, 75000, 100000],
            ['total', -7.65, -7.65, 24,    24,    0,     0],
        ],
        types: {
            total: 'area',
        },
        regions: {
            snap : [ {'style':'dashed'}, ],
            eitc : [ {'style':'dashed'}, ],
        },
        names: {
            total : 'Net Effective Marginal Tax Rate (EMTR)',
            snap  : 'SNAP EMTR',
            eitc  : 'EITC EMTR',
        },
        colors: {
            total : '#f7c22f',
            snap  : purple_shade,
            eitc  : '#6ab6fc',
        },
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 55,
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
            padding: {left: 0, right: 0},
            max: 100000,
            height: 45,
        },
        y: {
            label: {text: 'Effective Marginal Tax Rate', position: 'outer-middle'},
            tick: {
                format: function(value){
                    return d3.format('.0%')(value/100)
                    },
                values: [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
            },
            padding: {top: 0, bottom: 0},
            max: 90,
            min: -50,
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
        y: {
            lines: [{value: 0, text: ''}],
        }
    },
});
