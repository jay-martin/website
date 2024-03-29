/******************************************************************************************
 * This file contains the function creating the c3.js chart
 * ****************************************************************************************/

//Determine which set of x tick values to use depending on screen width
//Mobile screens require fewer ticks
var windowWidth = window.innerWidth;
if(windowWidth < 800){
    xTick  = [0, 20000, 40000, 60000, 80000, 100000];
    chart_height = 300;
}
else{
    xTick = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000];
    chart_height = 380;
}

var top_chart_chart = c3.generate({
    bindto: '#top_chart',
    data: {
        xs: {
            total : 'x',
            personal_income_tax : 'x',
            fica : 'x',
            eitc : 'x',
            ctc : 'x',
            snap : 'x',
            ptc : 'x',
            baseline_income : 'x',
            income_tax_and_transfer : 'x',
            tangent_line : 'x_tangent',
            
            point: 'x_point',
        },
        columns: [
            ['x',     0, 13849, 13850, 24849, 24850, 58574, 58575, 109224, 109225, 195224, 195225, 245099, 245100, 591974, 591975, 600000],
            ['total', 0, 0,     10,    10,    12,    12,    22,    22,     24,     24,     32,     32,     35,     35,     37,     37],

            // Listed empty so that point is positioned above
            ['x_tangent',],
            ['income_tax_and_transfer',],
            ['tangent_line',],

            ['x_point', 15000],
            ['point', 10],
        ],
        types: {
            total: 'area',
            personal_income_tax: 'line',
            fica: 'line',
            eitc: 'line',
            snap: 'line',
            ptc:  'line',
            income_tax_and_transfer: 'line',
            tangent_line: 'line',
            point: 'line',
        },
        names: {
            total: 'Effective Marginal Tax Rate',
            personal_income_tax: 'Personal Income Tax',
            fica: 'FICA Tax',
            eitc: 'Earned income tax credit',
            ctc:  'Child tax credit',
            snap: 'SNAP (Food Stamps)',
            ptc:  'Medicaid & Premium Tax Credits',
            income_tax_and_transfer: 'Difference between Income after Taxes & Transfers and Employment Income',
            tangent_line: 'Effective Marginal Tax Rate Tangent Line',
        },
        colors: {
            total: '#f7c22f',
            personal_income_tax:'#fc200380',
            fica: '#0dff0080',
            eitc: '#8700a680',
            ctc:  '#0008ff80',
            snap: '#00e5ffB3',
            point: white_or_black,
        },
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 55,
        right: 20,
    },
    legend: {
        show: false,
        //position: 'bottom',
        //hide: ['point', 'income_tax_and_transfer', 'tangent_line'],
    },
    tooltip: {
        show: false
    },
    size: {
        height: chart_height,
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: xTick,
            },
            padding: {left: 0, right: 0},
            max: 100000,
            height: 45,
        },
        y: {
            label: {text: 'Effective Marginal Tax Rate', position: 'outer-middle'},
            tick: {
                format: function(value){
                    return d3.format('.0%')(value/100)
                    },
                values: [-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
            },
            padding: {top: 10, bottom: 7.5},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 15000, text: 'Your income'}],
            min: 0,
        },
        y: {
            lines: [{value: 0, text: ''}],
        }
    },
});
