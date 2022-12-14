//Determine which set of x tick values to use depending on screen width
//Mobile screens require fewer ticks
var windowWidth = window.innerWidth;
if(windowWidth < 800){
    hoh_fix_tick = [0, 50000, 100000, 150000, 200000];
}
else{
    hoh_fix_tick = [0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000];
}

var hohFixChart = c3.generate({
    bindto: '#hoh_fix_chart',
    data: {
        xs: {
            'person1' : 'x1',
            'person2' : 'x2',
            'person2_dashed' : 'x2',
            'married' : 'x3',

            'married_tax' : 'x_horizontal',
            'bonus'       : 'x_horizontal',

            'point1' : 'x_point1',
            'point2' : 'x_point2',
            'point_married' : 'x_point_married',
        },
        columns: [
            ['x3',      0, 25900, 46400, 109450, 204050],
            ['married', 0, 0,     2050,  9616,   30428],
            ['x1',      0, 12950, 23225,  54725,  102025,  183000,  228900],
            ['person1', 0, 0,     1027.5, 4807.5, 15213.5, 37755.5, 53443.5],
            ['x2',      0, 12950, 23225,  54725,  102025,  183000,  228900],
            ['person2', 0, 0,     1027.5, 4807.5, 15213.5, 37755.5, 53443.5],

            ['x_point1', 80000],
            ['point1',   10368],
            ['x_point2', 40000],
            ['point2',   3040.5],
            ['x_point_married', 120000],
            ['point_married',   11937],

            ['x_horizontal', 0,      200000],
            ['married_tax',  11937,  11937 ],
            ['bonus',        1471.5, 1471.5],
        ],
        types: {
           'married_tax' : 'area',
           'bonus'       : 'area',
        },
        regions: {
            person2: [ {'style':'dashed'}, ],
        },
        groups: [ ['married_tax', 'bonus'] ], 
        order: false,
        names: {
            person1: 'Your Tax Schedule',
            person2: "Your Partner's Tax Schedule",
            married: 'Your Married Tax Schedule',
        },
        colors: {
            person1: '#6ab6fc',
            point1:  '#6ab6fc',
            person2: '#770087',
            person2_dashed: '#770087',
            point2: '#770087',
            married: '#000000',
            point_married: '#000000',

            married_tax : '#FFFFFF',
            bonus       : '#36D903',      
        },
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 70,
        right: 22,
    },
    legend: {
        position: 'bottom',
        hide: ['point1', 'point2', 'point_married', 'married_tax', 'bonus'],
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
        x: {
            lines: [{value: 80000, text: 'Your income'}, {value: 40000, text: "Your partner's income"}, {value: 120000, text: 'Combined income'}]
        },
        y: {
            lines: [{value: 0}, {value: 11937, text: "Married tax"}, {value: 13408.5, text: "Combined individual tax"}, ]
        }
    },
});