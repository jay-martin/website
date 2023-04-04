var summed_benefits_chart = c3.generate({
    bindto: '#summed_benefits_chart',
    data: {
        xs: {
            'summed_benefits' : 'x_summed_benefits',
        },
        columns: [
            ['x_summed_benefits', 0, 2500, 13167, 13850, 17850, 200000, 240000, 1000000],
            ['summed_benefits',   0, 0,    1600,  1600,  2000,  2000,   0,      0],   
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
    size: {
        height: 320,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 70,
        right: 20,
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
                values: [0, 20000, 40000, 60000, 80000, 100000],
            },
            padding: {left: 0, right: 10},
            height: 45,
            max: 100000,
        },
        y: {
            label: {text: 'Benefit Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000]
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
