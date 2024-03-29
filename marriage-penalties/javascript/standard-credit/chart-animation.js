timeout = setTimeout(step1, 1000);

function step1(){
	standardCredit.load({
		columns: [
            ['x1',      0, 10000, 40000, 200000],
            ['person1', 0, 3000,  3000,  3000],
		]
	});
	timeout = setTimeout(step2, 1000);
}

function step2(){
	standardCredit.load({
		columns: [
            ['x1',      0,    10000, 40000, 80000, 200000],
            ['person1', 3000, 3000,  3000,  3000,  3000],
		]
	});
	timeout = setTimeout(step3, 1000);
}

function step3(){
	//standardCredit.internal.config.axis_x_tick_values = [0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000];
	standardCredit.axis.max({x: 140000});
	standardCredit.axis.max({y: 8000});
	timeout = setTimeout(step4, 1000);
}

function step4(){
	standardCredit.show('tax');
	standardCredit.load({
		columns: [
			['x4',      80000, 200000],
            ['tax',     0,     12000],
	    ]
    });
	timeout = setTimeout(reset, 3000);
}

function reset(){
	standardCredit.axis.max({x: 60000});
	standardCredit.axis.max({y: 4000});
	standardCredit.hide('tax');
	standardCredit.load({
		columns: [
		    ['x1',      0, 10000, 20000, 40000],
		    ['person1', 0, 3000,  3000,  0],
		    ['x4',      100000, 200000],
            ['tax',     0,      0],
	    ]
    });
	timeout = setTimeout(step1, 1000);
}