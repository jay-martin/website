/******************************************************************************************
 * This file contains the function creating the c3.js chart for the Top Chart
 * ****************************************************************************************/

var reformedCDCC = c3.generate({
    bindto: '#reformed_cdcc',
    data: {
        xs: {
            'one_child_credit_amount' : 'x_credit_amount',
            'two_child_credit_amount' : 'x_credit_amount',
            
            'one_child_point'         : 'x_one_child_point',
            'one_child_vertical_line' : 'x_one_child_vertical_line',

            'two_child_point'         : 'x_two_child_point',
            'two_child_vertical_line' : 'x_two_child_vertical_line',
        },
        columns: [
            ['x_credit_amount',         0, 28571, 57142, 70000],
            ['two_child_credit_amount', 0, 1000,  2000,  2000],
            ['one_child_credit_amount', 0, 1000,  1000,  1000],

            ['x_one_child_vertical_line', 28570, 28571],
            ['one_child_vertical_line',   0,     1000],

            ['x_one_child_point', 28571],
            ['one_child_point',   1000],

            ['x_two_child_vertical_line', 57141, 57142],
            ['two_child_vertical_line',   0,     2000],

            ['x_two_child_point', 57142],
            ['two_child_point',   2000],
        ],
        names: {
            one_child_credit_amount:  'Amount of One Child CDCC Families Can Claim',
            two_child_credit_amount: 'Amount of Two+ Child CDCC Families Can Claim',
            missing_credit: 'Credit Inaccessible to Low-Income Parents',
        },
        regions: {
            one_child_vertical_line: [ {'style':'dashed'}, ],
            two_child_vertical_line: [ {'style':'dashed'}, ],
        },
        order: false,
        colors: {
            one_child_credit_amount : '#f7c22f',
            two_child_credit_amount : '#6ab6fc',

            one_child_vertical_line : white_or_black,
            one_child_point         : white_or_black,

            two_child_vertical_line : white_or_black,
            two_child_point         : white_or_black,
        },
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 65,
        right: 40,
    },
    legend: {
        position: 'bottom',
        hide: ['one_child_vertical_line', 'one_child_point', 'two_child_vertical_line', 'two_child_point',],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000]
            },
            padding: {left: 0, right: 0},
        },
        y: {
            label: {text: 'Amount of Credit Claimed', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250]
            },
            padding: {top: 20, bottom: 0},
        },
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            min: 0,
        },
    }
});
