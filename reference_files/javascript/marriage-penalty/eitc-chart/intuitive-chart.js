function eitc_marriage_penalty_intuitive_adjust_person1(chart_name){
    let chart       = eval(chart_name + '_chart');
    let p1_children = eval(chart_name + '_person1_children').value;
    let p2_children = eval(chart_name + '_person2_children').value;

    if(p1_children === p2_children){
        single_eitc_builder_2023(chart, 'x1', 'person1', p1_children);
        setTimeout(function(){
            chart.hide('person2');
            chart.show('person2_dashed');
        }, 400);
    }
    else{
        single_eitc_builder_2023(chart, 'x1', 'person1', p1_children);
        chart.hide('person2_dashed');
        chart.show('person2');
    }
}

function eitc_marriage_penalty_intuitive_adjust_person2(chart_name){
    let chart       = eval(chart_name + '_chart');
    let p1_children = eval(chart_name + '_person1_children').value;
    let p2_children = eval(chart_name + '_person2_children').value;

    if(p1_children === p2_children){
        single_eitc_builder_2023(chart, 'x2', 'person2', p2_children);
        single_eitc_builder_2023(chart, 'x2', 'person2_dashed', p2_children);

        setTimeout(function(){
            chart.legend.hide('person2');
            chart.legend.show('person2_dashed');
            chart.show('person2_dashed');
            chart.hide('person2');
        }, 400);
    }
    else{
        single_eitc_builder_2023(chart, 'x2', 'person2', p2_children);
        single_eitc_builder_2023(chart, 'x2', 'person2_dashed', p2_children);
        chart.legend.hide('person2_dashed');
        chart.legend.show('person2');
        chart.show('person2');
        chart.hide('person2_dashed');
    }
}

function eitc_marriage_penalty_intuitive_adjust_married(chart_name){
    let chart = eval(chart_name + '_chart');
    
    let p1_children       = eval(chart_name + '_person1_children').value;
    let p2_children       = eval(chart_name + '_person2_children').value;
    let combined_children = sum_children(p1_children, p2_children);

    married_eitc_builder_2023(chart, 'x3', 'married', combined_children);
}

