/*DEFAULT GRAPH: Standard deduction for both single filer & HOH */
var HOHchart = c3.generate({
    bindto: '#HOHchart',
    data: {
        xs: {
            'HOH_Savings' : 'x',
            'person1' : 'x1',
            'person2' : 'x2',
            'after_ctc' : 'x3',
        },
        columns: [
            ['x',            0, 12950, 19400, 23225, 34050, 54725, 75300, 102025, 108450, 183000, 189450, 228900, 235350, 552850, 559300, 600000],
            ['HOH_Savings',  0, 0,     645,   645,   861.5, 861.5, 2919,  2919,   3047.5, 3047.5, 3563.5, 3563.5, 3757,   3757,   3886,   3886],
        ],
        types: {
            HOH_Savings: 'area',
            person1: 'area',
            person2: 'area',
            after_ctc: 'area',
        },
        names: {
            HOH_Savings: 'HOH Tax Savings',
            person1: 'Person 1',
            person2: 'Person 2',
            after_ctc: 'HOH Tax Savings after CTC'
        }
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 65,
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
                values: [0, 100000, 200000, 300000, 400000, 500000, 600000]
            },
            padding: {left: 0, right: 0},
        },
        y: {
            label: {text: 'Tax Savings', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000]
            }
        }
    },
    grid: {
        x: {
            lines: [{value: 50000, text: 'Your income'}],
            min: 0,
        },
        y: {
        }
    }
});

/* Zooms graph on lower incomes */
function zoomHOHGraph(){
    if(zoom_switch_HOH.checked === true){
        myRange_HOH.max = "100000";
            setTimeout(function () {
                HOHchart.axis.max({x: 60000});
        }, );
        HOHchart.internal.config.axis_x_tick_values = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
    }
    else{
        myRange_HOH.max = "600000";
            setTimeout(function () {
                HOHchart.axis.max({x: 600000});
        }, );
        HOHchart.internal.config.axis_x_tick_values = [0, 100000, 200000, 300000, 400000, 500000, 600000];
    }
}

/* Moves the income slider */
function modifyIncome_HOH(){
    setTimeout(function () {
        HOHchart.xgrids([{value: myRange_HOH.value, text:'Your income'}]);
    }, );
}

/* Adjusts the chart according to user input */
function modifyGraph_HOH(){
    if(tax_credit_switch.checked === false){
        data = taxDifference(myRange_ID.value);
        combined_brackets = data[0];
        tax_dif = data[1];

        combined_brackets.unshift('x');
        tax_dif.unshift('HOH_Savings');

        HOHchart.hide('after_ctc');
        HOHchart.data.names({HOH_Savings: 'HOH Tax Savings'});
    }
    else{
        /* Formatting for number of children */
        numChildren = 1;
        if(num_children.value === 'two'){
            numChildren = 2;
        }
        else if(num_children.value === 'three'){
            numChildren = 3;
        }
        else if(num_children.value === 'four'){
            numChildren = 4;
        }
        else if(num_children.value === 'five'){
            numChildren = 5;
        }

        data = tax_difference_with_ctc(myRange_ID.value, numChildren);
        combined_brackets = data[0];
        tax_dif = data[1];

        combined_brackets.unshift('x3');
        tax_dif.unshift('after_ctc'); 

        HOHchart.show('after_ctc');
        HOHchart.data.names({HOH_Savings: 'HOH Tax Savings Before CTC'}); 
    }

    HOHchart.load({
        columns: [
            combined_brackets,
            tax_dif
        ]
    });
}
