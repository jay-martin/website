/******************************************************************************************
 * This file contains the function creating the "Head of Household" c3.js chart
 * ****************************************************************************************/

var eitcChart = c3.generate({
    bindto: '#eitc_chart',
    size: {
        height: programsChartHeight,
    },
    data: {
        xs: {
            'childless' :         'x0',
            'childless_married' : 'x0M',

            'one_child' :         'x1',
            'one_child_married' : 'x1M',

            'two_child' :         'x2',
            'two_child_married' : 'x2M',

            'three_child' :         'x3',
            'three_child_married' : 'x3M',

            'point0' : 'x_point',
            'point0M' : 'x_point',
            'point1' : 'x_point',
            'point1M' : 'x_point',
            'point2' : 'x_point',
            'point2M' : 'x_point',
            'point3' : 'x_point',
            'point3M' : 'x_point',
        },
        columns: [
            ['x0M',               0, 7840, 16370, 24210],
            ['childless_married', 0, 600,  600,   0],

            ['x0',        0, 7840, 9800, 17640],
            ['childless', 0, 600,  600,  0],

            ['x1M',                0, 11750, 28120, 53120],
            ['one_child_married', 0, 3995,  3995,  0],

            ['x1',        0, 11750, 21560, 46560],
            ['one_child', 0, 3995,  3995,  0],

            ['x2M',               0, 16510, 28120, 59478],
            ['two_child_married', 0, 6604,  6604,  0],

            ['x2',        0, 16510, 21560, 52918],
            ['two_child', 0, 6604,  6604,  0],

            ['x3M',                 0, 16510, 28120, 63398],
            ['three_child_married', 0, 7430,  7430,  0],

            ['x3',          0, 16510, 21560, 56838],
            ['three_child', 0, 7430,  7430,  0],

            ['x_point', 20000],
            ['point0',  0],
            ['point0M', 322.3],
            ['point1',  3995],
            ['point1M', 3995],
            ['point2',  6604],
            ['point2M', 6604],
            ['point3',  7430],
            ['point3M', 7430],
            
        ],
        regions: {
            childless_married   : [ {'style':'dashed'}, ],
            one_child_married   : [ {'style':'dashed'}, ],
            two_child_married   : [ {'style':'dashed'}, ],
            three_child_married : [ {'style':'dashed'}, ],
        },
        names: {
            childless:   'Childless',
            one_child:   'One Child',
            two_child:   'Two Children',
            three_child: 'Three Children'
        },
        colors: {
            childless           : '#6ab6fc',
            childless_married   : '#6ab6fc',
            point0              : '#6ab6fc',
            point0M             : '#6ab6fc',

            one_child           : '#f7c22f',
            one_child_married   : '#f7c22f',
            point1              : '#f7c22f',
            point1M             : '#f7c22f',

            two_child           : '#fa0000',
            two_child_married   : '#fa0000',
            point2              : '#fa0000',
            point2M             : '#fa0000',

            three_child         : green_shade,
            three_child_married : green_shade,
            point3              : green_shade,
            point3M             : green_shade,
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
        hide: ['childless_married', 'one_child_married', 'two_child_married', 'three_child_married', 'point0', 'point0M', 'point1', 'point1M', 'point2', 'point2M', 'point3', 'point3M',],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000]
            },
            padding: {left: 0, right: 0},
            max: 65000,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000]
            },
            max: 8000,
            padding: {top: 0, bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 20000}],
            min: 0,
        },
    }
});

var tabletEITCChart = c3.generate({
    bindto: '#tablet_eitc_chart',
    size: {
        height: programsChartHeight,
    },
    data: {
        xs: {
            'childless' :         'x0',
            'childless_married' : 'x0M',

            'one_child' :         'x1',
            'one_child_married' : 'x1M',

            'two_child' :         'x2',
            'two_child_married' : 'x2M',

            'three_child' :         'x3',
            'three_child_married' : 'x3M',

            'point0' : 'x_point',
            'point0M' : 'x_point',
            'point1' : 'x_point',
            'point1M' : 'x_point',
            'point2' : 'x_point',
            'point2M' : 'x_point',
            'point3' : 'x_point',
            'point3M' : 'x_point',
        },
        columns: [
            ['x0M',               0, 7840, 16370, 24210],
            ['childless_married', 0, 600,  600,   0],

            ['x0',        0, 7840, 9800, 17640],
            ['childless', 0, 600,  600,  0],

            ['x1M',                0, 11750, 28120, 53120],
            ['one_child_married', 0, 3995,  3995,  0],

            ['x1',        0, 11750, 21560, 46560],
            ['one_child', 0, 3995,  3995,  0],

            ['x2M',               0, 16510, 28120, 59478],
            ['two_child_married', 0, 6604,  6604,  0],

            ['x2',        0, 16510, 21560, 52918],
            ['two_child', 0, 6604,  6604,  0],

            ['x3M',                 0, 16510, 28120, 63398],
            ['three_child_married', 0, 7430,  7430,  0],

            ['x3',          0, 16510, 21560, 56838],
            ['three_child', 0, 7430,  7430,  0],

            ['x_point', 20000],
            ['point0',  0],
            ['point0M', 322.3],
            ['point1',  3995],
            ['point1M', 3995],
            ['point2',  6604],
            ['point2M', 6604],
            ['point3',  7430],
            ['point3M', 7430],
            
        ],
        regions: {
            childless_married   : [ {'style':'dashed'}, ],
            one_child_married   : [ {'style':'dashed'}, ],
            two_child_married   : [ {'style':'dashed'}, ],
            three_child_married : [ {'style':'dashed'}, ],
        },
        names: {
            childless:   'Childless',
            one_child:   'One Child',
            two_child:   'Two Children',
            three_child: 'Three Children'
        },
        colors: {
            childless           : '#6ab6fc',
            childless_married   : '#6ab6fc',
            point0              : '#6ab6fc',
            point0M             : '#6ab6fc',

            one_child           : '#f7c22f',
            one_child_married   : '#f7c22f',
            point1              : '#f7c22f',
            point1M             : '#f7c22f',

            two_child           : '#fa0000',
            two_child_married   : '#fa0000',
            point2              : '#fa0000',
            point2M             : '#fa0000',

            three_child         : green_shade,
            three_child_married : green_shade,
            point3              : green_shade,
            point3M             : green_shade,
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
        hide: ['childless_married', 'one_child_married', 'two_child_married', 'three_child_married', 'point0', 'point0M', 'point1', 'point1M', 'point2', 'point2M', 'point3', 'point3M',],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000]
            },
            padding: {left: 0, right: 0},
            max: 65000,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000]
            },
            max: 8000,
            padding: {top: 0, bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 20000}],
            min: 0,
        },
    }
});
