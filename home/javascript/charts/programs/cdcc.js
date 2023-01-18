/******************************************************************************************
 * This file contains the function creating the "Head of Household" c3.js chart
 * ****************************************************************************************/

var cdccChart = c3.generate({
    bindto: '#cdcc_chart',
    size: {
        height: programsChartHeight,
    },
    data: {
        xs: {
            'credit_rate'   : 'x_credit_rate',
            'credit_amount' : 'x_credit_amount',
            
            'point_credit_rate' : 'x_point',
            'point_credit_amount' : 'x_point',
        },
        columns: [
            ['x_credit_amount', 0, 13850, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['credit_amount',   0, 0,     915,   900,   900,   870,   870,   840,   840,   810,   810,   780,   780,   750,   750,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],

            ['x_credit_rate', 0,   15000, 15001, 17000, 17001, 19000, 19001, 21000, 21001, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['credit_rate',   .35, .35,   .34,   .34,   .33,   .33,   .32,   .32,   .31,   .31,   .30,   .30,   .29,   .29,   .28,   .28,   .27,   .27,   .26,   .26,   .25,   .25,   .24,   .24,   .23,   .23,   .22,   .22,   .21,   .21,   .20,   .20],

            ['x_point',             20000],
            ['point_credit_amount', 615],
            ['point_credit_rate',   .32],
            
        ],
        axes: {
            credit_rate         : 'y',
            point_credit_rate   : 'y',
            credit_amount       : 'y2',
            point_credit_amount : 'y2',
        },
        names: {
            credit_rate:   'Credit Rate',
            credit_amount: 'Credit Amount',
        },
        types: {
            'credit_amount' : 'area',
        },
        colors: {
            credit_rate       : '#6ab6fc',
            point_credit_rate : '#6ab6fc',

            credit_amount       : '#f7c22f',
            point_credit_amount : '#f7c22f',
        },
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 65,
        right: 65,
    },
    legend: {
        position: 'bottom',
        hide: ['point_credit_rate', 'point_credit_amount'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 15000, 30000, 45000, 60000]
            },
            padding: {left: 0, right: 0},
            max: 60000,
        },
        y: {
            show: true,
            label: {text: 'Credit Rate', position: 'outer-middle'},
            tick: {
                format: d3.format('.0%'),
                values: [0, .05, .1, .15, .2, .25, .3, .35, .4]
            },
            max: .4,
            min: 0,
            padding: {top: 0, bottom: 0},
        },
        y2: {
            show: true,
            label: {text: 'Credit Amount', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 250, 500, 750, 1000]
            },
            max: 1200,
            padding: {top: 0, bottom: 0},
        },
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 20000,}],
            min: 0,
        },
    }
});

