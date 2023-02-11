var mp_chart = c3.generate({
    bindto: '#marriage_penalty_chart',
    data: {
        xs: {
            'person1_base_tax' : 'x_p1_base',

            'person1'       : 'x_p1',
            'person2'       : 'x_p2',
            'married'       : 'x_m',

            'combined_tax'  : 'x_horizontal',
            'penalty'       : 'x_horizontal',
            'married_tax'   : 'x_horizontal',
            'bonus'         : 'x_horizontal',

            'point_person1' : 'x_point',
            'point_person2' : 'x_point_person2',
            'point_married' : 'x_point_married',
        },
        columns: [
            ['x_p2',    0, 13850, 23000, 23001, 24850, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 58575, 60000, 109225, 195950, 245100, 591975],
            ['person2', 0, 0, 0, 15.100000000000023, 200, 218, 248.1199999999999, 488, 518.1199999999999, 758, 788.1199999999999, 1028, 1058.12, 1298, 1328.12, 1568, 1598.12, 1838, 1868.12, 2108, 2138.12, 2378, 2408.12, 2648, 2678.12, 4547, 4860.5, 15690, 36504, 52232, 173638.25],

            ['x_p1',    0, 13850, 23000, 23001, 24850, 25000, 25001, 27000, 27001, 29000, 29001, 31000, 31001, 33000, 33001, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 58575, 60000, 109225, 195950, 245100, 591975],
            ['person1', 218, 218, 218, 233.0999999999999, 418, 436, 466.1199999999999, 706, 736.1199999999999, 976, 1006.1199999999999, 1246, 1276.12, 1516, 1546.12, 1786, 1816.12, 2056, 2086.12, 2326, 2356.12, 2596, 2626.12, 2866, 2896.12, 4765, 5078.5, 15908, 36722, 52450, 173856.25],

            ['x_m',     0, 27700, 35000, 35001, 37000, 37001, 39000, 39001, 41000, 41001, 43000, 43001, 49700, 60000, 117150, 218450, 391900, 490200, 721450],
            ['married', 0, 0,     0,     0,     0,     0,     0,     0,     10,    70,    270,   330,   1000,   2236, 9094,   31380,  73008,  104464, 185401.5],

            ['x_horizontal', 0,    120000],
            ['combined_tax', 1126, 1126],
            ['penalty',      510,  510],
            ['married_tax',],
            ['bonus',],

            ['x_point',       30000],
            ['point_person1', 1126],

            ['x_point_person2', 25000],
            ['point_person2', 218],

            ['x_point_married', 55000],
            ['point_married',   1636],
        ],
        names: {
            person1: "Your Family's Tax Liability After Maximum CDCC Credit",
            person2: "Your Partner's Tax Liability After Maximum CDCC Credit",
            married: "Your Family's Tax Liability When Married Filing Jointly & After Maximum CDCC Credit",
        },
        types: {
            'combined_tax' : 'area',
            'penalty'      : 'area',
            'married_tax' : 'area',
            'bonus'      : 'area',
        },
        groups: [ ['combined_tax', 'penalty'], ['married_tax', 'bonus'] ], 
        order: false,
        colors: {
            person1       : '#6ab6fc',
            point_person1 : '#6ab6fc',

            person2       : purple_shade,
            point_person2 : purple_shade,

            married       : white_or_black,
            point_married : white_or_black,

            combined_tax : 'red',
            penalty      : 'red',

            married_tax  : '#36D903',
            bonus        : '#36D903',

            credit_amount       : '#f7c22f',
            point_credit_amount : '#f7c22f',
        },
    },
    size: {
        height: 400,
    },
    transition: {
        duration: 400,
    },
    padding: {
        bottom: 0,
        top: 0,
        left: 60,
        right: 20,
    },
    legend: {
        position: 'bottom',
        hide: ['point_person1', 'point_person2', 'point_married', 'combined_tax', 'penalty', 'married_tax', 'bonus'],
    },
    tooltip: {
        show: false
    },
    axis: {
        x: {
            label: {text: 'Employment Income', position: 'outer-center'},
            tick: {
                format: d3.format('$,'),
                values: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]
            },
            padding: {left: 0, right: 0},
            max: 60000,
            height: 45,
        },
        y: {
            show: true,
            label: {text: 'Tax Liability After Maximum CDCC', position: 'outer-middle'},
            tick: {
                format: d3.format('$,'),
                values: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000]
            },
            min: 0,
            max: 3000,
            padding: {top: 0, bottom: 0},
        },
    },
    grid: {
        lines: {
          front: false
        },
        y: {
            lines: [{value: 1126, text: 'Combined Individual Tax', position: 'start'}, {value: 1636, text: 'Married Tax', position: 'start'}, {value: 218, text: "Your Partner's Minimum Tax Liability", position: 'start'}],
        },
        x: {
            lines: [{value: 30000, text: 'Your Income'}, {value: 25000, text: "Your Partner's Income"}, {value: 55000, text: 'Combined Income'}],
            min: 0,
        },
    }
});
