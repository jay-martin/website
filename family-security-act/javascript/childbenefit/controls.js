function adjust_child_benefit_chart(){
    if(fsa1_or_2_CA.value==="one"){
        adjust_child_benefit_chart_fsa_1(child_benefit_filing_status.value, child_benefit_young_children.value, child_benefit_old_children.value);
    }
    else{
        adjust_child_benefit_chart_fsa_2(child_benefit_filing_status.value, child_benefit_young_children.value, child_benefit_old_children.value);
    }
    child_benefit_modify_income();
}

/* Moves the income slider */
function child_benefit_modify_income(){
    let income = child_benefit_income.value;
    child_benefit_chart.xgrids([{value: income, text:'Your income'}]);

    numYoung = num_young(child_benefit_young_children.value);
    numOld = num_old(child_benefit_old_children.value);
    benefits = child_benefit_difference(income, child_benefit_filing_status.value, numYoung, numOld, fsa1_or_2_CA.value);

    let fsa_benefit = benefits[0];
    let current_benefit = benefits[1];
    let difference = benefits[2];

    child_benefit_chart.load({
        columns: [
            ['x_point', income],
            ['fsa_point', fsa_benefit],
            ['current_point', current_benefit],
            ['difference_point', difference],
        ]
    });

}

function child_benefit_description_generator(){
    let filing_status  = capitalize_filing_status(child_benefit_filing_status.value);
    let old_children   = capitalize_num_children(child_benefit_old_children.value);
    let young_children = capitalize_num_children(child_benefit_young_children.value);

    // Generate description based on current user inputs
    document.getElementById('child_benefit_title_description').innerHTML = filing_status + ", " + old_children + " Age 6–17 and " + young_children + " Age 0–5";

    // Generate title based on whether FSA 1.0 or 2.0
    if(child_benefit_screenshot_mode_switch.checked == false){
        document.getElementById('child_benefit_title').innerHTML = 'The Family Security Act: Child Benefit';
    }
    else if(fsa1_or_2_CA.value == 'one'){
        document.getElementById('child_benefit_title').innerHTML = 'The Family Security Act 1.0:<br>Child Benefit';
    }
    else {
        document.getElementById('child_benefit_title').innerHTML = 'The Family Security Act 2.0:<br>Child Benefit';
    }
}
