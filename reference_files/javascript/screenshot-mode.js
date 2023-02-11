/*********************************** Controls *********************************************************************************************************/
/** Opens and closes the notes section below a chart
 * @param {string} - base name of chart ('top', 'eitc' etc.)
 * @param {string} - One of three chart types: 'basic', 'regressive', 'marriage penalty'
 * @param {array of strings} - array containing the variable names of the c3.js points on the chart
 * @param {string} - variable name of the income input that may need to be hidden
 * @param {bool} - whether the chart is the top chart
 * */
function screenshot_mode(chart_name, chart_type, points, income_id, is_top_chart){
    base_screenshot_mode_functionality(chart_name, is_top_chart);
    if(chart_type === 'basic'){
        basic_chart_screenshot_mode(chart_name, points, income_id);
    }
    else if(chart_type === 'marriage_penalty'){
        marriage_penalty_screenshot_mode(chart_name, points, income_id, is_top_chart);
    }
    else if(chart_type === 'exclusion'){
        exclusion_chart_screenshot_mode(chart_name, points);
    }
}

/*********************************** Base Functionality ***************************************************************************************************/
function base_screenshot_mode_functionality(chart_name, is_top_chart){
    let switch_is_checked    = eval(chart_name + '_screenshot_mode_switch').checked;
    let hide_outputs_switch  = '#' + chart_name + '_hide_outputs_switch';
    let hide_outputs_switch_container = '#' + chart_name + '_hide_outputs_switch_container';

    let chart                = eval(chart_name + '_chart');
    let chart_container      = '#' + chart_name + '_container';
    let title_id             = '#' + chart_name + '_title';
    let title_description_id = '#' + chart_name + '_title_description';
    let inputs_id            = '#' + chart_name + '_inputs';
    let outputs_id           = '#' + chart_name + '_outputs';
    let logo_id              = '#' + chart_name + '_logo';
    let options_container_id = '#' + chart_name + '_options_container';

    // Desktop elements
    let border_wrapper = '#' + chart_name + '_screenshot_wrapper';
    let screenshot_frame_switch = '#' + chart_name + '_screenshot_frame_switch_container'

    if(switch_is_checked){
        // disable switch
        $(hide_outputs_switch).prop('disabled', true);

        // Hide inputs and outputs
        $(outputs_id).css('display', 'none');
        $(inputs_id).css('display', 'none');

        // Display title and caption
        $(title_id).css('display', 'block');
        $(title_description_id).css('display', 'block');

        // Show logo
        $(logo_id).css('display', 'grid');

        // Hide/Adjust page elements
        $(chart_container).css('border', 'none');
        $(hide_outputs_switch_container).css('display', 'none');
        if(is_top_chart){
          //$('.other_pages').css('display', 'none');
          $('.highlights').css('display', 'none');
        }
        else if(is_top_chart == false){
          $(title_id).css('text-decoration', 'none');
          $(title_id).css('margin-bottom', '0');
        }

        // screenshot wrapper if on desktop
        if(window.innerWidth > 900){
            $(screenshot_frame_switch).css('display', 'inline-block');
            if($('#' + chart_name + '_hide_screenshot_frame_switch').prop('checked') == false){
                $(border_wrapper).css('border', 'dashed');
                $(border_wrapper).css('padding-left', '10px');
                $(border_wrapper).css('padding-right', '5px');
                $(border_wrapper).css('padding-top', '5px');
                $(chart_container).css('padding', '0');
            }
        }
        else{
            // push down chart options
            $(options_container_id).css('margin-top', '40px');
        }
    }
    else {
        // enable outputs switch
        $(hide_outputs_switch).prop('disabled', false);

        // Hide caption
        $(title_description_id).css('display', 'none');

        // Hide logo
        $(logo_id).css('display', 'none');

        // Show/Adjust page elements
        $(chart_container).css('border', 'solid');
        $(border_wrapper).css('border', 'none');
        $(hide_outputs_switch_container).css('display', 'inline-block');
        $(screenshot_frame_switch).css('display', 'none');
        $(options_container_id).css('margin-top', '10px');
        $(border_wrapper).css('padding-left', '0px');
        $(border_wrapper).css('padding-right', '0px');
        $(border_wrapper).css('padding-top', '0px');
        $(chart_container).css('padding', '10px');

        if(is_top_chart){
          $('.other_pages').css('display', 'block');
          $('.highlights').css('display', 'block');
          $(title_id).css('display', 'none');
        }
        else if(is_top_chart == false){
          $(title_id).css('text-decoration', 'underline');
          $(title_id).css('margin-bottom', '7.5px');
        }

        // show inputs/outputs
        if($(hide_outputs_switch).prop('checked')){
          $(inputs_id).css('display', 'block');
        }
        else{
          $(outputs_id).css('display', 'block');
          $(inputs_id).css('display', 'block');
        }
    }
}

