var eitc_emtr_chart = c3.generate({
    bindto: '#eitc_emtr_chart',
    data: {
        xs: {
            eitc : 'x_eitc',
            tax  : 'x_tax',
        },
        columns: [
            ['x_eitc', 0,   11749, 11750],
            ['eitc',   -40, -40,  0],

            ['x_tax', 21559, 21560, 46559, 46560],
            ['tax',   0,     21.56, 21.56, 0],
        ],
        types: {
            eitc: 'area',
            tax:  'area',
        },
        names: {
            eitc  : 'Net Benefit',
        },
        colors: {
            eitc : '#6ab6fc',
            tax  : '#6ab6fc',
        },
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 65,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: ['tax'],
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
            max: 60000,
            height: 45,
        },
        y: {
            label: {text: 'Effective Marginal Tax Rate', position: 'outer-middle'},
            tick: {
                format: function(value){
                    return d3.format('.0%')(value/100)
                    },
                values: [-50, -40, -30, -20, -10, 0, 10, 20, 30]
            },
            padding: {top: 0, bottom: 0},
            max: 30,
            min: -50,
        },
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
