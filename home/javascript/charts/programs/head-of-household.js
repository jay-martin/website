/******************************************************************************************
 * This file contains the function creating the "Head of Household" c3.js chart
 * ****************************************************************************************/

var HOHchart = c3.generate({
    bindto: '#head_of_household_chart',
    size: {
        height: programsChartHeight,
    },
    data: {
        xs: {
            'HOH_Savings' : 'x',
            'person1' : 'x1',
            'person2' : 'x2',
            'after_ctc' : 'x3',

            'point' : 'x_point',
        },
        columns: [
            ['x',            0, 13850, 20800, 24850, 36500, 58575, 80650,  109225, 116150, 195950, 202900, 245100, 252050, 591975, 598900, 620000],
            ['HOH_Savings',  0, 0,     695,   695,   928,   928,   3135.5, 3135.5, 3274,   3274,   3830,   3830,   4038.5, 4038.5, 4177,   4177],

            ['x_point', 50000],
            ['point',   928],
        ],
        names: {
            HOH_Savings: 'HOH Tax Savings',
            after_ctc: 'HOH Tax Savings after CTC'
        },
        colors: {
            HOH_Savings : '#f7c22f',
            after_ctc   : '#6ab6fc',
            point       : '#f7c22f',
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
                values: [0, 100000, 200000, 300000, 400000, 500000, 600000]
            },
            padding: {left: 0, right: 0},
            max: 620000,
        },
        y: {
            label: {text: 'Tax Savings', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500,]
            },
            max: 4500,
            padding: {bottom: 0, top: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 50000,}],
            min: 0,
        },
        y: {
        }
    }
});

var tabletHOHchart = c3.generate({
    bindto: '#tablet_head_of_household_chart',
    size: {
        height: programsChartHeight,
    },
    data: {
        xs: {
            'HOH_Savings' : 'x',
            'person1' : 'x1',
            'person2' : 'x2',
            'after_ctc' : 'x3',

            'point' : 'x_point',
        },
        columns: [
            ['x',            0, 13850, 20800, 24850, 36500, 58575, 80650,  109225, 116150, 195950, 202900, 245100, 252050, 591975, 598900, 620000],
            ['HOH_Savings',  0, 0,     695,   695,   928,   928,   3135.5, 3135.5, 3274,   3274,   3830,   3830,   4038.5, 4038.5, 4177,   4177],

            ['x_point', 50000],
            ['point',   928],
        ],
        names: {
            HOH_Savings: 'HOH Tax Savings',
            after_ctc: 'HOH Tax Savings after CTC'
        },
        colors: {
            HOH_Savings : '#f7c22f',
            after_ctc   : '#6ab6fc',
            point       : '#f7c22f',
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
                values: [0, 100000, 200000, 300000, 400000, 500000, 600000]
            },
            padding: {left: 0, right: 0},
            max: 620000,
        },
        y: {
            label: {text: 'Tax Savings', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500,]
            },
            max: 4500,
            padding: {bottom: 0, top: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 50000,}],
            min: 0,
        },
        y: {
        }
    }
});

/********************** Animation ********************************************************************************/
// Initiate animation
hoh_stage = 0;
var hoh_timeout;
function hoh_animation() {
    // Start the animation loop.
    if(hoh_stage == 0){
        hoh_timeout = setTimeout(hoh_stage_1, 0);
    }
    else if(hoh_stage == 1){
        hoh_timeout = setTimeout(hoh_stage_2, 0);
    }
    else if(hoh_stage == 2){
        hoh_timeout = setTimeout(hoh_stage_3, 0);
    }
}

// Cancel the pending setTimeout calls (triggered when user scrolls off of html element)
function mouse_out_hoh(event) {
    clearTimeout(hoh_timeout);
}

//Stage 1
function hoh_stage_1(){
    savings = tax_liability_2023('single', 150000) - tax_liability_2023('hoh', 150000);
    HOHchart.xgrids([{value: 150000}]);
    HOHchart.load({
        columns: [
            ['x_point', 150000],
            ['point',   savings],
        ]
    });

    hoh_stage++;
    hoh_timeout = setTimeout(hoh_stage_2, 1000);
}

//Stage 2
function hoh_stage_2(){
    savings = tax_liability_2023('single', 500000) - tax_liability_2023('hoh', 500000);
    HOHchart.xgrids([{value: 500000}]);
    HOHchart.load({
        columns: [
            ['x_point', 500000],
            ['point',   savings],
        ]
    });

    hoh_stage++;
    hoh_timeout = setTimeout(hoh_stage_3, 1000);
}

//Stage 3
function hoh_stage_3(){
    savings = tax_liability_2023('single', 50000) - tax_liability_2023('hoh', 50000);
    HOHchart.xgrids([{value: 50000}]);
    HOHchart.load({
        columns: [
            ['x_point', 50000],
            ['point',   savings],
        ]
    });

    hoh_stage = 0;
    hoh_timeout = setTimeout(hoh_stage_1, 1000);
}
