/******************************************************************************************
 * This file contains the function creating the "Marriage Penalties" c3.js chart 
 * And the functions controlling the animation of that chart
 * ****************************************************************************************/
var MPchart = c3.generate({
    bindto: '#marriage_penalties_chart',
    size: {
        height: 280,
    },
    data: {
        xs: {
            'person1' : 'x1',
            'person2' : 'x2',
            'married' : 'x3',

            'married_eitc'  : 'x_horizontal',
            'penalty'       : 'x_horizontal',

            'combined_eitc' : 'x_horizontal',
            'bonus'         : 'x_horizontal',

            'hoh_combined'  : 'x_horizontal',
            'hoh_penalty'   : 'x_horizontal',

            'point1' : 'x_point1',
            'point2' : 'x_point2',
            'point_married' : 'x_point_married'
        },
        columns: [
            ['x3',       0, 10979, 26262, 49622],
            ['married',  0, 3733,  3733,  0],
            ['x1',       0, 10979, 20131, 43493],
            ['person1',  0, 3733,  3733,  0],
            ['x2',       0, 7320, 9160, 16480],
            ['person2',  0, 560,  560,  0],

            ['x_horizontal',  0,    60000],
            ['married_eitc',  1548, 1548],
            ['penalty',       1104, 1104],

            ['combined_eitc',],
            ['bonus',],

            ['x_point1', 30000],
            ['point1',   2156],
            ['x_point2', 10000],
            ['point2',   496],
            ['x_point_married', 40000],
            ['point_married',   1548],
        ],
        types: {
            'married_eitc'  : 'area',
            'penalty'       : 'area',
            'combined_eitc' : 'area',
            'bonus'         : 'area',
            'hoh_combined'  : 'area',
            'hoh_penalty'   : 'area',
        },
        groups: [['married_eitc', 'penalty'], ['combined_eitc', 'bonus'], ['hoh_combined', 'hoh_penalty']],
        order: false,
        names: {
            person1: 'Your EITC',
            person2: "Your partner's EITC",
            married: 'EITC if you get married',
        },
        colors: {
            person1: '#6ab6fc',
            point1:  '#6ab6fc',

            person2: purple_shade,
            point2:  purple_shade,

            married:       white_or_black,
            point_married: white_or_black,

            married_eitc:  '#eb3734',
            combined_eitc: '#eb3734',
            penalty:       '#eb3734',
            bonus:          green_shade,

            hoh_combined: '#eb3734',
            hoh_penalty:  '#eb3734',
        },
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 70,
        right: 22,
    },
    legend: {
        position: 'bottom',
        hide: ['married_eitc', 'penalty', 'combined_eitc', 'bonus', 'point1', 'point2', 'point_married', 'hoh_combined', 'hoh_penalty'],
    },
    tooltip: {
        show: false
    },
    transition: {
        duration: 400,
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]
            },
            padding: {left: 0, right: 0},
            max: 60000,
        },
        y: {
            label: {text: 'EITC Value', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000]
            },
            padding: {bottom: 0, top: 0},
            max: 4000,
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 30000, text: 'Your income'}, {value: 10000, text: "Your partner's income"}, {value: 40000, text: 'Combined income'}]
        },
        y: {
            lines: [{value: 0}, {value: 1548, text: "Your married EITC"}, {value: 2652, text: "Combined individual EITC's"},]
        }
    },
});

// Initiate the animation (triggered when user scrolls onto html element)
mpStage = 0;
var timeout;
function marriage_penalties_animation() {
    // Start the animation loop.
    if(mpStage == 0){
        timeout = setTimeout(mp1, 0);
    }
    else if(mpStage == 1){
        timeout = setTimeout(mp2, 0);
    }
    else if(mpStage == 2){
        timeout = setTimeout(mp3, 0);
    }
    else if(mpStage == 3){
        timeout = setTimeout(mp4, 0);
    }
    else if(mpStage == 4){
        timeout = setTimeout(mp5, 0);
    }
    else if(mpStage == 5){
        timeout = setTimeout(mp6, 0);
    }
    else if(mpStage == 6){
        timeout = setTimeout(mp7, 0);
    }
    else if(mpStage == 7){
        timeout = setTimeout(mp1, 0);
    }
    /*
    else if(mpStage == 8){
        timeout = setTimeout(mp9, 0);
    }
    else if(mpStage == 9){
        timeout = setTimeout(mp10, 0);
    }
    else if(mpStage == 10){
        timeout = setTimeout(mp11, 0);
    }
    else if(mpStage == 11){
        timeout = setTimeout(mp12, 0);
    }
    else if(mpStage == 12){
        timeout = setTimeout(mp13, 0);
    }
    */
}

