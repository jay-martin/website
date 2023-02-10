//Determine which set of x tick values to use depending on screen width
//Mobile screens require fewer ticks
var windowWidth = window.innerWidth;
if(windowWidth < 800){
    hoh_fix_tick = [0, 50000, 100000, 150000, 200000];
}
else{
    hoh_fix_tick = [0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000];
}

var hoh_tax_chart = c3.generate({
    bindto: '#hoh_tax_chart',
    data: {
        xs: {
            'person1'        : 'x1',
            'person2'        : 'x2',
            'person2_dashed' : 'x2',
            'married'        : 'x3',

            'married_tax'    : 'x_horizontal',
            'tax_bonus'      : 'x_horizontal',

            'combined_tax'   : 'x_horizontal',
            'tax_penalty'    : 'x_horizontal',

            'point1'         : 'x_point1',
            'point2'         : 'x_point2',
            'point_married'  : 'x_point_married',

            'values_point'   : 'x_values_point',
        },
        columns: [
            ['x3',      0, 27700, 49700, 117150, 218450, 391900, 490200, 721450],
            ['married', 0, 0,     2200,  10294,  32580,  74208,  105664, 186601.5],
            ['x1',      0, 20800, 36500, 80650, 116150, 202900, 252050, 598900],
            ['person1', 0, 0,     1570,  6868,  14678,  35498,  51226,  172623.5],
            ['x2',      0, 13850, 24850, 58575, 109225, 195950, 245100, 591975],
            ['person2', 0, 0,     1100,  5147,  16290,  37104,  52832,  174238.25],
            ['person2_dashed', 0, 0,     1100,  5147,  16290,  37104,  52832,  174238.25],

            ['x_horizontal', 0,    200000],
            ['combined_tax', 9718, 9718],
            ['tax_penalty',  1203, 1203],

            ['x_point1', 80000],
            ['point1',   6800],
            ['x_point2', 40000],
            ['point2',   2918],
            ['x_point_married', 120000],
            ['point_married',   10921],
        ],
        hide: ['person2_dashed'],
        types: {
            'combined_tax' : 'area',
            'tax_penalty'  : 'area',
            'married_tax'  : 'area',
            'tax_bonus'    : 'area',
        },
        regions: {
            person2_dashed : [ {'style':'dashed'}, ],
        },
        groups: [ ['married_tax', 'tax_bonus'], ['combined_tax', 'tax_penalty'] ], 
        order: false,
        names: {
            person1        : 'Your Tax Schedule',
            person2        : "Your Partner's Tax Schedule",
            person2_dashed : "Your Partner's Tax Schedule",
            married        : 'Your Married Tax Schedule',

            y_red1         : 'Marriage Penalty',
            y_green1       : 'Marriage Bonus',
        },
        colors: {
            person1 : '#6ab6fc',
            point1  : '#6ab6fc',

            person2        : purple_shade,
            person2_dashed : purple_shade,
            point2         : purple_shade,

            married       : white_or_black,
            point_married : white_or_black,

            combined_tax  : 'red',
            tax_penalty   : 'red',

            married_tax   : '#36D903',
            tax_bonus     : '#36D903',    

            values_point  : '#eb3734',
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
        hide: ['values_point', 'point1', 'point2', 'point_married', 'married_tax', 'tax_bonus', 'combined_tax', 'tax_penalty', 'person2_dashed', 'y_green2', 'y_green3', 'y_green4', 'y_red2', 'y_red3', 'y_red4' ],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: hoh_fix_tick, //hoh_fix_tick defined above this variable
            },
            padding: {left: 0, right: 30},
            max: 200000,
        },
        y: {
            label: {text: 'Tax Liability', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 5000, 10000, 15000, 20000, 25000, 30000]
            },
            padding: {bottom: 0, top: 0},
            max: 30000,
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 80000, text: 'Your income'}, {value: 40000, text: "Your partner's income"}, {value: 120000, text: 'Combined income'}]
        },
        y: {
            lines: [{value: 0}, {value: 10921, text: "Married tax"}, {value: 9718, text: "Combined individual tax"}, ]
        }
    },
});




