/*DEFAULT GRAPH: Standard deduction for both single filer & HOH */
var chart = c3.generate({
    bindto: '#ctc_chart',
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
            ['x',            0,     2500, 11833, 25900, 31900, 50000],
            ['total_hidden', 0,     0,    1400,  1400,  2000,  2000],
            ['total',        0,     0,    1400,  1400,  2000,  2000],
            ['no_exclusion', 2000,  2000, 600,   600,   0,],

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
            total: 'white',
            total_hidden: 'black',
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
        duration: 0,
    },
    size: {
        width: 650,
        height: 350,
    },
    padding: {
        bottom: 0,
        top: 10,
        left: 80,
        right: 40,
    },
    legend: {
        hide: true,
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
                values: [0, 500, 1000, 1500, 2000, 2500, 3000]
            },
            max: 2500,
            padding: {top: 0, bottom: 0},
        }
    },
});

flash();

function flash(){
    $('.c3-area').animate({opacity: .3,}, 750);

    setTimeout(function() {
        $('.c3-area').animate({opacity: .7,}, 750);
    }, 500)

    setTimeout(function() {
        flash();
    }, 1500)
}