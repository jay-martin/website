//Determine which set of x tick values to use depending on screen width
//Mobile screens require fewer ticks
var windowWidth = window.innerWidth;
if(windowWidth < 800){
    eitc_reform_tick = [0, 20000, 40000, 60000, 80000, 100000];
}
else{
    eitc_reform_tick = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
}

var simplerEITC = c3.generate({
    bindto: '#simpler_eitc',
    data: {
        xs: {
            'person1' : 'x1',
            'married' : 'x3',
        },
        columns: [
            ['x3',      0, 20000, 40000, 80000,],
            ['married', 0, 6000,  6000,  0,],
            ['x1',      0, 10000, 20000, 40000,],
            ['person1', 0, 3000,  3000,  0,],
        ],
        names: {
            person1: "Single EITC",
            married: "Married EITC",
        },
        colors: {
            person1        : '#6ab6fc',
            married        : '#000000',
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
        hide: ['point1', 'point2', 'point_married', 'combined', 'bonus', 'married_value', 'penalty'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: eitc_reform_tick,
            },
            padding: {left: 0, right: 30},
            max: 90000,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000]
            },
            padding: {bottom: 0, top: 0},
            max: 7000,
        }
    },
});