// Cancel the pending setTimeout calls (triggered when user scrolls off of html element)
function mouse_out_marriage_penalties() {
    clearTimeout(timeout);
}
/*****************************
 * The below functions run the animation in a step-by-step process so that the animation stops when the users scroll off the element
 * ***************************/

function mp1(){
    /* Move xgrids */
    MPchart.xgrids([{value: 30000, text:'Your income'},{value: 17000, text:"Your partner's income"},{value: 47000, text:"Combined income"}]);
    MPchart.ygrids([{value: 0}, {value: 429, text: "Your married EITC"}, {value: 2156, text: "Combined individual EITC's"}]);
    /* Load new columns */
    MPchart.load({
        columns: [
            ['x_point1', 30000],
            ['point1', 2156],
            ['x_point2', 17000], 
            ['point2', 0],
            ['x_point_married', 47000],
            ['point_married', 429],
            ['married_eitc',  429,  429],
            ['penalty',       1727, 1727],
        ]
    });

    mpStage++;
    timeout = setTimeout(mp2, 1000);
}

function mp2(){
    /* Move xgrids */
    MPchart.xgrids([{value: 13000, text:'Your income'},{value: 17000, text:"Your partner's income"},{value: 30000, text:"Combined income"}]);
    MPchart.ygrids([{value: 0}, {value: 3146, text: "Your married EITC"}, {value: 3733, text: "Combined individual EITC's"}]);
    /* Load new columns */
    MPchart.load({
        columns: [
            ['x_point1', 13000],
            ['point1', 3733],
            ['x_point2', 17000],
            ['point2', 0],
            ['x_point_married', 30000],
            ['point_married', 3146],
            ['married_eitc',  3146, 3146],
            ['penalty',       587,  587],
        ]
    });

    mpStage++;
    timeout = setTimeout(mp3, 1000);
}

function mp3(){
    MPchart.axis.max({y: 11000});
    mpStage++;
    timeout = setTimeout(mp4, 1000);
}

function mp4(){
    /* Move xgrids */
    MPchart.ygrids([{value: 0}, {value: 6147, text: "Your married EITC"}, {value: 9897, text: "Combined individual EITC's"}]);
    /* Load new columns */
    MPchart.load({
        columns: [
            ['x2',      0, 15290, 20131, 49399],
            ['person2', 0, 6164,  6164,  0],
            ['x3',      0, 15410, 26262, 59187, 60000],
            ['married', 0, 6935,  6935,  0,     0],
            ['x_point2', 17000],
            ['point2', 6164],
            ['x_point_married', 30000],
            ['point_married', 6147],
            ['married_eitc',  6147, 6147],
            ['penalty',       3750, 3750],
        ]
    });

    mpStage++;
    timeout = setTimeout(mp5, 1000);
}

function mp5(){
    /* Move xgrids */
    MPchart.xgrids([{value: 19000, text:'Your income'},{value: 35000, text:"Your partner's income"},{value: 54000, text:"Combined income"}]);
    MPchart.ygrids([{value: 0}, {value: 1092, text: "Your married EITC"}, {value: 6765, text: "Combined individual EITC's"}]);
    /* Load new columns */
    MPchart.load({
        columns: [
            ['x_point1', 19000],
            ['point1',   3733],
            ['x_point2', 35000],
            ['point2',   3032],
            ['x_point_married', 54000],
            ['point_married',   1092],
            ['married_eitc',    1092, 1092],
            ['penalty',         5673, 5673],
        ]
    });

    mpStage++;
    timeout = setTimeout(mp6, 1000);
}

function mp6(){
    /* Move xgrids */
    MPchart.xgrids([{value: 30000, text: 'Your income'}, {value: 10000, text: "Your partner's income"}, {value: 40000, text: 'Combined income'}]);
    MPchart.ygrids([{value: 0}, {value: 1548, text: "Your married EITC"}, {value: 2652, text: "Combined individual EITC's"},]);
    /* Load new columns */
    MPchart.load({
        columns: [
            ['x3',       0, 10979, 26262, 49622],
            ['married',  0, 3733,  3733,  0],

            ['x1',       0, 10979, 20131, 43493],
            ['person1',  0, 3733,  3733,  0],
            
            ['x2',       0, 7320, 9160, 16480],
            ['person2',  0, 560,  560,  0],

            ['x_point_married', 40000],
            ['point_married',   1548],
            ['x_point1', 30000],
            ['point1',   2156],
            ['x_point2', 10000],
            ['point2',   496],

            ['married_eitc',  1548, 1548],
            ['penalty',       1104, 1104],
        ]
    });

    mpStage++;
    timeout = setTimeout(mp7, 1000);
}