/*********************************** Basic Chart ***************************************************************************************************************/
function basic_chart_screenshot_mode(chart_name, points, income_id){
    let chart = eval(chart_name + '_chart');
    let switch_is_checked    = eval(chart_name + '_screenshot_mode_switch').checked;
    let hide_outputs_switch  = '#' + chart_name + '_hide_outputs_switch';
    let income = eval(income_id).value;

    if(switch_is_checked){
        // Hide chart points and income slider
        chart.hide(points);
        chart.xgrids([]);
    }
    else{
        if($(hide_outputs_switch).prop('checked')){
            //do nothing
        }
        else {
          // Show chart points and income slider
          chart.show(points);
          chart.xgrids([{value: income, text: 'Your income'}]);
        }
    }
}

/*********************************** Exclusion Chart ***************************************************************************************************************/
function exclusion_chart_screenshot_mode(chart_name, difference_line){
    let chart = eval(chart_name + '_chart');
    let switch_is_checked    = eval(chart_name + '_screenshot_mode_switch').checked;
    let hide_outputs_switch  = '#' + chart_name + '_hide_outputs_switch';

    if(switch_is_checked){
        // Hide chart points
        chart.hide(difference_line);
    }
    else{
        if($(hide_outputs_switch).prop('checked')){
            //do nothing
        }
        else {
          // Show difference file
          chart.show(difference_line);
        }
    }
}

/*********************************** Marriage Penalties Chart ***************************************************************************************************/
function marriage_penalty_screenshot_mode(chart_name, points, income_id, is_top_chart){
    let current_chart_type = eval(chart_name + '_chart_type').value;
    if(current_chart_type === 'intuitive'){
        // nothing needs to be done
    }
    else if(current_chart_type === 'values'){
        basic_chart_screenshot_mode(chart_name, points, income_id, is_top_chart);
    }
}

function marriage_penalty_description_generator(chart_name, program){
    let current_chart_type = eval(chart_name + '_chart_type').value;
    if(current_chart_type === 'intuitive'){
        if(program === 'tax'){
          intuitive_tax_marriage_penalty_description_generator(chart_name);
        }
        else if(program === 'eitc'){
          intuitive_eitc_marriage_penalty_description_generator(chart_name);
        }
    }
    else if(current_chart_type === 'values'){
        if(program === 'tax'){
          values_tax_marriage_penalty_description_generator(chart_name);
        }
        else if(program === 'eitc'){
          values_eitc_marriage_penalty_description_generator(chart_name);
        }
    }
}

function values_tax_marriage_penalty_description_generator(chart_name){
    let person_1_filing_status = capitalize_filing_status(eval(chart_name + '_person1_filing_status').value);
    let person_2_filing_status = capitalize_filing_status(eval(chart_name + '_person2_filing_status').value);
    let person2_income         = eval(chart_name + '_person2_income').value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if(person_1_filing_status === 'Single Filer' && person_2_filing_status === 'Single Filer'){
        document.getElementById(chart_name + '_title_description').innerHTML = "Marriage Bonuses Incurred by a Single Filer<br>When Their Parter is a Single Filer with an Income Fixed at $" + person2_income;
    }
    else{
        document.getElementById(chart_name + '_title_description').innerHTML = "Marriage Penalties Incurred by a " + person_1_filing_status + "<br>When Their Parter is a " + person_2_filing_status + " with an Income Fixed at $" + person2_income;
    }
}

function values_eitc_marriage_penalty_description_generator(chart_name){
    let person1_children = capitalize_num_children(eval(chart_name + '_person1_children').value);
    let person2_children = capitalize_num_children(eval(chart_name + '_person2_children').value);
    let person2_income   = eval(chart_name + '_person2_income').value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    document.getElementById(chart_name + '_title_description').innerHTML = "Marriage Penalties Incurred by a Person with " + person1_children + "When Their Partner Has " + person2_children + " and an Income Fixed at $" + person2_income;
}

