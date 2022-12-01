/******************************************************************************************
 * This file contains the function creating the c3.js chart
 * ****************************************************************************************/
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
