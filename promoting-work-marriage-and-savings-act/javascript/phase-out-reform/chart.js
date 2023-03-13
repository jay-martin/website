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

var phase_out_reform = c3.generate({
    bindto: '#phase_out_reform',
    data: {
        xs: {
            'ssi'   : 'x_ssi',
            'snap'  : 'x_snap',
            'eitc'  : 'x_eitc',
        },
        columns: [
            ['x_snap', 0,     35000],
            ['snap',   7000,  0],   

            ['x_eitc', 0,  12000, 35000, 55000],
            ['eitc',   0,  4000,  4000,  0],      
        ],
        names: {
            ssi:  'SSI',
            snap: 'SNAP',
            eitc: 'EITC',
        },
        colors: {
            //ssi  : '#6ab6fc',
            snap : '#f7c22f',
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
            label: {text: 'Benefit Value', position: 'outer-middle'},
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
