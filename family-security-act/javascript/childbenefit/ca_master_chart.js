/*TASKS */
/*1. Adjust slider values when phaseout zoom-in is engaged. Currently you can slide below the income range displayed. */
/*2. Benefit curve goes past axis max for some phaseout zoom ins  */

/*Default values */
document.getElementById('fsa_CA_benefit').innerHTML = 'Under the Family Security Act, your child benefit is $3,000.';
document.getElementById('CTC_benefit').innerHTML = 'Under existing law (2022), your child tax credit is $2,000.';
document.getElementById('CA_benefit_difference').innerHTML = 'Your child benefit increases by $1,000.';

/*DEFAULT GRAPH: Married with one older child */
var CAchart = c3.generate({
    bindto: '#CAchart',
    data: {
        x: 'x',
        columns: [
            ['x',        0, 2500,  10000, 11833, 25900, 31900, 400000, 440000, 460000, 550000],
            ['FSA_CA',   0, 750,   3000,  3000,  3000,  3000,  3000,   1000,   0,      0],
            ['CTC',      0, 0,     1125,  1400,  1400,  2000,  2000,   0,      0,      0],
            ['dif',      0, 750,   1875,  1600,  1600,  1000,  1000,   1000,   0,      0]
        ],
        names: {
            FSA_CA: 'Family Security Act Child Benefit',
            EITC: 'Current Child Tax Credit (2022)',
            dif: 'Change in Benefit'
        }
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 70,
        right: 20,
    },
    color: {
        pattern: ['#f7c22f', '#6ab6fc', '#eb3734']
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
                values: [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000]
            },
            padding: {left: 0},
        },
        y: {
            label: {text: 'Benefit / Benefit Difference', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000]
            },
            padding: {bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 60000, text: 'Your income'}]
        },
        y: {
            lines: [{value: 0}]
        }
    }
});

function modifyCAGraph(){
    if(fsa1_or_2_CA.value==="one"){
        modifyCAGraph1(filingstatus_ca.value, numYoungChildren.value, numOldChildren.value);
    }
    else{
        modifyCAGraph2(filingstatus_ca.value, numYoungChildren.value, numOldChildren.value);
    }
}

/* Moves the income slider */
function modifyIncome_CA(){
    CAchart.xgrids([{value: myRange_CA.value, text:'Your income'}]);
}

/* Outputs benefit values */
function new_benefits_CA(){
    numYoung = num_young(numYoungChildren.value);
    numOld = num_old(numOldChildren.value);

    benefits = child_benefit_difference(myRange_CA.value, filingstatus_ca.value, numYoung, numOld, fsa1_or_2_CA.value);

    document.getElementById('fsa_CA_benefit').innerHTML = 'Under the Family Security Act, your child benefit is $' + benefits[0].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('CTC_benefit').innerHTML = 'Under existing law (2022), your child tax credit is $' + benefits[1].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('CA_benefit_difference').innerHTML = 'Your child benefit increases by $' + benefits[2].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/* Hides or shows curves based on user input*/
function diffInBen_CA_function(){
    if(diffInBen_CA_switch.checked == true){
        CAchart.hide(['FSA_CA', 'CTC']);
    }
    else{
        CAchart.show();
    }
}

/* Adjusts zoom when filing status changes and phase-in/phase-out switch is selected */
function adjust_zoom_CA(){
    if(zoom_switch_CA_phaseout.checked === true){
        zoom_CA_graph_phaseout();
    }
    else if (zoom_CA_graph_phasein.checked ===true){
        zoom_CA_graph_phasein();
    }
}

/* Zooms into phase-in region */
function zoom_CA_graph_phasein(){
    if(zoom_switch_CA_phaseout.checked === true){
        zoom_switch_CA_phaseout.checked = false;
        setTimeout(function () {
            CAchart.axis.min({x: 0});
        }, );
    }
    
    if(zoom_switch_CA_phasein.checked === true){
        if(filingstatus_ca.value==="married"){
            myRange_CA.max = "60000";
            setTimeout(function () {
                CAchart.axis.max({x: 60000});
            }, );
        }
        else if(filingstatus_ca.value==="hoh"){
            myRange_CA.max = "40000";
            setTimeout(function () {
                CAchart.axis.max({x: 40000});
            }, );
        }
        else if(filingstatus_ca.value==="single"){
            myRange_CA.max = "40000";
            setTimeout(function () {
                CAchart.axis.max({x: 40000});
            }, );
        }
        CAchart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000];
    }
    else{
        if(filingstatus_ca.value==="married"){
            if((numYoungChildren.value==="two" && numOldChildren.value==="two") || (numYoungChildren.value==="two" && numOldChildren.value==="one")){
                myRange_CA.max = "700000";
                setTimeout(function () {
                    CAchart.axis.max({x: 700000});
                }, );
            }
            else{
                myRange_CA.max = "600000";
                setTimeout(function () {
                    CAchart.axis.max({x: 600000});
                }, );
            }
        }
        else if(filingstatus_ca.value==="hoh"){
            myRange_CA.max = "400000";
            setTimeout(function () {
                CAchart.axis.max({x: 400000});
            }, );
        }
        else if(filingstatus_ca.value==="single"){
            myRange_CA.max = "400000";
            setTimeout(function () {
                CAchart.axis.max({x: 400000});
            }, );
        }
        CAchart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000];
    }
}

/* Zooms into phase-out region */
function zoom_CA_graph_phaseout(){
    if(zoom_switch_CA_phasein.checked === true){
        zoom_switch_CA_phasein.checked = false;
        setTimeout(function () {
            CAchart.axis.max({x: 600000});
        }, );
    }

    if(zoom_switch_CA_phaseout.checked === true){
        if(filingstatus_ca.value==="married"){
            setTimeout(function () {
                CAchart.axis.min({x: 350000});
                CAchart.axis.max({x: 600000});
            }, );
        }
        else if(filingstatus_ca.value==="hoh" || filingstatus_ca.value==="single"){
            setTimeout(function () {
                CAchart.axis.min({x: 150000});
                CAchart.axis.max({x: 400000});
            }, );
        }
        CAchart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000];
    }
    else{  
        setTimeout(function () {
            CAchart.axis.min({x: 0});
        }, );
        CAchart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000];
    }
}

