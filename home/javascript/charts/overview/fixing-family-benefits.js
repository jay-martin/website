/******************************************************************************************
 * This file contains the function creating the "Fixing Family Benefits" c3.js chart 
 * And the functions controlling the animation of that chart
 * ****************************************************************************************/
var fixingFamilyBenefitsChart = c3.generate({
    bindto: '#fixing_family_benefits_chart',
    size: {
        height: chartHeight,
    },
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

            existing_point: 'x_point',
            no_exclusion_point: 'x_point',
        },
        columns: [
            ['x', 0, 2500, 10979, 11833, 25900, 26262, 31900, 49622, 400000, 440000],
            ['total_hidden', 0, 850.0000000000001, 5004.85, 5132.95, 5133, 5169.2, 4841.9800000000005, 2000, 2000, 0],
            ['total', 0, 850.0000000000001, 5004.85, 5132.95, 5133, 5169.2, 4841.9800000000005, 2000, 2000, 0],
            ['no_exclusion', 5733, 4883, 728.1499999999996, 600.0500000000002, 600, 563.8000000000002, 0],

            ['x2', 31900, 49622, 400000, 440000],
            ['no_exclusion_end', 4841.9800000000005, 2000, 2000, 0],

            ['x_point', 10000],
            ['existing_point', 4525],
            ['no_exclusion_point', 5733],
        ],
        types: {
            total: 'line',
            total_hidden: 'area',
            no_exclusion: 'area',
            loss_in_benefits: 'line',
        },
        names: {
            total: 'Existing Benefits',
            no_exclusion: 'Benefit Without Exclusion of Poor Families',
            loss_in_benefits: 'Loss in Benefits',
        },
        colors: {
            total: white_or_black,
            total_hidden: 'white',

            no_exclusion: 'red',
            no_exclusion_end: 'red',

            loss_in_benefits: 'red',

            existing_point: white_or_black,
            no_exclusion_point: 'red',

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
    size: {
      height: 280,
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 65,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: ['total_hidden', 'no_exclusion_end', 'existing_point', 'no_exclusion_point'],
        item: { onhover: function () {} },
    },
    tooltip: {
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
                values: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000]
            },
            max: 7000,
            padding: {top: 0, bottom: 0},
        }
    },
    grid: {
        lines: {
          front: false
        },
        x: {
            lines: [{value: 10000, text: 'Your income'}],
            min: 0,
        },
        y: {
            lines: [{value: 0, text: ''},],
        }
    }
});

