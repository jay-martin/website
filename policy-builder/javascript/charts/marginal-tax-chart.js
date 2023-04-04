var marginal_tax_chart = c3.generate({
    bindto: '#marginal_tax_chart',
    data: {
        xs: {
            marginal_tax : 'x_marginal_tax',
        },
        columns: [
            ['x_marginal_tax', 0, 2499, 2500, 13165.666666666668, 13166.666666666668, 13849, 13850, 17849, 17850, 199999, 200000, 239999],
            ['marginal_tax', -0, -0, -14.999999999999998, -14.999999999999998, -0, -0, -10, -10, -0, -0, 5, 5],
        ],
        types: {
            marginal_tax: 'area',
        },
        names: {
            marginal_tax: 'Effective Marginal Tax Rate',
        },
        colors: {
            marginal_tax: '#f7c22f',
        },
    },
    transition: {
        duration: 400,
    },
    point: {
      show: false,
    },
    size: {
        height: 320,
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 60,
        right: 30,
    },
    legend: {
        position: 'bottom',
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 20000, 40000, 60000, 80000, 100000],
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
                values: [-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
            },
            padding: {top: 10, bottom: 7.5},
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