/*DEFAULT GRAPH: Standard deduction for both single filer & HOH */
var chart = c3.generate({
    bindto: '#chart',
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
        },
        columns: [
            ['x',            0,     2500, 10979,   11833, 12950, 18950, 20131, 43492, 50000],
            ['total_hidden', 0,     850,  5004.85, 5133,  5133,  5733,  5733,  2000,  2000],
            ['total',        0,     850,  5004.85, 5133,  5133,  5733,  5733,  2000,  2000],
            ['no_exclusion', 5733,  4883, 728.15,  600,   600,   0,],

            ['x2',               18950, 20131, 43492, 50000],
            ['no_exclusion_end', 5733,  5733,  2000,  2000],
        ],
        types: {
            total: 'line',
            total_hidden: 'area',
            no_exclusion: 'area',
            loss_in_benefits: 'line',
        },
        names: {
            total: 'CTC+EITC',
            no_exclusion: 'Benefit Without Exclusion of Poor Families',
            loss_in_benefits: 'Loss in Benefits',
        },
        colors: {
            total: 'black',
            total_hidden: 'white',
            no_exclusion: 'red',
            no_exclusion_end: 'red',
            loss_in_benefits: 'red',
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
    padding: {
        bottom: 0,
        top: 10,
        left: 65,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: ['total_hidden', 'no_exclusion_end'],
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
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000]
            },
            padding: {left: 0, right: 25},
            max: 50000,
        },
        y: {
            label: {text: 'Benefit', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000]
            },
            max: 7000,
            padding: {top: 0, bottom: 0},
        }
    },
    grid: {
        x: {
            lines: [{value: 10000, text: 'Your income'}],
            min: 0,
        },
        y: {
            lines: [{value: 0, text: ''},],
        }
    }
});

/* Zooms graph on lower incomes */
function zoom_chart(){
    if(zoom_switch.checked === true){
        chart.internal.config.axis_x_tick_values = [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000];
        chart.axis.max({x: 20000});
    }
    else{
        chart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000];
        chart.axis.max({x: 50000});
    }
}

/* Moves the income slider */
function modifyIncome(){
    income = user_income.value;
    chart.xgrids([{value: income, text:'Your income'}]);
}

function show_arbitrary_income(){
    if(arbitrary_income_switch.checked){
        arbitray_income_container.style.display = 'block';
        user_income.step = "1";
    }
    else{
        arbitray_income_container.style.display = 'none';
        user_income.step = "1000";
    }
}

function arbitrary_income_input(){
    income = arbitray_income.value;
    user_income.value = income;
    user_income_output.innerText = income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    user_income.step = "1";
}

function adjust_arbitrary_income(){
    /*adjust arbitrary input box if slider is moved */
    arbitray_income.value = income;
}

/* JQuery UI slider for x and y axes */
$( function() {
    $( "#x_axis_range" ).slider({
      range: true,
      min: 0,
      max: 50000,
      step: 100,
      values: [ 0, 50000 ],
      slide: function( event, ui ) {
        $( "#x_axis_output_start" ).text(ui.values[ 0 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        $( "#x_axis_output_end" ).text(ui.values[ 1 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        arbitrary_x_axis(ui.values[ 0 ], ui.values[ 1 ]);
      }
    });

    $( "#y_axis_range" ).slider({
      range: true,
      min: 0,
      max: 14000,
      step: 100,
      values: [ 0, 7000 ],
      slide: function( event, ui ) {
        $( "#y_axis_output_start" ).text(ui.values[ 0 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        $( "#y_axis_output_end" ).text(ui.values[ 1 ].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        arbitrary_y_axis(ui.values[ 0 ], ui.values[ 1 ]);
      }
    });
} );

function show_arbitrary_axes(){
    if(arbitrary_axes_switch.checked){
        x_axis_slider_container.style.display = 'block';
        y_axis_slider_container.style.display = 'block';
        zoom_switch.disabled = true;
    }
    else{
        x_axis_slider_container.style.display = 'none';
        y_axis_slider_container.style.display = 'none';
        zoom_switch.disabled = false;
    }
}

function arbitrary_x_axis(xMin, xMax){
    chart.axis.min({x: xMin});
    chart.axis.max({x: xMax});
}

function arbitrary_y_axis(yMin, yMax){
    chart.axis.min({y: yMin});
    chart.axis.max({y: yMax});
}
