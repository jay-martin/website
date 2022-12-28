/*Default values */
document.getElementById('fsaEITC').innerHTML = 'Under the Family Security Act, your EITC benefit is $3,000';
document.getElementById('currEITC').innerHTML = 'Under existing law (2022), your EITC benefit is $6,164';
document.getElementById('diffEITC').innerHTML = 'Under the Family Security Act, your EITC benefit would decrease by $3,164';

/*DEFAULT GRAPH: Married with one child */
var chart = c3.generate({
    bindto: '#chart',
    data: {
        x: 'x',
        columns: [
            ['x',        0, 10979, 18000, 26262, 33000, 49622, 54000, 60000],
            ['FSA_EITC', 0, 1830,  3000,  3000,  3000,  625,   0,     0],
            ['EITC',     0, 3733,  3733,  3733,  2666,  0,     0,     0],
            ['dif',      0, -1903, -733, -733,  334,   625,   0,      0]
        ],
        names: {
            FSA_EITC: 'Family Security Act EITC',
            EITC: 'Current EITC (2022)',
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
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000]
            },
            padding: {left: 0, right: 0},
        },
        y: {
            label: {text: 'Benefit / Benefit Difference', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [-4000, -3000, -2000, -1000, 0, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000]
            },
            padding: {bottom: 10},
        }
    },
    grid: {
        x: {
            lines: [{value: 20000, text: 'Your income'}]
        },
        y: {
            lines: [{value: 0}]
        }
    }
});

function master_adjust_chart(){
    modify_eitc_chart(filingstatus_eitc.value, numchildren_eitc.value);
}

/* Moves income xgrids */
function modifyIncome(){
    setTimeout(function () {
        chart.xgrids([{value: myRange.value, text:'Your income'}]);
    }, );
}

/* Prints the benefit amounts and the difference between them */
function output_eitc(){
    numChildren = num_children_eitc(numchildren_eitc.value);
    fsa = fsa_eitc_calculate(myRange.value, filingstatus_eitc.value, numChildren);
    current = existingEITC(myRange.value, filingstatus_eitc.value, numChildren);
    difference = fsa-current;

    document.getElementById('fsaEITC').innerHTML = 'Under the Family Security Act, your EITC benefit is $' + fsa.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('currEITC').innerHTML = 'Under existing law (2022), your EITC benefit is $' + current.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if(difference < 0){
        document.getElementById('diffEITC').innerHTML = 'Under the Family Security Act, your EITC benefit would decrease by $' + (difference.toFixed()*-1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else{
        document.getElementById('diffEITC').innerHTML = 'Under the Family Security Act, your EITC benefit would increase by $' + difference.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

/* Displays only the difference in benefits curve */
function diffInBen_EITC_function(){
    if(diffInBen_EITC_switch.checked == true){
        chart.axis.labels({
            y: 'Difference in Benefit ($)'
        });
        chart.hide(['FSA_EITC', 'EITC']);
    }
    else{
        chart.axis.labels({
            y: 'Benefit/Benefit Difference ($)'
        });
        chart.show();
    }
}