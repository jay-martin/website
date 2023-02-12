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
            'ctc'   : 'x',
            'point' : 'x_point',
        },
        columns: [
            ['x',    0, 2500, 13167, 27700, 31700, 400000, 440000],
            ['ctc',  0, 0,    1600,  1600,  2000,  2000,   0 ],

            ['x_point', 20000],
            ['point',   1600],
            
        ],
        names: {
            ctc: 'Child Tax Credit',
        },
        colors: {
            ctc   : '#6ab6fc',
            point : '#6ab6fc',
        },
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 60,
        right: 35,
    },
    legend: {
        position: 'bottom',
        hide: ['point'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: top_xTick,
            },
            padding: {left: 0, right: 10},
            height: 45,
        },
        y: {
            label: {text: 'CTC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500]
            },
            padding: {top: 61, bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 20000, text: 'Your income'}],
            min: 0,
        },
    }
});
