/* FSA 1.0: Adjusts graph according to user input */
function all_modify_ca_chart_fsa1(filingStatus, numYoung, numOld){
    /*
    master_chart_all.internal.config.axis_x_max = undefined;
    master_chart_all.axis.max({
        x: undefined
    });
    */
    /*************************************************************** Joint ************************************************************** */
    if (filingStatus==="married"){
        /* NO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===0 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 550000],
                    ['FSA_CA',   0, 0],
                    ['CTC',      0, 0],
                    ['dif',      0, 0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung===0 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 11833, 25900, 31900, 400000, 440000, 460000, 550000],
                    ['FSA_CA',   3000, 3000,  3000,  3000,  3000,  3000,  3000,   1000,   0,      0],
                    ['CTC',      0,    0,     1125,  1400,  1400,  2000,  2000,   0,      0,      0],
                    ['dif',      3000, 3000,   1875,  1600,  1600,  1000,  1000,  1000,   0,      0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung ===0 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 21167, 25900, 37900, 400000, 480000, 520000, 550000],
                    ['FSA_CA',   6000, 6000,  6000,  6000,  6000,  6000,  6000,   2000,   0,      0],
                    ['CTC',      0,    0,     1125,  2800,  2800,  4000,  4000,   0,      0,      0],
                    ['dif',      6000, 6000,  4875,  3200,  3200,  2000,  2000,   2000,   0,      0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        /* ONE YOUNG CHILD, VARY OLD CHILDREN */
        if(numYoung===1 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 11833, 25900, 31900, 400000, 440000, 484000, 550000],
                    ['FSA_CA',   4200, 4200,  4200,  4200,  4200,  4200,  4200,   2200,   0,      0],
                    ['CTC',      0,    0,     1125,  1400,  1400,  2000,  2000,   0,      0,      0],
                    ['dif',      4200, 4200,  3075,  2800,  2800,  2200,  2200,   2200,   0,      0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung===1 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 21167, 25900, 37900, 400000, 480000, 544000, 550000],
                    ['FSA_CA',   7200, 7200,  7200,  7200,  7200,  7200,  7200,   3200,   0,      0],
                    ['CTC',      0,    0,     1125,  2800,  2800,  4000,  4000,   0,      0,      0],
                    ['dif',      7200, 7200,  6075,  4400,  4400,  3200,  3200,   3200,   0,      0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung ===1 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,     2500,   10000, 25900, 30500, 43900, 400000, 520000, 604000],
                    ['FSA_CA',   10200, 10200,  10200, 10200, 10200, 10200, 10200,  4200,   0],
                    ['CTC',      0,     0,      1125,  3510,  4660,  6000,  6000,   0,      0],
                    ['dif',      10200, 10200,  9075,  6690,  5540,  4200,  4200,   4200,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        /* TWO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===2 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 21167, 25900, 37900, 400000, 480000, 568000],
                    ['FSA_CA',   8400, 8400,  8400,  8400,  8400,  8400,  8400,   4400,   0],
                    ['CTC',      0,    0,     1125,  2800,  2800,  4000,  4000,   0,      0],
                    ['dif',      8400, 8400,  7275,  5600,  5600,  4400,  4400,   4400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung===2 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,     2500,   10000, 25900, 30500, 43900, 400000, 520000, 628000],
                    ['FSA_CA',   11400, 11400,  11400, 11400, 11400, 11400, 11400,  5400,   0],
                    ['CTC',      0,     0,      1125,  3510,  4660,  6000,  6000,   0,      0],
                    ['dif',      11400, 11400,  10275, 7890,  6750,  5400,  5400,   5400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung ===2 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,     2500,   10000, 25900, 39833, 46450, 49325, 400000, 560000, 688000],
                    ['FSA_CA',   14400, 14400,  14400, 14400, 14400, 14400, 14400, 14400,  6400,   0],
                    ['CTC',      0,     0,      1125,  3510,  6993,  7655,  8000,  8000,   0,      0],
                    ['dif',      14400, 14400,  13275, 10890, 7407,  6745,  6400,  6400,   6400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
    }
    /*************************************************************** HOH ***************************************************************** */ 
    if (filingStatus==="hoh"){
        /* NO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===0 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 550000],
                    ['FSA_CA',   0, 0],
                    ['CTC',      0, 0],
                    ['dif',      0, 0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung===0 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,   10000, 11833, 19400, 25400, 200000, 240000, 260000],
                    ['FSA_CA',   3000, 3000,   3000,  3000,  3000,  3000,  3000,   1000,   0],
                    ['CTC',      0,    0,      1125,  1400,  1400,  2000,  2000,   0,      0],
                    ['dif',      3000, 3000,   1875,  1600,  1600,  1000,  1000,   1000,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung ===0 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 19400, 21167, 31397, 200000, 280000, 320000],
                    ['FSA_CA',   6000, 6000,  6000,  6000,  6000,  6000,  6000,   2000,   0],
                    ['CTC',      0,    0,     1125,  2535,  2977,  4000,  4000,   0,      0],
                    ['dif',      6000, 6000,  4875,  3465,  3023,  2000,  2000,   2000,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        /* ONE YOUNG CHILD, VARY OLD CHILDREN */
        if(numYoung===1 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 11833, 19400, 25400, 200000, 240000, 284000],
                    ['FSA_CA',   4200, 4200,  4200,  4200,  4200,  4200,  4200,   2200,   0],
                    ['CTC',      0,    0,     1125,  1400,  1400,  2000,  2000,   0,      0],
                    ['dif',      4200, 4200,  3075,  2800,  2800,  2200,  2200,   2200,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung===1 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 19400, 21167, 31397, 200000, 280000, 344000],
                    ['FSA_CA',   7200, 7200,  7200,  7200,  7200,  7200,  7200,   3200,   0],
                    ['CTC',      0,    0,     1125,  2535,  2977,  4000,  4000,   0,      0],
                    ['dif',      7200, 7200,  6075,  4665,  4223,  3200,  3200,   3200,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung ===1 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,     2500,  10000, 19400, 30500, 34050, 36842, 200000, 320000, 404000],
                    ['FSA_CA',   10200, 10200, 10200, 10200, 10200, 10200, 10200, 10200,  4200,   0],
                    ['CTC',      0,     0,     1125,  2535,  5310,  5665,  6000,  6000,   0,      0],
                    ['dif',      10200, 10200, 9075,  7665,  4890,  4535,  4200,  4200,   4200,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        /* TWO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===2 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 19400, 21167, 31397, 200000, 280000, 368000],
                    ['FSA_CA',   8400, 8400,  8400,  8400,  8400,  8400,  8400,   4400,   0],
                    ['CTC',      0,    0,     1125,  2535,  2977,  4000,  4000,   0,      0],
                    ['dif',      8400, 8400,  7275,  5865,  5423,  4400,  4400,   4400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung===2 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,     2500,   10000, 19400, 30500, 34050, 36842, 200000, 320000, 428000],
                    ['FSA_CA',   11400, 11400,  11400, 11400, 11400, 11400, 11400, 11400,  5400,   0],
                    ['CTC',      0,     0,      1125,  2535,  5310,  5665,  6000,  6000,   0,      0],
                    ['dif',      11400, 11400,  10275, 8865,  6090,  5735,  5400,  5400,   5400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung ===2 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,     2500,   10000, 19400, 34050,  39833, 41841, 200000, 360000, 488000],
                    ['FSA_CA',   14400, 14400,  14400, 14400, 14400,  14400, 14400, 14400,  6400,   0],
                    ['CTC',      0,     0,      1125,  2535,  6197.5, 7759,  8000,  8000,   0,      0],
                    ['dif',      14400, 14400,  13275, 11865, 8242.4, 6641,  6400,  6400,   6400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
    }
    /*************************************************************** Single ************************************************************** */ 
    if (filingStatus==="single"){
        /* NO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===0 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 550000],
                    ['FSA_CA',   0, 0],
                    ['CTC',      0, 0],
                    ['dif',      0, 0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        if(numYoung===0 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 11833, 12950, 18950, 200000, 240000, 260000],
                    ['FSA_CA',   3000, 3000,  3000,  3000,  3000,  3000,  3000,   1000,   0],
                    ['CTC',      0,    0,     1125,  1400,  1400,  2000,  2000,   0,      0],
                    ['dif',      3000, 3000,  1875,  1600,  1600,  1000,  1000,   1000,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        if(numYoung ===0 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 12950,  21167, 23225,  24658,  200000, 280000, 320000],
                    ['FSA_CA',   6000, 6000,  6000,  6000,   6000,  6000,   6000,   6000,   2000,   0],
                    ['CTC',      0,    0,     1125,  1567.5, 3622,  3828,   4000,   4000,   0,      0],
                    ['dif',      6000, 6000,  4875,  4432.5, 2378,  2172,   2000,   2000,   2000,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        /* ONE YOUNG CHILD, VARY OLD CHILDREN */
        if(numYoung===1 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 11833, 12950, 18950, 200000, 240000, 282000],
                    ['FSA_CA',   4200, 4200,  4200,  4200,  4200,  4200,  4200,   2200,   0],
                    ['CTC',      0,    0,     1125,  1400,  1400,  2000,  2000,   0,      0],
                    ['dif',      0,    1050,  3075,  2600,  2600,  2200,  2200,   2200,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        if(numYoung===1 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 12950,  21167, 23225,  24658,  200000, 280000, 344000],
                    ['FSA_CA',   7200, 7200,  7200,  7200,   7200,  7200,   7200,   7200,   3200,   0],
                    ['CTC',      0,    0,     1125,  1567.5, 3622,  3828,   4000,   4000,   0,      0],
                    ['dif',      7200, 7200,  6075,  5632.5, 3578,  3372,   3200,   3200,   3200,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        if(numYoung ===1 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,     2500,  10000, 12950,  23225,  30129,  200000, 320000, 404000],
                    ['FSA_CA',   10200, 10200, 10200, 10200,  10200,  10200,  10200,  4200,   0],
                    ['CTC',      0,     0,     1125,  1567.5, 4136,   6000,   6000,   0,      0],
                    ['dif',      10200, 10200, 9075,  8632.5, 6064,   4200,   4200,   4200,   0] 
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        /* TWO YOUNG CHILD, VARY OLD CHILDREN */
        if(numYoung===2 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,    2500,  10000, 12950,  21167, 23225,  24658,  200000, 280000, 368000],
                    ['FSA_CA',   8400, 8400,  8400,  8400,   8400,  8400,   8400,   8400,   4400,   0],
                    ['CTC',      0,    0,     1125,  1567.5, 3622,  3828,   4000,   4000,   0,      0],
                    ['dif',      8400, 8400,  7275,  6832.5, 4778,  4572,   4400,   4400,   4400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        if(numYoung===2 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,     2500,   10000, 12950,  23225,  30129,  200000, 320000, 428000],
                    ['FSA_CA',   11400, 11400,  11400, 11400,  11400,  11400,  11400,  5400,   0],
                    ['CTC',      0,     0,      1125,  1567.5, 4136,   6000,   6000,   0,      0],
                    ['dif',      11400, 11400,  10275, 9832.5, 7264,   5400,   5400,   5400,   0] 
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        if(numYoung ===2 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0,     2500,  10000, 12950,   23225,  37536,  200000, 360000, 488000],
                    ['FSA_CA',   14400, 14400, 14400, 14400,   14400,  14400,  14400,  6400,   0],
                    ['CTC',      0,     0,     1125,  1567.5,  4136,   8000,   8000,   0,      0],
                    ['dif',      14400, 14400, 13275, 12832.5, 10264,  6400,   6400,   6400,   0] 
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
    } 
}

/* FSA 2.0: Adjusts graph according to user input */
function all_modify_ca_chart_fsa2(filingStatus, numYoung, numOld){
    /*
    master_chart_all.internal.config.axis_x_max = undefined;
    master_chart_all.axis.max({
        x: undefined
    });
    */
    /*************************************************************** Joint ************************************************************** */
    if (filingStatus==="married"){
        /* NO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===0 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 550000],
                    ['FSA_CA',   0, 0],
                    ['CTC',      0, 0],
                    ['dif',      0, 0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung===0 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 11833, 25900, 31900, 400000, 440000, 460000, 550000],
                    ['FSA_CA',   0, 750,   3000,  3000,  3000,  3000,  3000,   1000,   0,      0],
                    ['CTC',      0, 0,     1125,  1400,  1400,  2000,  2000,   0,      0,      0],
                    ['dif',      0, 750,   1875,  1600,  1600,  1000,  1000,   1000,   0,      0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung ===0 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 21167, 25900, 37900, 400000, 480000, 520000, 550000],
                    ['FSA_CA',   0, 1500,  6000,  6000,  6000,  6000,  6000,   2000,   0,      0],
                    ['CTC',      0, 0,     1125,  2800,  2800,  4000,  4000,   0,      0,      0],
                    ['dif',      0, 1500,  4875,  3200,  3200,  2000,  2000,   2000,   0,      0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        /* ONE YOUNG CHILD, VARY OLD CHILDREN */
        if(numYoung===1 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 11833, 25900, 31900, 400000, 440000, 484000, 550000],
                    ['FSA_CA',   0, 1050,  4200,  4200,  4200,  4200,  4200,   2200,   0,      0],
                    ['CTC',      0, 0,     1125,  1400,  1400,  2000,  2000,   0,      0,      0],
                    ['dif',      0, 1050,  3075,  2800,  2800,  2200,  2200,   2200,   0,      0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung===1 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 21167, 25900, 37900, 400000, 480000, 544000, 550000],
                    ['FSA_CA',   0, 1800,  7200,  7200,  7200,  7200,  7200,   3200,   0,      0],
                    ['CTC',      0, 0,     1125,  2800,  2800,  4000,  4000,   0,      0,      0],
                    ['dif',      0, 1800,  6075,  4400,  4400,  3200,  3200,   3200,   0,      0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung ===1 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 25900, 30500, 43900, 400000, 520000, 604000],
                    ['FSA_CA',   0, 2550,  10200, 10200, 10200, 10200, 10200,  4200,   0],
                    ['CTC',      0, 0,     1125,  3510,  4660,  6000,  6000,   0,      0],
                    ['dif',      0, 2550,  9075,  6690,  5540,  4200,  4200,   4200,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        /* TWO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===2 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 21167, 25900, 37900, 400000, 480000, 568000],
                    ['FSA_CA',   0, 2100,  8400,  8400,  8400,  8400,  8400,   4400,   0],
                    ['CTC',      0, 0,     1125,  2800,  2800,  4000,  4000,   0,      0],
                    ['dif',      0, 2100,  7275,  5600,  5600,  4400,  4400,   4400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung===2 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 25900, 30500, 43900, 400000, 520000, 628000],
                    ['FSA_CA',   0, 2850,  11400, 11400, 11400, 11400, 11400,  5400,   0],
                    ['CTC',      0, 0,     1125,  3510,  4660,  6000,  6000,   0,      0],
                    ['dif',      0, 2850,  10275, 7890,  6750,  5400,  5400,   5400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung ===2 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 25900, 39833, 46450, 49325, 400000, 560000, 688000],
                    ['FSA_CA',   0, 3600,  14400, 14400, 14400, 14400, 14400, 14400,  6400,   0],
                    ['CTC',      0, 0,     1125,  3510,  6993,  7655,  8000,  8000,   0,      0],
                    ['dif',      0, 3600,  13275, 10890, 7407,  6745,  6400,  6400,   6400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
    }
    /*************************************************************** HOH ***************************************************************** */ 
    if (filingStatus==="hoh"){
        /* NO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===0 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 550000],
                    ['FSA_CA',   0, 0],
                    ['CTC',      0, 0],
                    ['dif',      0, 0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung===0 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 11833, 19400, 25400, 200000, 240000, 260000],
                    ['FSA_CA',   0, 750,   3000,  3000,  3000,  3000,  3000,   1000,   0],
                    ['CTC',      0, 0,     1125,  1400,  1400,  2000,  2000,   0,      0],
                    ['dif',      0, 750,   1875,  1600,  1600,  1000,  1000,   1000,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung ===0 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 19400, 21167, 31397, 200000, 280000, 320000],
                    ['FSA_CA',   0, 1500,  6000,  6000,  6000,  6000,  6000,   2000,   0],
                    ['CTC',      0, 0,     1125,  2535,  2977,  4000,  4000,   0,      0],
                    ['dif',      0, 1500,  4875,  3465,  3023,  2000,  2000,   2000,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        /* ONE YOUNG CHILD, VARY OLD CHILDREN */
        if(numYoung===1 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 11833, 19400, 25400, 200000, 240000, 284000],
                    ['FSA_CA',   0, 1050,  4200,  4200,  4200,  4200,  4200,   2200,   0],
                    ['CTC',      0, 0,     1125,  1400,  1400,  2000,  2000,   0,      0],
                    ['dif',      0, 1050,  3075,  2800,  2800,  2200,  2200,   2200,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung===1 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 19400, 21167, 31397, 200000, 280000, 344000],
                    ['FSA_CA',   0, 1800,  7200,  7200,  7200,  7200,  7200,   3200,   0],
                    ['CTC',      0, 0,     1125,  2535,  2977,  4000,  4000,   0,      0],
                    ['dif',      0, 1800,  6075,  4665,  4223,  3200,  3200,   3200,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung ===1 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 19400, 30500, 34050, 36842, 200000, 320000, 404000],
                    ['FSA_CA',   0, 2550,  10200, 10200, 10200, 10200, 10200, 10200,  4200,   0],
                    ['CTC',      0, 0,     1125,  2535,  5310,  5665,  6000,  6000,   0,      0],
                    ['dif',      0, 2550,  9075,  7665,  4890,  4535,  4200,  4200,   4200,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        /* TWO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===2 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 19400, 21167, 31397, 200000, 280000, 368000],
                    ['FSA_CA',   0, 2100,  8400,  8400,  8400,  8400,  8400,   4400,   0],
                    ['CTC',      0, 0,     1125,  2535,  2977,  4000,  4000,   0,      0],
                    ['dif',      0, 2100,  7275,  5865,  5423,  4400,  4400,   4400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung===2 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 19400, 30500, 34050, 36842, 200000, 320000, 428000],
                    ['FSA_CA',   0, 2850,  11400, 11400, 11400, 11400, 11400, 11400,  5400,   0],
                    ['CTC',      0, 0,     1125,  2535,  5310,  5665,  6000,  6000,   0,      0],
                    ['dif',      0, 2850,  10275, 8865,  6090,  5735,  5400,  5400,   5400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
        if(numYoung ===2 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 19400, 34050,  39833, 41841, 200000, 360000, 488000],
                    ['FSA_CA',   0, 3600,  14400, 14400, 14400,  14400, 14400, 14400,  6400,   0],
                    ['CTC',      0, 0,     1125,  2535,  6197.5, 7759,  8000,  8000,   0,      0],
                    ['dif',      0, 3600,  13275, 11865, 8242.4, 6641,  6400,  6400,   6400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            });
        }
    }
    /*************************************************************** Single ************************************************************** */ 
    if (filingStatus==="single"){
        /* NO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===0 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 550000],
                    ['FSA_CA',   0, 0],
                    ['CTC',      0, 0],
                    ['dif',      0, 0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        if(numYoung===0 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 11833, 12950, 18950, 200000, 240000, 260000],
                    ['FSA_CA',   0, 750,   3000,  3000,  3000,  3000,  3000,   1000,   0],
                    ['CTC',      0, 0,     1125,  1400,  1400,  2000,  2000,   0,      0],
                    ['dif',      0, 750,   1875,  1600,  1600,  1000,  1000,   1000,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        if(numYoung ===0 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 12950,  21167, 23225,  24658,  200000, 280000, 320000],
                    ['FSA_CA',   0, 1500,  6000,  6000,   6000,  6000,   6000,   6000,   2000,   0],
                    ['CTC',      0, 0,     1125,  1567.5, 3622,  3828,   4000,   4000,   0,      0],
                    ['dif',      0, 1500,  4875,  4432.5, 2378,  2172,   2000,   2000,   2000,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        /* ONE YOUNG CHILD, VARY OLD CHILDREN */
        if(numYoung===1 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 11833, 12950, 18950, 200000, 240000, 282000],
                    ['FSA_CA',   0, 1050,  4200,  4200,  4200,  4200,  4200,   2200,   0],
                    ['CTC',      0, 0,     1125,  1400,  1400,  2000,  2000,   0,      0],
                    ['dif',      0, 1050,  3075,  2600,  2600,  2200,  2200,   2200,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        if(numYoung===1 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 12950,  21167, 23225,  24658,  200000, 280000, 344000],
                    ['FSA_CA',   0, 1800,  7200,  7200,   7200,  7200,   7200,   7200,   3200,   0],
                    ['CTC',      0, 0,     1125,  1567.5, 3622,  3828,   4000,   4000,   0,      0],
                    ['dif',      0, 1800,  6075,  5632.5, 3578,  3372,   3200,   3200,   3200,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        if(numYoung ===1 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 12950,  23225,  30129,  200000, 320000, 404000],
                    ['FSA_CA',   0, 2550,  10200, 10200,  10200,  10200,  10200,  4200,   0],
                    ['CTC',      0, 0,     1125,  1567.5, 4136,   6000,   6000,   0,      0],
                    ['dif',      0, 2550,  9075,  8632.5, 6064,   4200,   4200,   4200,   0] 
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        /* TWO YOUNG CHILD, VARY OLD CHILDREN */
        if(numYoung===2 && numOld===0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 12950,  21167, 23225,  24658,  200000, 280000, 368000],
                    ['FSA_CA',   0, 2100,  8400,  8400,   8400,  8400,   8400,   8400,   4400,   0],
                    ['CTC',      0, 0,     1125,  1567.5, 3622,  3828,   4000,   4000,   0,      0],
                    ['dif',      0, 2100,  7275,  6832.5, 4778,  4572,   4400,   4400,   4400,   0]
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        if(numYoung===2 && numOld===1) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 12950,  23225,  30129,  200000, 320000, 428000],
                    ['FSA_CA',   0, 2850,  11400, 11400,  11400,  11400,  11400,  5400,   0],
                    ['CTC',      0, 0,     1125,  1567.5, 4136,   6000,   6000,   0,      0],
                    ['dif',      0, 2850,  10275, 9832.5, 7264,   5400,   5400,   5400,   0] 
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
        if(numYoung ===2 && numOld===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 2500,  10000, 12950,   23225,  37536,  200000, 360000, 488000],
                    ['FSA_CA',   0, 3600,  14400, 14400,   14400,  14400,  14400,  6400,   0],
                    ['CTC',      0, 0,     1125,  1567.5,  4136,   8000,   8000,   0,      0],
                    ['dif',      0, 3600,  13275, 12832.5, 10264,  6400,   6400,   6400,   0] 
                ],
                unload: ['FSA_EITC', 'EITC', 'HOH_Savings'],
            });
            master_chart_all.axis.max({x: 400000});
            });
        }
    } 
}