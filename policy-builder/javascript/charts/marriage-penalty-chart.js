var marriage_penalty_chart = c3.generate({
    bindto: '#marriage_penalty_chart',
    data: {
        xs: {
            y_green1 : 'x_green1',
            y_red1 : 'x_red1'
        },
        columns: [
            ['x_green1', 0, 2500, 5700, 13166.666666666668, 13850, 17850, 200000, 240000, 370000, 410000],
            ['y_green1', 1430, 1680, 1520, 400, 400, 0, 0, 2000, 2000, 0],
            ['x_red1', 410000, 450000, 970000, 1000000],
            ['y_red1', 0, -2000, -2000, -2000],
        ],
        types: {
            y_green1: 'area',
            y_red1: 'area',
        },
        names: {
            y_green1 : 'Marriage Bonus',
            y_red1   : 'Marriage Penalty',
        },
        colors: {
            y_green1 : '#36D903',
            y_red1   : '#eb3734',
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
        left: 70,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: ['y_red2', 'y_red3', 'y_red4', 'y_red5', 'y_red6', 'y_green2', 'y_green3', 'y_green4', 'y_green5', 'y_green6',],
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
            label: {text: 'Marriage Penalty / Bonus', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [-6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000]
            },
            padding: {top: 10, bottom: 10},
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