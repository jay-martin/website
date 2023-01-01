/*DEFAULT GRAPH: Married with one child */
var master_chart_all = c3.generate({
    bindto: '#master_chart_all',
    data: {
        x: 'x',
        columns: [
            ['x',            0,    2500,   10000, 10979,  11833,  18000, 25900, 26262, 31900, 33000, 49622, 54000, 400000, 440000, 460000],
            ['CTC',          0,    0,      1125,  1272,   1400,   1400,  1400,  1436,  2000,  2000,  2000,  2000,  2000,   0,      0],
            ['EITC',         0,    850,    3400,  3733,   3733,   3733,  3733,  3733,  2842,  2666,  0,     0,     0,      0,      0],
            ['FSA_CA',       0,    750,    3000,  3000,   3000,   3000,  3000,  3000,  3000,  3000,  3000,  3000,  3000,   1000,   0],
            ['FSA_EITC',     0,    416.5,  1667,  1830,   1972.5, 3000,  3000,  3000,  3000,  3000,  625,   0,     0,      0,      0],
            ['dif',          0,    316.5,  142,   -175,   -160.5, 867,   867,   831,   1158,  1334,  1625,  1000,  1000,   1000,   0],
        ],
        types: {
            FSA_CA: 'area',
            FSA_EITC: 'area',
            CTC: 'area',
            EITC: 'area',
            HOH_Savings: 'area',
        },
        groups: [['FSA_CA', 'FSA_EITC'], ['CTC', 'EITC', 'HOH_Savings']],
        order: false,
        names: {
            FSA_CA: 'FSA Child Benefit',
            FSA_EITC: 'FSA EITC',
            EITC: 'Current EITC (2022)',
            CTC: 'Current CTC (2022)',
            HOH_Savings: 'Head of household tax break',
            dif: 'Change in Benefit',
        },
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 70,
        right: 15,
    },
    color: {
        pattern: ['#6ab6fc', '#6ab6fc', '#f7c22f', '#f7c22f', '#eb3734', '#6ab6fc']
    },
    legend: {
        position: 'bottom'
    },
    tooltip: {
        show: false
    },
    point: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000]
            },
            padding: {left: 0},
        },
        y: {
            label: {text: 'Benefit / Benefit Difference', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [-5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000]
            },
            padding: {bottom: 7, top: 10},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 20000, text: 'Your income'}]
        },
        y: {
            lines: [{value: 0}]
        }
    }
});

/* Hides or shows benefit curves based on user input*/
function only_dif_function_all(){
    if(only_diff_switch_all.checked === true){
        master_chart_all.hide(['FSA_CA', 'CTC', 'FSA_EITC', 'EITC', 'HOH_Savings']);
    }
    else{
        if(subchart_select.value === 'hoh'){
            master_chart_all.show('HOH_Savings');
        }
        else{
            master_chart_all.show(['FSA_CA', 'CTC', 'FSA_EITC', 'EITC', 'HOH_Savings']);
        }
    }
}

/* Hides or shows difference curve based on user input*/
function hide_dif_function_all(){
    if(hide_diff_switch_all.checked === true){
        master_chart_all.hide(['dif']);
    }
    else{
        if(subchart_select.value === 'hoh'){
            master_chart_all.show('dif');
        }
        else{
            master_chart_all.show(['dif']);
        }
    }
}

/* Zooms graph on lower incomes */
function all_zoom_chart(){
    if(zoom_switch_all_phasein.checked === true){
        myRange_income_all.max = "60000";
            setTimeout(function () {
                master_chart_all.axis.max({x: 60000});
        }, );
        master_chart_all.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
    }
    else{
        myRange_income_all.max = "600000";
        master_chart_all.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
        master_chart_all.internal.config.axis_x_max = undefined;
        master_chart_all.axis.max({
            x: undefined
        });
    }
}

/* Moves the income slider */
function all_modify_income(){
    master_chart_all.xgrids([{value: myRange_income_all.value, text:'Your income'}]);
}

/* enables and disabled the HOH tax savings option based on user selection of filing status, and changes the chart when the user switches to a non-HOH filing status while looking at the HOH tax savings chart */
/****CHANGE: CURRENLTY SWITCHES TO CHILD ALLOWANCE CHART BECAUSE I HAVEN'T YET CREATED FULL BENEFITS CHART */ 
function disable_hoh(){
    if(filingstatus_all.value === 'hoh'){
        all_hoh_option.hidden = false;
        id_container.hidden = false;
    }
    else{
        all_hoh_option.hidden = true;
        id_container.hidden = true;
        if(subchart_select.value === 'hoh'){
            subchart_select.value = 'all';
            all_modify_chart();
            modify_benefit_outputs_all();
        }
    }
}

function all_modify_chart(){
    numOld = num_old(numOldChildren_all.value);
    numYoung = num_young(numYoungChildren_all.value);
    numChildren = numOld+numYoung;
    filingStatus = filingstatus_all.value;
    fsa1or2 = fsa1_or_2_all.value;
    itemDeduct = myRange_ID_all.value;

    chart_select = subchart_select.value;

    if(chart_select === 'all'){
        myRange_income_all.max = 600000;
        all_modify_all_chart(filingStatus, numYoung, numOld, fsa1or2, itemDeduct);
    }
    else if(chart_select === 'eitc'){
        myRange_income_all.max = 60000;
        all_modify_eitc_chart(filingStatus, numChildren);
        master_chart_all.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000];
    }
    else if(chart_select === 'ca'){
        master_chart_all.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000];
        myRange_income_all.max = 600000;
        if(fsa1_or_2_all.value === 'one'){
            all_modify_ca_chart_fsa1(filingStatus, numYoung, numOld);
        }
        else{
            all_modify_ca_chart_fsa2(filingStatus, numYoung, numOld);
        }
    }
    else if(chart_select === 'hoh'){
        myRange_income_all.max = 600000;
        master_chart_all.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000];
        all_modify_hoh_chart(itemDeduct);
    }
}