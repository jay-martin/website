//Determine which set of x tick values to use depending on screen width
//Mobile screens require fewer ticks
var windowWidth = window.innerWidth;
if(windowWidth < 800){
    hoh_fix_tick = [0, 50000, 100000, 150000, 200000];
}
else{
    hoh_fix_tick = [0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000];
}

var single_tax_chart = c3.generate({
    bindto: '#single_tax_chart',
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
            ['x1',      0, 13850, 24850, 58575, 109225, 195950, 245100, 591975],
            ['person1', 0, 0,     1100,  5147,  16290,  37104,  52832,  174238.25],
            ['x2',      0, 13850, 24850, 58575, 109225, 195950, 245100, 591975],
            ['person2', 0, 0,     1100,  5147,  16290,  37104,  52832,  174238.25],

            ['x_horizontal', 0,     200000],
            ['married_tax',  10921, 10921 ],
            ['tax_bonus',    1858,  1858],

            ['x_point1', 80000],
            ['point1',   9861],
            ['x_point2', 40000],
            ['point2',   2918],
            ['x_point_married', 120000],
            ['point_married',   10921],
        ],
        types: {
           'married_tax' : 'area',
           'tax_bonus'   : 'area',
        },
        regions: {
            person2: [ {'style':'dashed'}, ],
        },
        groups: [ ['married_tax', 'tax_bonus'] ], 
        order: false,
        names: {
            person1 : 'Your Tax Schedule',
            person2 : "Your Partner's Tax Schedule",
            married : 'Your Married Tax Schedule',

            y_red1         : 'Marriage Penalty',
            y_green1       : 'Marriage Bonus',
        },
        colors: {
            person1 : '#6ab6fc',
            point1  : '#6ab6fc',

            person2        : purple_shade,
            person2_dashed : purple_shade,
            point2         : purple_shade,

            married        : white_or_black,
            point_married  : white_or_black,

            married_tax    : '#36D903',
            tax_bonus      : '#36D903',    

            values         : '#eb3734',
            values_point   : '#eb3734',  
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
        hide: ['values', 'values_point', 'point1', 'point2', 'point_married', 'married_tax', 'tax_bonus', 'y_green2', 'y_green3', 'y_green4', 'y_red2', 'y_red3', 'y_red4' ],
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
            height: 45,
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
            lines: [{value: 0}, {value: 12799, text: "Combined individual tax"}, {value: 10921, text: "Married tax", y_position: 'below'},]
        }
    },
});