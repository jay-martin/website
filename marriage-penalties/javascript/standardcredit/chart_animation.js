timeout = setTimeout(step1, 1000);

function step1(){
	standardCredit.load({
		columns: [
			['x3',      0, 20000, 40000, 80000],
            ['married', 0, 6000,  6000,  6000],
            ['x1',      0, 10000, 40000, 80000],
            ['person1', 0, 3000,  3000,  3000],
		]
	});
	timeout = setTimeout(step2, 1000);
}

function step2(){
	standardCredit.load({
		columns: [
			['x3',      0,    10000, 40000, 80000],
            ['married', 6000, 6000,  6000,  6000],
            ['x1',      0,    10000, 40000, 80000],
            ['person1', 3000, 3000,  3000,  3000],
		]
	});
	timeout = setTimeout(reset, 2000);
}

function reset(){
	standardCredit.load({
		columns: [
			['x3',      0, 20000, 40000, 80000],
		    ['married', 0, 6000,  6000,  0],
		    ['x1',      0, 10000, 20000, 40000],
		    ['person1', 0, 3000,  3000,  0],
	    ]
    });
	timeout = setTimeout(step1, 2000);
}