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

var fsaEITC = c3.generate({
    bindto: '#fsa_eitc',
    data: {
        xs: {
            'childless_single'  : 'x_childless_single',
            'childless_married' : 'x_childless_married',

            'child_single'   : 'x_child_single',
            'child_married'  : 'x_child_married',
        },
        columns: [
            ['x_child_single',       0, 12000, 23000, 37000],
            ['child_single',         0, 2000,  2000,  0],
            ['x_child_married',      0, 18000, 33000, 54000],
            ['child_married',        0, 3000,  3000,  0],

            ['x_childless_single',   0, 8000,  10000, 17000],
            ['childless_single',     0, 1000,  1000,  0],
            ['x_childless_married',  0, 16000, 20000, 34000],
            ['childless_married',    0, 2000,  2000,  0],
        ],
        regions: {
            childless_married  : [ {'style':'dashed'}, ],
            child_married   : [ {'style':'dashed'}, ],
        },
        names: {
            childless_single  : 'Childless Single',
            childless_married : 'Childless Married',
            child_single      : 'Single with Dependent',
            child_married     : 'Married with Dependent',
        },
        colors: {
            childless_single    : white_or_black,
            childless_married   : white_or_black,

            child_single     : '#f7c22f',
            child_married    : '#f7c22f',

            two_single     : '#fa0000',
            two_married    : '#fa0000',

            three_single   : '#0c6300',
            three_married  : '#0c6300',
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
            max: 60000,
            height: 45,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 6000, 8000, 10000,],
            },
            padding: {bottom: 0, top: 0},
            max: 3000,
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