function top_modify_income(){
    income        = top_income.value;
    filing_status = top_filing_status.value;
    num_children  = top_num_children.value;

    top_chart.xgrids([{value: income, text:'Your income'}]);
    top_chart.load({
        columns: [
            ['x_point', income],
            ['point_credit_amount', cdcc_amount_2023(income, filing_status, num_children)],
            ['point_credit_rate', cdcc_rate(income)],
        ]
    });
}

function top_description_generator(){
    let filing_status = capitalize_filing_status(top_filing_status.value);
    let num_children  = cdcc_format_num_children(top_num_children.value);

    document.getElementById('top_title_description').innerHTML = filing_status + ', ' + num_children;
}

function cdcc_format_num_children(num_children){
    if(num_children === 'one'){
        return 'One Child';
    }
    else if(num_children === 'two'){
        return 'Two or More Children'
    }
}

var top_previous_income = 0;
function top_hide_outputs(){
    top_previous_income = top_income.value
    if(top_hide_outputs_switch.checked){
        $('#top_outputs').css('display', 'none');
        $('#top_income_container').css('display', 'none');
        top_chart.xgrids([]);
        top_chart.hide(['point_credit_rate', 'point_credit_amount']);
    }
    else{
        $('#top_outputs').css('display', 'block');
        $('#top_income_container').css('display', 'block');
        top_chart.xgrids([{value: top_previous_income, text: "Your income"}]);
        top_chart.show(['point_credit_rate', 'point_credit_amount']);
    }
}