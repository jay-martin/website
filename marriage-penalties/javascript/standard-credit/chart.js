//Determine which set of x tick values to use depending on screen width
//Mobile screens require fewer ticks
var windowWidth = window.innerWidth;
if(windowWidth < 800){
    standard_credit_tick = [0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000];
}
else{
    standard_credit_tick = [0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000];
    //standard_credit_tick = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000];
}

var standardCredit = c3.generate({
    bindto: '#standard_credit_chart',
    data: {
        xs: {
            'person1' : 'x1',
            'married' : 'x3',
            'tax'     : 'x4',
        },
        columns: [
            ['x3',      0, 20000, 40000, 80000],
            ['married', 0, 6000,  6000,  0],
            ['x1',      0, 10000, 20000, 40000],
            ['person1', 0, 3000,  3000,  0],
            ['x4',      95375, 200000],
            ['tax',     0,     0],
            //['x4',      0, 95375, 200000],
            //['tax',     0, 0,     10462.5],
        ],
        types: {
           'tax' : 'area',
        },
        names: {
            person1: "Individual Tax Credit",
            married: "Married Tax Credit",
            tax:     "New Tax",
        },
        colors: {
            person1: '#6ab6fc',
            point1:  '#6ab6fc',
            married: white_or_black,
            point_married: white_or_black,
            tax: '#eb3734',
        },
        hide: ['tax'],
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
                values: standard_credit_tick
            },
            padding: {left: 0, right: 30},
            max: 80000,
        },
        y: {
            label: {text: 'Tax Credit Value', position: 'outer-middle'},
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