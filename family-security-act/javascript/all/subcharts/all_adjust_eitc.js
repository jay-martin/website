/* Adjusts the eitc chart according to user filing status and number of children inputs */
function all_modify_eitc_chart(filingStatus, numChildren){
    /*
    master_chart_all.internal.config.axis_x_max = undefined;
    master_chart_all.axis.max({
        x: undefined
    });
    */

    if (filingStatus==="married"){
        if(numChildren ===3) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 15410, 18000, 26262, 33000, 54000, 59187, 60000],
                    ['FSA_EITC', 0, 2569,  3000,  3000,  3000,  0,     0,     0],
                    ['EITC',     0, 6935,  6935,  6935,  5515,  1092,  0,     0],
                    ['dif',      0, -4366, -3935, -3935, -2515, -1092, 0,     0]
                ],
                unload: ['FSA_CA', 'CTC', 'HOH_Savings'],
                });
            });
        }
        if(numChildren ===2) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 15290, 18000, 26262, 33000, 54000, 55529, 60000],
                    ['FSA_EITC', 0, 2549,  3000,  3000,  3000,  0,     0,     0],
                    ['EITC',     0, 6164,  6164,  6164,  4744,  322,   0,     0],
                    ['dif',      0, -3570, -3164, -3164, -1744, -322,  0,     0]
                ],
                unload: ['FSA_CA', 'CTC', 'HOH_Savings'],
                });
            });
        }
        if(numChildren === 1){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 10979, 18000, 26262, 33000, 49622, 54000, 60000],
                    ['FSA_EITC', 0, 1830,  3000,  3000,  3000,  625,   0,     0],
                    ['EITC',     0, 3733,  3733,  3733,  2666,  0,     0,     0],
                    ['dif',      0, -1903, -733, -733,   334,   625,   0,     0]
                ],
                unload: ['FSA_CA', 'CTC', 'HOH_Savings'],
                });
            });
        }
        if(numChildren === 0) {
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 7320, 15290, 16000, 20000, 22610, 34000, 60000],
                    ['FSA_EITC', 0, 915,  1911,  2000,  2000,  1627,  0,     0],
                    ['EITC',     0, 560,  560,   506,   200,   0,     0,     0],
                    ['dif',      0, 355,  1351,  1494,  1800,  1627,  0,     0]
                ],
                unload: ['FSA_CA', 'CTC', 'HOH_Savings'],
                });
            });
        }
    } 
    else if(filingStatus==="hoh"){
        if(numChildren===3){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 12000, 15410, 20131, 23000, 37000, 53057, 60000],
                    ['FSA_EITC', 0, 2000,  2000,  2000,  2000,  0,     0,     0],
                    ['EITC',     0, 5400,  6935,  6935,  6330,  3382,  0,     0],
                    ['dif',      0, -2800, -4164, -4164, -3559, -2611, 0,     0]
                ],
                unload: ['FSA_CA', 'CTC', 'HOH_Savings'],
                });
            });
        }
        if(numChildren ===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 12000, 15290, 20131, 23000, 37000, 49399, 60000],
                    ['FSA_EITC', 0, 2000,  2000,  2000,  2000,  0,     0,     0],
                    ['EITC',     0, 4800,  6164,  6164,  5559,  2611,  0,     0],
                    ['dif',      0, -2800, -4164, -4164, -3559, -2611, 0,     0]
                ],
                unload: ['FSA_CA', 'CTC', 'HOH_Savings'],
                });
            });
        }
        if(numChildren===1){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 10979, 12000, 20131, 23000, 37000, 43492, 60000],
                    ['FSA_EITC', 0, 1830,  2000,  2000,  2000,  0,     0,     0],
                    ['EITC',     0, 3733,  3733,  3733,  3275,  1037,  0,     0],
                    ['dif',      0, -1903, -1733, -1733, -1275, -1037, 0,     0]
                ],
                unload: ['FSA_CA', 'CTC', 'HOH_Savings'],
                });
            });
        }
        if(numChildren ===0){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 7320, 8000, 9160, 10000, 16480, 17000, 60000],
                    ['FSA_EITC', 0, 915,  1000, 1000, 1000,  74,    0,     0],
                    ['EITC',     0, 560,  560,  560,  496,   0,     0,     0],
                    ['dif',      0, 355,  440,  440,  504,   74,    0,     0]
                ],
                unload: ['FSA_CA', 'CTC', 'HOH_Savings'],
                });
            });
        }
    }
    else if (filingStatus==="single"){
        if(numChildren===3){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 12000, 15410, 20131, 23000, 37000, 53057, 60000],
                    ['FSA_EITC', 0, 2000,  2000,  2000,  2000,  0,     0,     0],
                    ['EITC',     0, 5400,  6935,  6935,  6330,  3382,  0,     0],
                    ['dif',      0, -2800, -4164, -4164, -3559, -2611, 0,     0]
                ],
                unload: ['FSA_CA', 'CTC', 'HOH_Savings'],
                });
            });
        }
        if(numChildren===2){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 12000, 15290, 20131, 23000, 37000, 49399, 60000],
                    ['FSA_EITC', 0, 2000,  2000,  2000,  2000,  0,     0,     0],
                    ['EITC',     0, 4800,  6164,  6164,  5559,  2611,  0,     0],
                    ['dif',      0, -2800, -4164, -4164, -3559, -2611, 0,     0]
                ],
                unload: ['FSA_CA', 'CTC', 'HOH_Savings'],
                });
            });
        }
        if(numChildren===1){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 10979, 12000, 20131, 23000, 37000, 43492, 60000],
                    ['FSA_EITC', 0, 1830,  2000,  2000,  2000,  0,     0,     0],
                    ['EITC',     0, 3733,  3733,  3733,  3275,  1037,  0,     0],
                    ['dif',      0, -1903, -1733, -1733, -1275, -1037, 0,     0]
                ],
                unload: ['FSA_CA', 'CTC', 'HOH_Savings'],
                });
            });
        }
        if(numChildren===0){
            setTimeout(function () {
                master_chart_all.load({
                columns: [
                    ['x',        0, 7320, 8000, 9160, 10000, 16480, 17000, 60000],
                    ['FSA_EITC', 0, 915,  1000, 1000, 1000,  74,    0,     0],
                    ['EITC',     0, 560,  560,  560,  496,   0,     0,     0],
                    ['dif',      0, 355,  440,  440,  504,   74,    0,     0]
                ],
                unload: ['FSA_CA', 'CTC', 'HOH_Savings'],
                });
            });
        }
    }
}