var tabletCdccChart = c3.generate({
    bindto: '#tablet_cdcc_chart',
    size: {
        height: programsChartHeight,
    },
    data: {
        xs: {
            'credit_rate'   : 'x_credit_rate',
            'credit_amount' : 'x_credit_amount',
            
            'point_credit_rate' : 'x_point',
            'point_credit_amount' : 'x_point',
        },
        columns: [
            ['x_credit_amount', 0, 13850, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['credit_amount',   0, 0,     915,   900,   900,   870,   870,   840,   840,   810,   810,   780,   780,   750,   750,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],

            ['x_credit_rate', 0,   15000, 15001, 17000, 17001, 19000, 19001, 21000, 21001, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['credit_rate',   .35, .35,   .34,   .34,   .33,   .33,   .32,   .32,   .31,   .31,   .30,   .30,   .29,   .29,   .28,   .28,   .27,   .27,   .26,   .26,   .25,   .25,   .24,   .24,   .23,   .23,   .22,   .22,   .21,   .21,   .20,   .20],

            ['x_point',             20000],
            ['point_credit_amount', 615],
            ['point_credit_rate',   .32],
            
        ],
        axes: {
            credit_rate         : 'y',
            point_credit_rate   : 'y',
            credit_amount       : 'y2',
            point_credit_amount : 'y2',
        },
        names: {
            credit_rate:   'Credit Rate',
            credit_amount: 'Credit Amount',
        },
        types: {
            'credit_amount' : 'area',
        },
        colors: {
            credit_rate       : '#6ab6fc',
            point_credit_rate : '#6ab6fc',

            credit_amount       : '#f7c22f',
            point_credit_amount : '#f7c22f',
        },
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 65,
        right: 65,
    },
    legend: {
        position: 'bottom',
        hide: ['point_credit_rate', 'point_credit_amount'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 15000, 30000, 45000, 60000],
            },
            padding: {left: 0, right: 0},
            max: 60000,
        },
        y: {
            show: true,
            label: {text: 'Credit Rate', position: 'outer-middle'},
            tick: {
                format: d3.format('.0%'),
                values: [0, .05, .1, .15, .2, .25, .3, .35, .4]
            },
            max: .4,
            min: 0,
            padding: {top: 0, bottom: 0},
        },
        y2: {
            show: true,
            label: {text: 'Credit Amount', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 250, 500, 750, 1000]
            },
            max: 1200,
            padding: {top: 0, bottom: 0},
        },
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

/********************* Animation ******************************************************************************************************************************/
// Initiate animation
cdcc_stage = 0;
var cdcc_timeout;
function cdcc_animation() {
    // Start the animation loop.
    if(cdcc_stage == 0){
        cdcc_timeout = setTimeout(cdcc_stage_1, 0);
    }
    else if(cdcc_stage == 1){
        cdcc_timeout = setTimeout(cdcc_stage_2, 0);
    }
    else if(cdcc_stage == 2){
        cdcc_timeout = setTimeout(cdcc_stage_3, 0);
    }
    else if(cdcc_stage == 3){
        cdcc_timeout = setTimeout(cdcc_stage_4, 0);
    }
}

// Cancel the pending setTimeout calls (triggered when user scrolls off of html element)
function mouse_out_cdcc(event) {
    clearTimeout(cdcc_timeout);
}

// Stage 1
function cdcc_stage_1(){
    cdccChart.xgrids([ {value: 36000}, ]);
    cdccChart.load({
        columns: [ 
            ['x_point',             36000],
            ['point_credit_amount', 720],
            ['point_credit_rate',   .24],
        ]
    });

    cdcc_stage++;
    cdcc_timeout = setTimeout(cdcc_stage_2, 1000);
}

// Stage 2
function cdcc_stage_2(){
    cdccChart.load({
        columns: [ 
            ['x_credit_amount', 0, 27700, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['credit_amount',   0, 0,     730,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],

            ['x_point',             36000],
            ['point_credit_amount', 720],
            ['point_credit_rate',   .24],
        ]
    });

    cdcc_stage++;
    cdcc_timeout = setTimeout(cdcc_stage_3, 1000);
}

// Stage 3
function cdcc_stage_3(){
    cdccChart.xgrids([ {value: 20000}, ]);
    cdccChart.load({
        columns: [ 
            ['x_point',             20000],
            ['point_credit_amount', 0],
            ['point_credit_rate',   .32],
        ]
    });

    cdcc_stage++;
    cdcc_timeout = setTimeout(cdcc_stage_4, 1000);
}

// Stage 4
function cdcc_stage_4(){
    cdccChart.load({
        columns: [ 
            ['x_credit_amount', 0, 13850, 23000, 23001, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 60000],
            ['credit_amount',   0, 0,     915,   900,   900,   870,   870,   840,   840,   810,   810,   780,   780,   750,   750,   720,   720,   690,   690,   660,   660,   630,   630,   600,   600],

            ['x_point',             20000],
            ['point_credit_amount', 615],
            ['point_credit_rate',   .32],
        ]
    });

    cdcc_stage = 0;
    cdcc_timeout = setTimeout(cdcc_stage_1, 1000);
}
