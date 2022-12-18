/****************************************************************EITC****************************************************************/
function single_eitc_builder_2023(chartName, xName, dataName, numChildren){
	if(numChildren === 'three'){
		chartName.load({
    		columns: [
    			[xName,    0, 16510, 21560, 56838],
    			[dataName, 0, 7430,  7430,  0],
			]
    	});
	}
	else if(numChildren === 'two'){
		chartName.load({
    		columns: [
    			[xName,    0, 16510, 21560, 52918],
    			[dataName, 0, 6604,  6604,  0],
			]
    	});
	}
	else if(numChildren === 'one'){
		chartName.load({
    		columns: [
    			[xName,    0, 11750, 21560, 46560],
    			[dataName, 0, 3995,  3995,  0],
			]
    	});
	}
	else if(numChildren === 'none'){
		chartName.load({
    		columns: [
    			[xName,    0, 7840, 9800, 17640],
    			[dataName, 0, 600,  600,  0],
			]
    	});
	}
}

function married_eitc_builder_2023(chartName, xName, dataName, numChildren){
	if(numChildren === 'three'){
		chartName.load({
    		columns: [
    			[xName,    0, 16510, 28120, 63398],
    			[dataName, 0, 7430,  7430,  0],
			]
    	});
	}
	else if(numChildren === 'two'){
		chartName.load({
    		columns: [
    			[xName,    0, 16510, 28120, 59478],
    			[dataName, 0, 6604,  6604,  0],
			]
    	});
	}
	else if(numChildren === 'one'){
		chartName.load({
    		columns: [
    			[xName,    0, 11750, 28120, 53120],
    			[dataName, 0, 3995,  3995,  0],
			]
    	});
	}
	else if(numChildren === 'none'){
		chartName.load({
    		columns: [
    			[xName,    0, 7840, 16370, 24210],
    			[dataName, 0, 600,  600,   0],
			]
    	});
	}
}

function single_eitc_builder_2022(chartName, xName, dataName, numChildren){
	if(numChildren === "none"){
        chartName.load({
            columns: [
                [xName,      0, 7320, 9160, 16480],
                [dataName,   0, 560,  560,  0]
            ]
        });
    }
    else if(numChildren === "one"){
        chartName.load({
            columns: [
                [xName,      0, 10979, 20131, 43493],
                [dataName,   0, 3733,  3733,  0]
            ]
        });
    }
    else if(numChildren === "two"){
        chartName.load({
            columns: [
                [xName,      0, 15290, 20131, 49399],
                [dataName,   0, 6164,  6164,  0]
            ]
        });
    }
    else if (numChildren === "three"){
        chartName.load({
            columns: [
                [xName,      0, 15410, 20131, 53057],
                [dataName,   0, 6935,  6935,  0]
            ]
        });
    }
}

function married_eitc_builder_2022(chartName, xName, dataName, numChildren){
	if(numChildren === 'three'){
		chartName.load({
    		columns: [
    			[xName,      0, 15410, 26262, 59187],
                [dataName,   0, 6935,  6935,  0]
			]
    	});
	}
	else if(numChildren === 'two'){
		chartName.load({
    		columns: [
    			[xName,      0, 15290, 26262, 55529],
                [dataName,   0, 6164,  6164,  0]
			]
    	});
	}
	else if(numChildren === 'one'){
		chartName.load({
    		columns: [
    			[xName,      0, 10979, 26262, 49622],
                [dataName,   0, 3733,  3733,  0]
			]
    	});
	}
	else if(numChildren === 'none'){
		chartName.load({
    		columns: [
    			[xName,      0, 7320, 15290, 22610],
                [dataName,   0, 560,  560,   0],
			]
    	});
	}
}

/****************************************************************Tax Brackets****************************************************************/
function single_tax_liability_builder_2023(chartName, xName, dataName){
	chartName.load({
        columns: [
            [xName,    0, 13850, 24850, 58575, 109225, 195950, 245100, 591975],
            [dataName, 0, 0,     1100,  5147,  16290,  37104,  52832,  174238.25],
        ]
    });

}

function hoh_tax_liability_builder_2023(chartName, xName, dataName){
	chartName.load({
        columns: [
            [xName,     0, 20800, 36500, 80650, 116150, 202900, 252050, 598900],
            [dataName,  0, 0,     1570,  6868,  14678,  35498,  51226,  172623.5],
        ]
    });
}

function married_tax_liability_builder_2023(chartName, xName, dataName){
	chartName.load({
        columns: [
            [xName,    0, 27700, 49700, 117150, 218450, 391900, 490200, 721450],
            [dataName, 0, 0,     2200,  10294,  32580,  74208,  105664, 186601.5],
        ]
    });
}

function single_tax_liability_builder_2022(chartName, xName, dataName){
	chartName.load({
        columns: [
            [xName,    0, 12950, 23225,  54725,  102025,  183000],
            [dataName, 0, 0,     1027.5, 4807.5, 15213.5, 37755.5],
        ]
    });

}

function hoh_tax_liability_builder_2022(chartName, xName, dataName){
	chartName.load({
        columns: [
            [xName,     0, 19400, 34050, 75300, 108450, 189450],
            [dataName,  0, 0,     1465,  6415,  13708,  33148],
        ]
    });
}

function married_tax_liability_builder_2022(chartName, xName, dataName){
	chartName.load({
        columns: [
            [xName,    0, 25900, 46400, 109450, 204050],
            [dataName, 0, 0,     2050,  9616,   30428],
        ]
    });
}