function eitc_marriage_penalty_intuitive_modify_income(chart_name){
    let chart = eval(chart_name + '_chart');

    let p1_income       = eval(chart_name + '_person1_income').value;
    let p2_income       = eval(chart_name + '_person2_income').value;
    let combined_income = parseInt(p1_income) + parseInt(p2_income);

    let p1_children  = eval(chart_name + '_person1_children').value;
    let p2_children  = eval(chart_name + '_person2_children').value;
    let num_children = sum_children(p1_children, p2_children);

    // EITC values
    let p1_eitc       = eitc_value_2023(p1_income, 'single', p1_children);
    let p2_eitc       = eitc_value_2023(p2_income, 'single', p2_children);
    let combined_eitc = p1_eitc + p2_eitc;
    let married_eitc  = eitc_value_2023(combined_income, 'married', num_children);

    /* Move xgrids */
    if(p1_income == 0){
        chart.xgrids([{value: p1_income, text:'Your income'},{value: combined_income, text:"Combined income / Person 2 income"}]);
    }
    else if(p2_income == 0){
        chart.xgrids([{value: combined_income, text:"Combined income / Person 1 income"}]);
    }
    else{
        chart.xgrids([{value: p1_income, text:'Your income'},{value: p2_income, text:"Your partner's income"},{value: combined_income, text:"Combined income"}]);
    }

    /* Move points */
    chart.load({columns: [ ['x_point1', p1_income] , ['point1', p1_eitc], ['x_point2', p2_income], ['point2', p2_eitc], ['x_point_married', combined_income], ['point_married', married_eitc], ] });

    /* Move stacked eitc value curves */
    penalty = combined_eitc - married_eitc;
    if(penalty == 0){ //exact values sometimes does not equal zero because income threshold values are rounded to the nearest whole number (I've put a $20 buffer but the actual discrepancy is a small fraction of a dollar)
        chart.hide(['combined_eitc', 'bonus_eitc', 'married_eitc', 'penalty_eitc']);
        chart.ygrids([{value: 0}, {value: married_eitc, text: "Combined Individual EITC's/Married EITC"}]);
    }
    else if(penalty > 0){
        chart.ygrids([{value: 0}, {value: combined_eitc, text: "Combined individual EITC's"}, {value: married_eitc, text: "Your married EITC", y_position: 'below'}]);
        chart.show(['married_eitc',  'penalty_eitc']);
        chart.hide(['combined_eitc', 'bonus_eitc']);
        chart.load({
            columns: [
                ['x_horizontal',  0,           120000],
                ['married_eitc',  married_eitc, married_eitc],
                ['penalty_eitc',  penalty,     penalty],
            ]
        });
    }
    else{
        chart.ygrids([{value: 0}, {value: married_eitc, text: "Your married EITC"}, {value: combined_eitc, text: "Combined individual EITC's", y_position: 'below'}]);
        chart.hide(['married_eitc',  'penalty_eitc']);
        chart.show(['combined_eitc', 'bonus_eitc']);
        chart.load({
            columns: [
                ['x_horizontal',  0, 120000],
                ['combined_eitc', combined_eitc, combined_eitc],
                ['bonus_eitc',    penalty * -1,  penalty * -1],
            ]
        });
    }

    /* Adjust chart x-axis max in case combined income exceeds current x-axis max */
    if(combined_income > 60000 && combined_income <80000){
        chart.axis.max({x: 80000});
    }
    else if(combined_income >= 80000 && combined_income <100000){
        chart.axis.max({x: 100000});
    }
    else if(combined_income >= 100000){
        chart.axis.max({x: 120000});
    }
    else{
        chart.axis.max({x: 60000});
    }
    
    /* Adjust chart y-axis max in case combined income exceeds current y-axis max */
    eitc_marriage_penalty_intuitive_adjust_y_axis(chart, p1_children, p2_children, combined_eitc);
}

function eitc_marriage_penalty_intuitive_adjust_y_axis(chart, p1_children, p2_children, combined_eitc){
    // adjust y-axis labels
    if(p1_children === 'none' && p2_children === 'none'){
        chart.internal.config.axis_y_tick_values = [0, 200, 400, 600, 800, 1000];
    }
    else{
        chart.internal.config.axis_y_tick_values = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000];
    }

    /* Baseline axis max: $1,000*/
    if(p1_children === 'none' && p2_children === 'none'){
        if(combined_eitc > 950){
            chart.axis.max({y: 1200});
        }
        else{
            chart.axis.max({y: 1000});
        }
    }
    /* Baseline axis max: $5,000*/
    else if((p1_children === 'one' && p2_children === 'none') || (p1_children === 'none' && p2_children === 'one')){
        chart.axis.max({y: 5000});
    }
    /* Baseline axis max: $7,000 */
    else if((p1_children === 'two' && p2_children === 'none') || (p1_children === 'none' && p2_children === 'two')){
        if(combined_eitc > 6500){
            chart.axis.max({y: 7200});
        }
        else{
            chart.axis.max({y: 7000});
        }
    }
    /* Basline axis max: $8,000*/
    else{
        if(combined_eitc > 7700 && combined_eitc <=8700){
            chart.axis.max({y: 9000});
        }
        else if(combined_eitc > 8700 && combined_eitc <= 9700){
            chart.axis.max({y: 10000});
        }
        else if(combined_eitc > 9700 && combined_eitc <= 10600){
            chart.axis.max({y: 11000});
        }
        else if(combined_eitc > 10600 && combined_eitc <= 11600){
            chart.axis.max({y: 12000});
        }
        else if(combined_eitc > 11600 && combined_eitc <= 12600){
            chart.axis.max({y: 13000});
        }
        else if(combined_eitc > 12600){
            chart.axis.max({y: 15000});
        }
        else{
            chart.axis.max({y: 8000});
        }
    }
}