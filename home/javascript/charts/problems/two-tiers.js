/******************************************************************************************
 * This file contains the function creating the "Exclusion of Poor Families" c3.js chart 
 * And the functions controlling the animation of that chart
 * ****************************************************************************************/
var twoTiersChart = c3.generate({
    bindto: '#poor_families_chart',
    size: {
        height: 280,
    },
    data: {
        xs: {
            total : 'x',
            no_exclusion: 'x',
            total_hidden: 'x',
            ctc   : 'x',
            eitc  : 'x',
            hoh   : 'x',

            no_exclusion_end : 'x2',

            loss_in_benefits: 'x',

            existing_point: 'x_point',
            no_exclusion_point: 'x_point',
        },
        columns: [
            ['x', 0, 2500, 10979, 11833, 25900, 26262, 31900, 49622, 400000, 440000],
            ['total_hidden', 0, 850.0000000000001, 5004.85, 5132.95, 5133, 5169.2, 4841.9800000000005, 2000, 2000, 0],
            ['total', 0, 850.0000000000001, 5004.85, 5132.95, 5133, 5169.2, 4841.9800000000005, 2000, 2000, 0],
            ['no_exclusion', 5733, 4883, 728.1499999999996, 600.0500000000002, 600, 563.8000000000002, 0],

            ['x2', 31900, 49622, 400000, 440000],
            ['no_exclusion_end', 4841.9800000000005, 2000, 2000, 0],

            ['x_point', 10000],
            ['existing_point', 4525],
            ['no_exclusion_point', 5733],
        ],
        types: {
            total: 'line',
            total_hidden: 'area',
            no_exclusion: 'area',
            loss_in_benefits: 'line',
        },
        names: {
            total: 'Existing Benefits',
            no_exclusion: 'Benefit Without Exclusion of Poor Families',
            loss_in_benefits: 'Loss in Benefits',
        },
        colors: {
            total: white_or_black,
            total_hidden: 'white',

            no_exclusion: 'red',
            no_exclusion_end: 'red',

            loss_in_benefits: 'red',

            existing_point: white_or_black,
            no_exclusion_point: 'red',

        },
        regions: {
            no_exclusion_end: [ {'style': 'dashed'} ],
        },
        groups: [
            ['total_hidden', 'no_exclusion'],
        ],
        order: 'none',
    },
    transition: {
        duration: 400,
    },
    size: {
      height: 280,
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 65,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: ['total_hidden', 'no_exclusion_end', 'existing_point', 'no_exclusion_point'],
        item: { onhover: function () {} },
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000]
            },
            padding: {left: 0, right: 25},
            max: 50000,
        },
        y: {
            label: {text: 'Benefit', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000]
            },
            max: 7000,
            padding: {top: 0, bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 10000, text: 'Your income'}],
            min: 0,
        },
        y: {
            lines: [{value: 0, text: ''},],
        }
    }
});

// Initiate the animation (triggered when user scrolls onto html element)
pfStage = 0;
var timeout;
function poor_families_animation() {
    // Start the animation loop.
    if(pfStage == 0){
        timeout = setTimeout(pf1, 0);
    }
    else if(pfStage == 1){
        timeout = setTimeout(pf2, 0);
    }
    else if(pfStage == 2){
        timeout = setTimeout(pf3, 0);
    }
    else if(pfStage == 3){
        timeout = setTimeout(pf4, 0);
    }
    else if(pfStage == 4){
        timeout = setTimeout(pf5, 0);
    }
    else if(pfStage == 5){
        timeout = setTimeout(pf6, 0);
    }
    else if(pfStage == 6){
        timeout = setTimeout(pf_reset, 0);
    }
}

// Cancel the pending setTimeout calls (triggered when user scrolls off of html element)
function mouse_out_poor_families(event) {
    clearTimeout(timeout);
}
/*****************************
 * The below functions run the animation in a step-by-step process so that the animation stops when the users scroll off the element
 * ***************************/
function pf1(){
    twoTiersChart.xgrids([ {value: 5000, text:'Your income'}, ]);
    twoTiersChart.load({columns: [ ['x_point', 5000], ['existing_point', 2075], ['no_exclusion_point', 5733] ]});

    pfStage++;
    timeout = setTimeout(pf2, 1000);
}

function pf2(){
    twoTiersChart.axis.max({y: 11000});

    x = ['x', 0, 2500, 15290, 21167, 25900, 26262, 37900, 55529, 400000, 480000];
    existing = ['total', 0, 1000, 8082.5, 8964.05, 8964, 9000.2, 7712.659999999999, 4000, 4000, 0];
    existingHidden = ['total_hidden', 0, 1000, 8082.5, 8964.05, 8964, 9000.2, 7712.659999999999, 4000, 4000, 0];
    noExclude = ['no_exclusion', 10164, 9164, 2081.5, 1199.9500000000007, 1200, 1163.7999999999993, 0.377200000000812];
    
    x2 = ['x2', 37900, 55529, 400000, 480000];
    noExcludeEnd = ['no_exclusion_end', 7712.659999999999, 4000, 4000, 0];

    xPoint = ['x_point', 5000];
    existingPoint = ['existing_point', 2375];
    noExcludePoint = ['no_exclusion_point', 10164]

    twoTiersChart.load({columns: [x, existing, existingHidden, noExclude, x2, noExcludeEnd, xPoint, existingPoint, noExcludePoint]});

    pfStage++;
    timeout = setTimeout(pf3, 1000); 
}