function intuitive_tax_marriage_penalty_description_generator(chart_name){
    let person_1_filing_status = no_capitalize_format_filing_status(eval(chart_name + '_person1_filing_status').value);
    let person_2_filing_status = no_capitalize_format_filing_status(eval(chart_name + '_person2_filing_status').value);
    let person1_income         = eval(chart_name + '_person1_income').value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let person2_income         = eval(chart_name + '_person2_income').value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let combined_income        = parseInt(eval(chart_name + '_person1_income').value) + parseInt(eval(chart_name + '_person2_income').value);

    let marriage_penalty       = tax_liability_2023('married', combined_income) - tax_liability_2023(eval(chart_name + '_person1_filing_status').value, eval(chart_name + '_person1_income').value) - tax_liability_2023(eval(chart_name + '_person2_filing_status').value, eval(chart_name + '_person2_income').value);
    let penalty_or_bonus_text  = 'marriage penalty';
    if(marriage_penalty < 0){
        marriage_penalty = marriage_penalty * -1;
        penalty_or_bonus_text = 'marriage bonus';
    }

    if( (person_1_filing_status === 'single filer' && person_2_filing_status === 'single filer') ){
        output_string = 'Two single filers with incomes of $' + person1_income + ' and $' + person2_income + ', respectively, incur a ' + penalty_or_bonus_text + ' of $' + marriage_penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else if((person_1_filing_status === 'head of household' && person_2_filing_status === 'head of household')){
        output_string = 'Two heads of households with incomes of $' + person1_income + ' and $' + person2_income + ', respectively, incur a ' + penalty_or_bonus_text + ' of $' + marriage_penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else {
        output_string = 'A ' + person_1_filing_status + ' with an income of $' + person1_income + ' and a ' + person_2_filing_status + ' with an income of $' + person2_income + ' incur a ' + penalty_or_bonus_text + ' of $' + marriage_penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    document.getElementById(chart_name + '_title_description').innerHTML = output_string;
}

function intuitive_eitc_marriage_penalty_description_generator(chart_name){
    let person1_children  = no_capitalize_format_num_children(eval(chart_name + '_person1_children').value);
    let person2_children  = no_capitalize_format_num_children(eval(chart_name + '_person2_children').value);
    let combined_children = sum_children(eval(chart_name + '_person1_children'), eval(chart_name + '_person2_children'))
    let person1_income    = eval(chart_name + '_person1_income').value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let person2_income    = eval(chart_name + '_person2_income').value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let combined_income   = parseInt(eval(chart_name + '_person1_income').value) + parseInt(eval(chart_name + '_person2_income').value);

    let marriage_penalty       = eitc_value_2023(combined_income, 'married', combined_children) - eitc_value_2023(eval(chart_name + '_person1_income').value, 'single', eval(chart_name + '_person1_children').value) - eitc_value_2023(eval(chart_name + '_person2_income').value, 'single', eval(chart_name + '_person2_children').value);
    let penalty_or_bonus_text  = 'marriage penalty';
    if(marriage_penalty < 0){
        marriage_penalty = marriage_penalty * -1;
        penalty_or_bonus_text = 'marriage bonus';
    }

    document.getElementById(chart_name + '_title_description').innerHTML = 'A person with ' + person1_children + ' and an income of $' + person1_income + ' and a person with ' + person2_children + ' and an income of $' + person2_income + ' incur a ' + penalty_or_bonus_text + ' of $' + marriage_penalty.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


/*********************************** Additional Functions ********************************************************************************************/
// Hides/Shows the desktop screenshot frame guide
function hide_screenshot_frame_guide(chart_name){
    let switch_is_checked = eval(chart_name + '_hide_screenshot_frame_switch').checked;
    let frame             = '#' + chart_name + '_screenshot_wrapper';

    if(switch_is_checked){
        $(frame).css('border', 'none');
    }
    else {
        $(frame).css('border', 'dashed');
    }
}

// Used for auto-generating chart caption
function capitalize_num_children(num_children){
    if(num_children === 'none'){
        return 'No Children';
    }
    else if(num_children === 'one'){
        return 'One Child';
    }
    else if(num_children === 'two'){
        return 'Two Children';
    }
    else if(num_children === 'three'){
        return 'Three Children';
    }
}

function capitalize_filing_status(filing_status){
    if(filing_status === 'married'){
        return 'Married Filing Jointly';
    }
    else if(filing_status === 'hoh'){
        return 'Head of Household'
    }
    else if(filing_status === 'single'){
        return 'Single Filer'
    }
}

function no_capitalize_format_num_children(num_children){
    if(num_children === 'none'){
        return 'no children';
    }
    else if(num_children === 'one'){
        return 'one child';
    }
    else if(num_children === 'two'){
        return 'two children';
    }
    else if(num_children === 'three'){
        return 'three children';
    }
}

function no_capitalize_format_filing_status(filing_status){
    if(filing_status === 'married'){
        return 'married filing jointly';
    }
    else if(filing_status === 'hoh'){
        return 'head of household'
    }
    else if(filing_status === 'single'){
        return 'single filer'
    }
}

