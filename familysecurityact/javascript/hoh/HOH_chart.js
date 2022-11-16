/*Default values */
document.getElementById('HOH_savings').innerHTML = 'The head of household filing status saves you $' + 862 + '.';
document.getElementById('item_or_stand').innerHTML = 'You would use the standard deduction as both a single filer and head of household.';

/*DEFAULT GRAPH: Standard deduction for both single filer & HOH */
var HOHchart = c3.generate({
    bindto: '#HOHchart',
    data: {
        x: 'x',
        columns: [
            ['x',            0, 12950, 19400, 23225, 34050, 54725, 75300, 102025, 108450, 183000, 189450, 228900, 235350, 552850, 559300, 600000],
            ['HOH_Savings',  0, 0,     645,   645,   861.5, 861.5, 2919,  2919,   3047.5, 3047.5, 3563.5, 3563.5, 3757,   3757,   3886,   3886]
        ],
        names: {
            HOH_Savings: 'HOH Tax Savings',
        }
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 70,
        right: 22,
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
                values: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000]
            },
            padding: {bottom: 0},
        }
    },
    grid: {
        x: {
            lines: [{value: 50000, text: 'Your income'}]
        },
        y: {
            lines: [{value: 0}]
        }
    }
});

/* Zooms graph on lower incomes */
function zoomHOHGraph(){
    if(zoom_switch_HOH.checked === true){
        myRange_HOH.max = "100000";
            setTimeout(function () {
                HOHchart.axis.max({x: 100000});
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

/* Calculates tax savings from the head of household status*/
function difference_hoh(){
    user_dif = taxDifferenceatIncomeValue(myRange_HOH.value, myRange_ID.value);
    document.getElementById('HOH_savings').innerHTML = 'The head of household filing status saves you $' + user_dif.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.';
}

/* Writes to page whether user would itemize or use the standard deduction */
function deductType(){
    single_deduct = single_deduction();
    hoh_deduct = hoh_deduction();

    if(single_deduct===12950 && hoh_deduct===19400){
        document.getElementById('item_or_stand').innerHTML = 'You would use the standard deduction as both a single filer and head of household.';
    }
    else if(single_deduct>12950 && hoh_deduct===19400){
        document.getElementById('item_or_stand').innerHTML = 'You would use the standard deduction as a head of household but would itemize as a single filer.';
    }
    else{
        document.getElementById('item_or_stand').innerHTML = 'You would itemize your deductions as both a single filer and head of household.';
    }
}

/* Adjusts the chart according to user input */
function modifyGraph_HOH(){
    data = taxDifference(myRange_ID.value);
    combined_brackets = data[0];
    combined_brackets.unshift('x');
    tax_dif = data[1];
    tax_dif.unshift('HOH_Savings');

    HOHchart.load({
        columns: [
            combined_brackets,
            tax_dif
        ]
    });
}