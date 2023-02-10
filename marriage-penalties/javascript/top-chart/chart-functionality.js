/* Power Users: Reveals the arbitrary income input */
function show_arbitrary_income(){
    if(arbitrary_income_switch.checked){
        document.getElementById('person1_arbitrary_income_container').style.display = 'block';
        document.getElementById('person2_arbitrary_income_container').style.display = 'block';
        top_chart_person1_income.step = "1";
        top_chart_person2_income.step = "1";
    }
    else{
        document.getElementById('person1_arbitrary_income_container').style.display = 'none';
        document.getElementById('person2_arbitrary_income_container').style.display = 'none';
        top_chart_person1_income.step = "1000";
        top_chart_person2_income.step = "1000";
    }
}

/* Power Users: Adjusts the income slider if arbitrary input box is adjusted */
function arbitrary_income_input(){
    person1Income = person1_arbitray_income.value;
    person2Income = person2_arbitray_income.value;

    top_chart_person1_income.value = person1Income;
    top_chart_person1_income_output.innerText = person1Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    top_chart_person2_income.value = person2Income;
    top_chart_person2_income_output.innerText = person2Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/* Power Users: adjusts arbitrary input box if income slider is moved */
function adjust_arbitrary_income(){
    person1_arbitray_income.value = top_chart_person1_income.value;
    person2_arbitray_income.value = top_chart_person2_income.value;
}

var top_chart_current_income = 0;
function top_chart_hide_outputs(){
    top_chart_current_income = top_chart_person1_income.value;
    if(top_chart_hide_outputs_switch.checked){
        $('#top_chart_outputs').css('display', 'none');
        $('#top_chart_person1_income_container').css('display', 'none');
        top_chart_chart.xgrids([]);
        top_chart_chart.hide(['values_point']);
    }
    else {
        $('#top_chart_outputs').css('display', 'block');
        $('#top_chart_person1_income_container').css('display', 'block');
        top_chart_chart.xgrids([{value: top_chart_current_income, text: 'Your income'}]);
        top_chart_chart.show(['values_point']);
    }
}

function top_chart_description_generator(){
    let policies_active = "";
    if(isActive['eitc'] && isActive['hoh']){
        policies_active = "EITC & HOH";
    }
    else if(isActive['eitc']){
        policies_active = "EITC";
    }
    else if(isActive['hoh']){
        policies_active = "Head of Household";
    }
    document.getElementById('top_chart_title').innerHTML = policies_active + " Marriage Penalties (2023)";

    // Intutive chart
    if(top_chart_chart_type.value === 'intuitive'){
        if(isActive['eitc']){
            marriage_penalty_description_generator('top_chart', 'eitc');
        }
        else if(isActive['hoh']){
            marriage_penalty_description_generator('top_chart', 'tax');
        }
        return;
    }

    // Values chart
    let person1_children = capitalize_num_children(top_chart_person1_children.value);
    let person2_children = capitalize_num_children(top_chart_person2_children.value);
    let person1_filing_status = capitalize_filing_status(top_chart_person1_filing_status.value);
    let person2_filing_status = capitalize_filing_status(top_chart_person2_filing_status.value);
    let person2_income = top_chart_person2_income.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if(isActive['eitc'] && isActive['hoh']){
        document.getElementById('top_chart_title_description').innerHTML = "Marriage Penalties Incurred by a " + person1_filing_status + " with " + person1_children + "<br>When Their Partner is a " + person2_filing_status + " with " + person2_children + " and an Income Fixed at $" + person2_income;
    }
    else if(isActive['eitc']){
        document.getElementById('top_chart_title_description').innerHTML = "Marriage Penalties Incurred by a Person with " + person1_children + "<br>When Their Partner Has " + person2_children + " and an Income Fixed at $" + person2_income;
    }
    else if(isActive['hoh']){
        document.getElementById('top_chart_title_description').innerHTML = "Marriage Penalties Incurred by a " + person1_filing_status + "<br>When Their Partner is a " + person2_filing_status + " with an Income Fixed at $" + person2_income;
    }

}