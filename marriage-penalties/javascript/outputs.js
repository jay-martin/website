/*Default values */
document.getElementById('individual_eitc_values').innerHTML = "Your EITC is worth <b>$2,156</b> and your partner's EITC is worth <b>$496</b>, for a combined EITC of <b>$2,652</b>.";
document.getElementById('married_eitc_value').innerHTML = "With a combined income of $40,000, if you married your EITC would be worth <b>$1,548</b>.";
document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage <em>penalty</em> of <b>$1,104</b>.';

function modify_income_outputs(){
    /*formatting*/
    combined_children = numChildren();
    numberChildren = 'none';
    if(combined_children === 1){numberChildren='one';}
    else if(combined_children === 2){numberChildren='two';}
    else if (combined_children >2){numberChildren='three';}

    /*Calculate benefits and assing to variables*/
    combinedIncome = combined_income_marriage_penalty();
    person1EITC = EITC_benefit('single', myRange_person1.value, person1_children.value);
    person2EITC = EITC_benefit('single', myRange_person2.value, person2_children.value);
    combinedEITC = person1EITC + person2EITC;
    marriedEITC = EITC_benefit('married', combinedIncome, numberChildren);
    
    /* Print updated data to screen*/
    document.getElementById('individual_eitc_values').innerHTML = 'Your EITC is worth <b>$' + person1EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b> and your partner's EITC is worth <b>$" + person2EITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>, for a combined EITC of <b>$" + combinedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    document.getElementById('married_eitc_value').innerHTML = "With a combined income of $" + combinedIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ", if you married your EITC would be worth <b>$" + marriedEITC.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +"</b>.";

    /* Print marriage penalty to screen */
    penalty = combinedEITC - marriedEITC;
    if(penalty < 0){
        bonus = penalty * -1;
        document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage <em>bonus</em> of <b>$' + bonus.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }
    else{
        document.getElementById('marriage_penalty_show').innerHTML = 'You face a marriage <em>penalty</em> of <b>$' + penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</b>.";
    }

    /* Run function to modify chart */
    modify_income_chart(marriedEITC, combinedEITC, penalty, combinedIncome, combined_children);
}

/*
OVERVIEW
*/
function show_explanation1(){
    container = document.getElementById('highlights_container1');
    const height = window.getComputedStyle(container).height;
    if(height === '0px'){
        container.style.height = highlights_heights[0];
    }
    else{
        container.style.height = '0px';
    }
}

/*
MARRIAGE PENALTIES
*/
function show_explanation2(){
    container = document.getElementById('highlights_container2');
    const height = window.getComputedStyle(container).height;
    if(height === '0px'){
        container.style.height = highlights_heights[1];
    }
    else{
        container.style.height = '0px';
    }
}
/*
MARRIAGE BONUSES
*/
function show_explanation3(){
    container = document.getElementById('highlights_container3');
    const height = window.getComputedStyle(container).height;
    if(height === '0px'){
        container.style.height = highlights_heights[2];
        /* This is the bottom button: the bottom border needs to be straightened out after expanding */
        document.getElementById('bottom_button').style.borderBottomRightRadius = '0px';
        document.getElementById('bottom_button').style.borderBottomLeftRadius = '0px';
    }
    else{
        container.style.height = '0px';
        /* This is the bottom button: the bottom border edges need to be smoothed out after contracting */
        document.getElementById('bottom_button').style.borderBottomRightRadius = '5px';
        document.getElementById('bottom_button').style.borderBottomLeftRadius = '5px';
    }
}