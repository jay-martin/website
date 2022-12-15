//Determine which set of x tick values to use depending on screen width
//Mobile screens require fewer ticks
var windowWidth = window.innerWidth;
if(windowWidth < 800){
    standard_credit_tick = [0, 20000, 40000, 60000, 80000];
}
else{
    standard_credit_tick = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000];
}

var standardCredit = c3.generate({
    bindto: '#standard_credit_chart',
    data: {
        xs: {
            'person1' : 'x1',
            'married' : 'x3',

            'combined'    : 'x_horizontal',
            'bonus'       : 'x_horizontal',

            'point1' : 'x_point1',
            'point_married' : 'x_point_married',
        },
        columns: [
            ['x3',      0, 20000, 40000, 80000],
            ['married', 0, 6000,  6000,  0],
            ['x1',      0, 10000, 20000, 40000],
            ['person1', 0, 3000,  3000,  0],
        ],
        types: {
           'combined' : 'area',
           'bonus'    : 'area',
        },
        regions: {
            person2: [ {'style':'dashed'}, ],
        },
        groups: [ ['combined', 'bonus'] ], 
        order: false,
        names: {
            person1: "Individual Tax Credit",
            married: "Married Tax Credit",
        },
        colors: {
            person1: '#6ab6fc',
            point1:  '#6ab6fc',
            married: '#000000',
            point_married: '#000000',

            combined : '#FFFFFF',
            bonus    : '#36D903',      
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
        hide: ['point1', 'point_married', 'combined', 'bonus'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: standard_credit_tick
            },
            padding: {left: 0, right: 30},
            max: 80000,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
            },
            padding: {bottom: 0, top: 0},
            max: 8000,
            min: 0
        }
    },
});