var benefits_chart = c3.generate({
    bindto: '#benefits_chart',
    data: {
        xs: {
            '0' : 'x0',
            '1' : 'x1',
            '2' : 'x2',
            '3' : 'x3',
            '4' : 'x4',
        },
        columns: [
            ['x0', 0, 2500, 13167, 13850, 17850, 200000, 240000, 1000000],
            ['0',  0, 0,    1600,  1600,  2000,  2000,   0,      0],   
        ],
        names: {
            '0': 'Child Tax Credit',
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
    size: {
        height: 320,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 60,
        right: 30,
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
