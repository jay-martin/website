/******************************************************************************************
 * This file contains the function creating the "Head of Household" c3.js chart
 * ****************************************************************************************/

var ctcChart = c3.generate({
    bindto: '#ctc_chart',
    size: {
        height: programsChartHeight,
    },
    data: {
        xs: {
            'ctc'   : 'x',
            'point' : 'x_point',
        },
        columns: [
            ['x',   0, 2500, 13167, 20800, 24800, 200000, 240000],
            ['ctc', 0, 0,    1600,  1600,  2000,  2000,   0],

            ['x_point', 18000],
            ['point',   1600],
            
        ],
        names: {
            ctc: 'Child Tax Credit',
        },
        colors: {
            ctc   : '#6ab6fc',
            point : '#6ab6fc',
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
                values: [0, 50000, 100000, 150000, 200000, 250000, 300000]
            },
            padding: {left: 0, right: 0},
        },
        y: {
            label: {text: 'CTC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000,]
            },
            padding: {bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 18000}],
            min: 0,
        },
    }
});

var tabletCTCChart = c3.generate({
    bindto: '#tablet_ctc_chart',
    size: {
        height: programsChartHeight,
    },
    data: {
        xs: {
            'ctc'   : 'x',
            'point' : 'x_point',
        },
        columns: [
            ['x',   0, 2500, 13167, 20800, 24800, 200000, 240000],
            ['ctc', 0, 0,    1600,  1600,  2000,  2000,   0],

            ['x_point', 18000],
            ['point',   1600],
            
        ],
        names: {
            ctc: 'Child Tax Credit',
        },
        colors: {
            ctc   : '#6ab6fc',
            point : '#6ab6fc',
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
                values: [0, 50000, 100000, 150000, 200000, 250000, 300000]
            },
            padding: {left: 0, right: 0},
        },
        y: {
            label: {text: 'CTC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000,]
            },
            padding: {top: 85, bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 18000}],
            min: 0,
        },
    }
});
