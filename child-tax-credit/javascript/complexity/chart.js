var complexity_chart = c3.generate({
    bindto: '#complexity_chart',
    data: {
        xs: {
            'one_child_single'  : 'x1S',
            'one_child_hoh'     : 'x1H',
            'one_child_married' : 'x1M',

            'two_child_single'  : 'x2S',
            'two_child_hoh'     : 'x2H',
            'two_child_married' : 'x2M',

            'three_child_single'  : 'x3S',
            'three_child_hoh'     : 'x3H',
            'three_child_married' : 'x3M',

            'four_child_single'  : 'x4S',
            'four_child_hoh'     : 'x4H',
            'four_child_married' : 'x4M',

            'point1S' : 'x_point',
            'point1H' : 'x_point',
            'point1M' : 'x_point',

            'point2S' : 'x_point',
            'point2H' : 'x_point',
            'point2M' : 'x_point',

            'point3S' : 'x_point',
            'point3H' : 'x_point',
            'point3M' : 'x_point',

            'point4S' : 'x_point',
            'point4H' : 'x_point',
            'point4M' : 'x_point',
        },
        columns: [
            ['x4M',                0, 2500, 27700,  44580,  400000, 560000],
            ['four_child_married', 0, 0,    3780,   8000,   8000,   0],
            ['x4H',                0, 2500, 20800,  36500,  41426,  200000, 360000],
            ['four_child_hoh',     0, 0,    2745,   6670,   8000,   8000,   0],
            ['x4S',                0, 2500, 13850,  24850,  37989,  200000, 360000],
            ['four_child_single',  0, 0,    1702.5, 4452.5, 8000,   8000,   0],

            ['x3M',                 0, 2500, 27700, 34500, 39700, 400000, 520000],
            ['three_child_married', 0, 0,    3780,  5480,  6000,  6000,   0],
            ['x3H',                 0, 2500, 20800, 33820, 200000, 320000],
            ['three_child_hoh',     0, 0,    2745,  6000,  6000,   0],
            ['x3S',                 0, 2500, 13850,  24850,  30581, 200000, 320000],
            ['three_child_single',  0, 0,    1702.5, 4452.5, 6000,  6000,   0],

            ['x2M',                 0, 2500, 23833, 27700, 35700, 400000, 480000],
            ['two_child_married',   0, 0,    3200,  3200,  4000,  4000,   0],
            ['x2H',                 0, 2500, 20800, 23833,   28800, 200000, 280000],
            ['two_child_hoh',       0, 0,    2745,  3503.25, 4000,  4000,   0],
            ['x2S',                 0, 2500, 13850,  23040, 200000, 280000],
            ['two_child_single',    0, 0,    1702.5, 4000,  4000,   0],

            ['x1M',                 0, 2500, 13167, 27700, 31700, 400000, 440000],
            ['one_child_married',   0, 0,    1600,  1600,  2000,  2000,   0 ],
            ['x1H',                 0, 2500, 13167, 20800, 24800, 200000, 240000],
            ['one_child_hoh',       0, 0,    1600,  1600,  2000,  2000,   0],
            ['x1S',                 0, 2500, 13167, 13850, 17850, 200000, 240000],
            ['one_child_single',    0, 0,    1600,  1600,  2000,  2000,   0],

            ['x_point', 18000],

            ['point4M', 2325],
            ['point4H', 2325],
            ['point4S', 2740],

            ['point3M', 2325],
            ['point3H', 2325],
            ['point3S', 2740],

            ['point2M', 2325],
            ['point2H', 2325],
            ['point2S', 2740],

            ['point1M', 1600],
            ['point1H', 1600],
            ['point1S', 2000],
            
        ],
        regions: {
            //childless_married   : [ {'style':'dashed'}, ],
        },
        names: {
            one_child_single:  'One Child, Single',
            one_child_hoh:     'One Child, HOH',
            one_child_married: 'One Child, Married',

            two_child_single:  'Two Children, Single',
            two_child_hoh:     'Two Children, HOH',
            two_child_married: 'Two Children, Married',

            three_child_single:  'Three Children, Single',
            three_child_hoh:     'Three Children, HOH',
            three_child_married: 'Three Children, Married',

            four_child_single:  'Four Children, Single',
            four_child_hoh:     'Four Children, HOH',
            four_child_married: 'Four Children, Married',
        },
        colors: {
            one_child_single  : '#6ab6fc',
            point1S           : '#6ab6fc',
            one_child_hoh     : '#1790ff',
            point1H           : '#1790ff',
            one_child_married : '#0065c2',
            point1M           : '#0065c2',

            two_child_single  : '#f7c22f',
            point2S           : '#f7c22f',
            two_child_hoh     : '#bf8d02',
            point2H           : '#bf8d02',
            two_child_married : '#856100',
            point2M           : '#856100',

            three_child_single  : '#fa0000',
            point3S             : '#fa0000',
            three_child_hoh     : '#a30000',
            point3H             : '#a30000',
            three_child_married : '#6e0000',
            point3M             : '#6e0000',

            four_child_single  : '#c500e3',
            point4S            : '#c500e3',
            four_child_hoh     : '#89009e',
            point4H            : '#89009e',
            four_child_married : '#89009e',
            point4M            : '#89009e',

            
        },
    },
    size: {
        height: 500,
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
        hide: ['point1S', 'point1H', 'point1M', 'point2S', 'point2H', 'point2M', 'point3S', 'point3H', 'point3M', 'point4S', 'point4H', 'point4M',],
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
            max: 60000,
            height: 45,
        },
        y: {
            label: {text: 'CTC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
            },
            max: 9000,
            padding: {top: 0, bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 18000, text: 'Your income'}],
            min: 0,
        },
    }
});
