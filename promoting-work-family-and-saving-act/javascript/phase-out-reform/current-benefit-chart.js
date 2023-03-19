/******************************************************************************************
 * This file contains the function creating the c3.js chart for the Top Chart
 * ****************************************************************************************/

//Determine height & x tick values  depending on screen width
if(window.innerWidth < 800){
    top_xTick  = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000];
    chart_height = 300;
}
else{
    top_xTick = [0, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000];
    chart_height = 380;
}

var current_benefits_chart = c3.generate({
    bindto: '#current_benefits_chart',
    data: {
        xs: {
            'ssi'   : 'x_ssi',
            'snap'  : 'x_snap',
            'eitc'  : 'x_eitc',
        },
        columns: [
            ['x_eitc', 0, 16510, 28120, 59478],
            ['eitc',   0, 6604,  6604,  0],

            ['x_snap', 0,     2895,  36083, 36084],
            ['snap',   11268, 11268, 3303,  0], 
        ],
        names: {
            ssi:  'SSI',
            snap: 'SNAP',
            eitc: 'EITC',
        },
        colors: {
            snap : purple_shade,
            eitc : '#6ab6fc',
        },
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
        hide: [],
    },
    tooltip: {
        show: false
    },
    size: {
        height: wide_chart_height,
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000],
            },
            padding: {left: 0, right: 10},
            height: 45,
            max: 100000,
        },
        y: {
            label: {text: 'Benefit Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000]
            },
            padding: {top: 0, bottom: 0},
            max: 12000,
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            //lines: [{value: 20000, text: 'Your income'}],
            min: 0,
        },
    }
});