function pf3(){
    twoTiersChart.axis.max({y: 7000});

    x = ['x', 0, 15290, 26262, 55529];
    existing = ['total', 0, 6164, 6164, 0];
    existingHidden = ['total_hidden', 0, 6164, 6164, 0];
    noExclude = ['no_exclusion', 6164, 0];
    
    x2 = ['x2', 15290, 26262, 26262, 55529];
    noExcludeEnd = ['no_exclusion_end', 6164, 6164, 6164, 0];

    xPoint = ['x_point', 5000];
    existingPoint = ['existing_point', 2000];
    noExcludePoint = ['no_exclusion_point', 6164];

    twoTiersChart.load({columns: [x, existing, existingHidden, noExclude, x2, noExcludeEnd, xPoint, existingPoint, noExcludePoint]});

    pfStage++;
    timeout = setTimeout(pf4, 1000); 
}

function pf4(){
    x = ['x', 0, 10979, 26262, 49622];
    existing = ['total', '0.00', '3733.00', '3733.00', '0.00'];
    existingHidden = ['total_hidden', '0.00', '3733.00', '3733.00', '0.00'];
    noExclude = ['no_exclusion', 3733, 0];
    
    x2 = ['x2', 10979, 26262, 26262, 49622];
    noExcludeEnd = ['no_exclusion_end', '3733.00', '3733.00', '3733.00', '0.00'];

    xPoint = ['x_point', 5000];
    existingPoint = ['existing_point', 1700];
    noExcludePoint = ['no_exclusion_point', 3733];

    twoTiersChart.load({columns: [x, existing, existingHidden, noExclude, x2, noExcludeEnd, xPoint, existingPoint, noExcludePoint]});

    pfStage++;
    timeout = setTimeout(pf5, 1000); 
}

function pf5(){
    x = ['x', 0, 2500, 21167, 25900, 37900, 400000, 480000];
    existing = ['total', '0.00', '0.00', '2800.05', '2800.00', '4000.00', '4000.00', '0.00'];
    existingHidden = ['total_hidden', '0.00', '0.00', '2800.05', '2800.00', '4000.00', '4000.00', '0.00'];
    noExclude = ['no_exclusion', 4000, 4000, 1199.9499999999998, 1200, 0];
    
    x2 = ['x2', 37900, 400000, 400000, 480000];
    noExcludeEnd = ['no_exclusion_end', '4000.00', '4000.00', '4000.00', '0.00'];

    xPoint = ['x_point', 5000];
    existingPoint = ['existing_point', 375];
    noExcludePoint = ['no_exclusion_point', 4000];

    twoTiersChart.load({columns: [x, existing, existingHidden, noExclude, x2, noExcludeEnd, xPoint, existingPoint, noExcludePoint]});

    pfStage++;
    timeout = setTimeout(pf6, 1000); 
}

function pf6(){
    twoTiersChart.xgrids([ {value: 20000, text:'Your income'}, ]);
    twoTiersChart.load({columns: [ ['x_point', 20000], ['existing_point', 2625], ['no_exclusion_point', 4000] ]});

    pfStage++;
    timeout = setTimeout(pf_reset, 1000);
}


function pf_reset(){
    x = ['x', 0, 2500, 10979, 11833, 25900, 26262, 31900, 49622, 400000, 440000];
    existingHidden = ['total_hidden', 0, 850.0000000000001, 5004.85, 5132.95, 5133, 5169.2, 4841.9800000000005, 2000, 2000, 0];
    existing = ['total', 0, 850.0000000000001, 5004.85, 5132.95, 5133, 5169.2, 4841.9800000000005, 2000, 2000, 0];
    noExclude = ['no_exclusion', 5733, 4883, 728.1499999999996, 600.0500000000002, 600, 563.8000000000002, 0];

    x2 = ['x2', 31900, 49622, 400000, 440000];
    noExcludeEnd = ['no_exclusion_end', 4841.9800000000005, 2000, 2000, 0];

    xPoint = ['x_point', 10000];
    existingPoint = ['existing_point', 4525];
    noExcludePoint = ['no_exclusion_point', 5733];

    twoTiersChart.load({columns: [x, existing, existingHidden, noExclude, x2, noExcludeEnd, xPoint, existingPoint, noExcludePoint]});
    twoTiersChart.xgrids([ {value: 10000, text:'Your income'}, ]);

    twoTiersChart.axis.max({y: 7000});

    pfStage = 0;
    timeout = setTimeout(pf1, 1000); //Loop back to beginning
}

