/******************************************************************************************
 * This file contains the function creating the "Why We Need Family Benefits" c3.js chart 
 * And the functions controlling the animation of that chart
 * ****************************************************************************************/

if(window.innerWidth < 900){
    why_we_need_x_tick = [0, 20000, 40000, 60000, 80000, 100000];
}
else{
    why_we_need_x_tick = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
}

var whyWeNeedChart = c3.generate({
    bindto: '#why_we_need_chart',
    size: {
        height: chartHeight,
    },
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
            ['x',                   0, 12949, 12950, 23224, 23225, 54724, 54725, 102024, 102025, 182999, 183000, 228899, 228900, 552849, 552850, 600000],
            ['total',               0, 0,     10,    10,    12,    12,    22,    22,     24,     24,     32,     32,     35,     35,     37,     37],
            ['x_point', 50000],
            ['point', 12],
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
        top: 10,
        left: 55,
        right: 10,
    },
    legend: {
        position: 'bottom',
        hide: 'point',
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: why_we_need_x_tick,
            },
            padding: {left: 0, right: 0},
            max: 100000,
        },
        y: {
            label: {text: 'Effective Marginal Tax Rate', position: 'outer-middle'},
            tick: {
                format: function(value){
                    return d3.format('.0%')(value/100)
                    },
                values: [-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
            },
            padding: {top: 19, bottom: 5},
        }
    },
    grid: {
        x: {
            lines: [{value: 50000, text: 'Your income'}],
            min: 0,
        },
        y: {
            lines: [{value: 0, text: ''}],
        }
    },
});