function mp7(){
    MPchart.axis.max({y: 4000});
    mpStage = 0;
    timeout = setTimeout(mp1, 1000);
}

/* 
function mp6(){
    MPchart.unload({ ids: ['married_eitc', 'penalty', 'combined_eitc', 'bonus', 'point1', 'point2', 'point_married'] });
    MPchart.ygrids([]);
    MPchart.axis.labels({ y: 'Tax Liability'});

    mpStage++;
    timeout = setTimeout(mp7, 1000);
}

function mp7(){
    MPchart.axis.max({y: 8000});
    mpStage++;
    timeout = setTimeout(mp8, 1000);
}

function mp8(){
    MPchart.load({
        columns: [
            ['x1',      0, 19400, 34050, 75300, 108450, 189450],
            ['person1', 0, 0,     1465,  6415,  13708,  33148],
            ['x2',      0, 12950, 23225,  54725,  102025,  183000],
            ['person2', 0, 0,     1027.5, 4807.5, 15213.5, 37755.5],
            ['x3',      0, 25900, 46400, 109450, 204050],
            ['married', 0, 0,     2050,  9616,   30428],
            ['x_point1', 19000],
            ['point1',   0],
            ['x_point2', 35000],
            ['point2',   2441],
            ['x_point_married', 54000],
            ['point_married',   2962],
        ]
    });
    MPchart.data.names({
        person1: 'Your tax liability',
        person2: "Your partner's tax liability",
        married: "Married tax liability",
    });

    mpStage++;
    timeout = setTimeout(mp9, 1000);
}

function mp9(){
    MPchart.ygrids([{value: 0}, {value: 2441, text: "Combined Individual Tax"}, {value: 2963, text: "Married Tax"}]);
    MPchart.load({
        columns: [
            ['x_horizontal', 0,    60000],
            ['hoh_combined', 2441, 2441],
            ['hoh_penalty',  522,  522],
        ]
    });
    mpStage++;
    timeout = setTimeout(mp10, 1000);
}

function mp10(){
    MPchart.xgrids([{value: 30000, text:'Your income'},{value: 10000, text:"Your partner's income"},{value: 40000, text:"Combined income"}]);
    MPchart.ygrids([{value: 0}, {value: 1060, text: "Combined Individual Tax"}, {value: 1410, text: "Married Tax"}]);
    MPchart.load({
        columns: [
            ['hoh_combined', 1060, 1060],
            ['hoh_penalty',  350,  350],
            ['x_point1', 30000],
            ['point1',   1060],
            ['x_point2', 10000],
            ['point2',   0],
            ['x_point_married', 40000],
            ['point_married',   1410],
        ]
    });
    
    mpStage++;
    timeout = setTimeout(mp11, 1000);
}

function mp11(){
    MPchart.unload({ ids: ['hoh_married', 'hoh_penalty', 'hoh_combined', 'hoh_bonus', 'point1', 'point2', 'point_married', 'person2_dashed'] });
    MPchart.ygrids([]);
    MPchart.axis.labels({ y: 'EITC Value'});
    MPchart.axis.max({y: 4000});

    mpStage++;
    timeout = setTimeout(mp12, 1000);
}

function mp12(){
    MPchart.load({
        columns: [
            ['x1',      0, 10979, 20131, 43493],
            ['person1', 0, 3733,  3733,  0],
            ['x2',      0, 7320, 9160, 16480],
            ['person2', 0, 560,  560,  0],
            ['x3',      0, 10979, 26262, 49622, 60000],
            ['married', 0, 3733,  3733,  0,     0],
            ['x_point1', 30000],
            ['point1',   2156],
            ['x_point2', 10000],
            ['point2',   496],
            ['x_point_married', 40000],
            ['point_married',   1548],
        ]
    });
    MPchart.data.names({
        person1: 'Your EITC',
        person2: "Your Partner's EITC",
        married: "EITC if you get married",
    });

    mpStage++;
    timeout = setTimeout(mp13, 1000);
}

function mp13(){
    MPchart.ygrids([{value: 0}, {value: 1548, text: "Your married EITC"}, {value: 2652, text: "Combined individual EITC's"}]);
    MPchart.load({
        columns: [
            ['x_horizontal',  0,    60000],
            ['married_eitc',  1548, 1548],
            ['penalty',       1104, 1104],
        ]
    });
    mpStage = 0;
    timeout = setTimeout(mp1, 1000);
}
*/
