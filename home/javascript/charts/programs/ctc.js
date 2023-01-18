/******************************************************************************************
 * This file contains the function creating the "Head of Household" c3.js chart
 * ****************************************************************************************/

var ctcChart = c3.generate({
    bindto: '#ctc_chart',
    size: {
        height: programsChartHeight,
    },
    data: {
        xs: {
            'ctc'   : 'x',
            'point' : 'x_point',
        },
        columns: [
            ['x',   0, 2500, 13167, 20800, 24800, 200000, 240000],
            ['ctc', 0, 0,    1600,  1600,  2000,  2000,   0],

            ['x_point', 18000],
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
        left: 65,
        right: 20,
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
                values: [0, 50000, 100000, 150000, 200000, 250000, 300000]
            },
            padding: {left: 0, right: 0},
        },
        y: {
            label: {text: 'CTC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000,]
            },
            padding: {bottom: 0, top: 10},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 18000}],
            min: 0,
        },
    }
});

var tabletCTCChart = c3.generate({
    bindto: '#tablet_ctc_chart',
    size: {
        height: programsChartHeight,
    },
    data: {
        xs: {
            'ctc'   : 'x',
            'point' : 'x_point',
        },
        columns: [
            ['x',   0, 2500, 13167, 20800, 24800, 200000, 240000],
            ['ctc', 0, 0,    1600,  1600,  2000,  2000,   0],

            ['x_point', 18000],
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
        left: 65,
        right: 20,
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
                values: [0, 50000, 100000, 150000, 200000, 250000, 300000]
            },
            padding: {left: 0, right: 0},
        },
        y: {
            label: {text: 'CTC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000,]
            },
            padding: {top: 85, bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 18000}],
            min: 0,
        },
    }
});

/********************** Animation ********************************************************************************/
/* Moves the income slider */
function ctc_modify_income(income, filingStatus, numChildren){
    ctcChart.xgrids([{value: income,}]);
    ctcChart.load({
        columns: [
            ['x_point', income],
            ['point',   ctc_value_2023(income, filingStatus, numChildren)],
        ]
    });
}

// Initiate animation
ctc_stage = 0;
var ctc_timeout;
function ctc_animation() {
    // Start the animation loop.
    if(ctc_stage == 0){
        ctc_timeout = setTimeout(ctc_stage_1, 0);
    }
    else if(ctc_stage == 1){
        ctc_timeout = setTimeout(ctc_stage_2, 0);
    }
    else if(ctc_stage == 2){
        ctc_timeout = setTimeout(ctc_stage_3, 0);
    }
    else if(ctc_stage == 3){
        ctc_timeout = setTimeout(ctc_stage_4, 0);
    }
}

// Cancel the pending setTimeout calls (triggered when user scrolls off of html element)
function mouse_out_ctc(event) {
    clearTimeout(ctc_timeout);
}

//Stage 1
function ctc_stage_1(){
    single_ctc_builder_2023(ctcChart, 'x', 'ctc', 'two');
    ctc_modify_income(100000, 'single', 'two');

    ctc_stage++;
    ctc_timeout = setTimeout(ctc_stage_2, 1000);
}

//Stage 2
function ctc_stage_2(){
    hoh_ctc_builder_2023(ctcChart, 'x', 'ctc', 'three');
    ctc_modify_income(100000, 'hoh', 'three');

    ctc_stage++;
    ctc_timeout = setTimeout(ctc_stage_3, 1000);
}

//Stage 3
function ctc_stage_3(){
    single_ctc_builder_2023(ctcChart, 'x', 'ctc', 'one');
    ctc_modify_income(100000, 'single', 'one');

    ctc_stage++;
    ctc_timeout = setTimeout(ctc_stage_4, 1000);
}

//Stage 4
function ctc_stage_4(){
    hoh_ctc_builder_2023(ctcChart, 'x', 'ctc', 'one');
    ctc_modify_income(18000, 'hoh', 'one');

    ctc_stage = 0;
    ctc_timeout = setTimeout(ctc_stage_1, 1000);
}
