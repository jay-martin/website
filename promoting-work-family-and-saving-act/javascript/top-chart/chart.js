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

var top_chart_chart = c3.generate({
    bindto: '#topchart',
    data: {
        xs: {
            'current_eitc'  : 'x_current',
            'current_point' : 'x_point',

            'reformed_eitc' : 'x_reformed',
            'reformed_point': 'x_point',
        },
        columns: [
            ['x_current',      0, 10370, 24820, 46884],
            ['current_eitc',   0, 3526,  3526,  0],

            ['x_reformed',      0, 10370, 24820, 52400],
            ['reformed_eitc',   0, 4407,  4407,  0],          

            //['x_point',        20000],
            //['current_point',  3526],
            //['reformed_point', 4407],
            
        ],
        names: {
            current_eitc:  '2019 Earned Income Tax Credit',
            reformed_eitc: 'WFTRA Earned Income Tax Credit',
        },
        colors: {
            current_eitc  : '#6ab6fc',
            current_point : '#6ab6fc',

            reformed_eitc  : '#f7c22f',
            reformed_point : '#f7c22f',
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
        hide: ['current_point', 'reformed_point'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000],
            },
            padding: {left: 0, right: 10},
            height: 45,
            max: 60000,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
            },
            padding: {top: 40, bottom: 0},
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
