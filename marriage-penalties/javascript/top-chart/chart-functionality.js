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