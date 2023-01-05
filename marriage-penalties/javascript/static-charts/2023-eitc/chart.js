/******************************************************************************************
 * This file contains the function creating the c3.js chart for the 2023 EITC
 * ****************************************************************************************/

//Determine which set of x tick values to use depending on screen width
//Mobile screens require fewer ticks
var windowWidth = window.innerWidth;
if(windowWidth < 800){
    eitc_2023_tick = [0, 20000, 40000, 60000, 80000, 100000];
}
else{
    eitc_2023_tick = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
}

var eitc2023 = c3.generate({
    bindto: '#eitc_2023',
    data: {
        xs: {
            'zero_single'  : 'x_zero_single',
            'zero_married' : 'x_zero_married',

            'one_single'   : 'x_one_single',
            'one_married'  : 'x_one_married',

            'two_single'   : 'x_two_single',
            'two_married'  : 'x_two_married',

            'three_single' : 'x_three_single',
            'three_married': 'x_three_married',
        },
        columns: [
            ['x_zero_single',   0, 7840,  9800,  17640],
            ['zero_single',     0, 600,   600,   0],
            ['x_zero_married',  0, 7840,  16370, 24210],
            ['zero_married',    0, 600,   600,   0],

            ['x_one_single',    0, 11750, 21560, 46560],
            ['one_single',      0, 3995,  3995,  0],
            ['x_one_married',   0, 11750, 28120, 53120],
            ['one_married',     0, 3995,  3995,  0],

            ['x_two_single',    0, 16510, 21560, 52918],
            ['two_single',      0, 6604,  6604,  0],
            ['x_two_married',   0, 16510, 28120, 59478],
            ['two_married',     0, 6604,  6604,  0],

            ['x_three_single',  0, 16510, 21560, 56838],
            ['three_single',    0, 7430,  7430,  0],
            ['x_three_married', 0, 16510, 28120, 63398],
            ['three_married',   0, 7430,  7430,  0],
        ],
        regions: {
            zero_married  : [ {'style':'dashed'}, ],
            one_married   : [ {'style':'dashed'}, ],
            two_married   : [ {'style':'dashed'}, ],
            three_married : [ {'style':'dashed'}, ],
        },
        names: {
            zero_single  : 'No Children',
            one_single   : 'One Child',
            two_single   : 'Two Children',
            three_single : 'Three or More Children',
        },
        colors: {
            zero_single    : '#6ab6fc',
            zero_married   : '#6ab6fc',

            one_single     : '#f7c22f',
            one_married    : '#f7c22f',

            two_single     : '#fa0000',
            two_married    : '#fa0000',

            three_single   : green_shade,
            three_married  : green_shade,
        },
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 65,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: ['zero_married', 'one_married', 'two_married', 'three_married',],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: eitc_2023_tick,
            },
            padding: {left: 0, right: 30},
            max: 65000,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 2000, 4000, 6000, 8000, 10000,],
            },
            padding: {bottom: 0, top: 0},
            max: 8000,
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            //lines: [{value: 15000, text: 'Your income'},]
        },
    },
});