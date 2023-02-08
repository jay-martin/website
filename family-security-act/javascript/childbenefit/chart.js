/*DEFAULT GRAPH: Married with one older child */
var CAchart = c3.generate({
    bindto: '#CAchart',
    data: {
        xs: {
            'FSA_CA' : 'x',
            'CTC'    : 'x',
            'dif'    : 'x',

            'current_point'    : 'x_point',
            'fsa_point'        : 'x_point',
            'difference_point' : 'x_point',
        },
        columns: [
            ['x',        0, 2500,  10000, 11833, 25900, 31900, 400000, 440000, 460000, 550000],
            ['FSA_CA',   0, 750,   3000,  3000,  3000,  3000,  3000,   1000,   0,      0],
            ['CTC',      0, 0,     1125,  1400,  1400,  2000,  2000,   0,      0,      0],
            ['dif',      0, 750,   1875,  1600,  1600,  1000,  1000,   1000,   0,      0],

            ['x_point', 60000],
            ['fsa_point', 3000],
            ['current_point', 2000],
            ['difference_point', 1000],
        ],
        names: {
            FSA_CA: 'Family Security Act Child Benefit',
            EITC: 'Current Child Tax Credit (2022)',
            dif: 'Change in Benefit'
        },
        colors: {
            FSA_CA : '#f7c22f',
            fsa_point : '#f7c22f',

            CTC : '#6ab6fc',
            current_point : '#6ab6fc',

            dif       : 'red',
            difference_point : 'red',
        },
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 70,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: ['fsa_point', 'current_point', 'difference_point'],
    },
    tooltip: {
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

