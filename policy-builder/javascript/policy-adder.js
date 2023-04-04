var policies = {
    0 : {
        'name' : 'Child Tax Credit',
        'single' : {
            'none'  : {'x' : [0, 1000000], 'y' : [0,0]},
            'one'   : {'x' : [0, 2500, 13167, 13850, 17850, 200000, 240000, 1000000], 'y' : [0, 0, 1600, 1600, 2000, 2000, 0, 0]},
            'two'   : {'x' : [0, 2500, 13850,  23040, 200000, 280000], 'y' : [0, 0, 1702.5, 4000,  4000, 0]},
            'three' : {'x' : [0, 2500, 13850,  24850,  30581, 200000, 320000], 'y' : [0, 0, 1702.5, 4452.5, 6000, 6000, 0]},
        },
        'hoh' : {
            'none'  : {'x' : [0, 1000000], 'y' : [0,0]},
            'one'   : {'x' : [0, 2500, 13167, 20800, 24800, 200000, 240000], 'y' : [0, 0, 1600, 1600, 2000, 2000, 0]},
            'two'   : {'x' : [0, 2500, 20800, 23833,   28800, 200000, 280000], 'y' : [0, 0, 2745, 3503.25, 4000, 4000, 0]},
            'three' : {'x' : [0, 2500, 20800, 33820, 200000, 320000], 'y' : [0, 0, 2745,  6000,  6000, 0]},
        },
        'married' : {
            'none'  : {'x' : [0, 1000000], 'y' : [0,0]},
            'one'   : {'x' : [0, 2500, 13167, 27700, 31700, 400000, 440000], 'y' : [0, 0, 1600,  1600,  2000,  2000, 0]},
            'two'   : {'x' : [0, 2500, 23833, 27700, 35700, 400000, 480000], 'y' : [0, 0, 3200,  3200,  4000,  4000, 0]},
            'three' : {'x' : [0, 2500, 27700, 34500, 39700, 400000, 520000], 'y' : [0, 0, 3780,  5480,  6000,  6000, 0]},
        },
    },
}

/********* Add Policy *********************************************/
$('.add_policy').mouseover(function(){
    $('#policy_adder_dropdown_content').css('visibility', 'visible');
});

$('#add_policy_button_container').mouseleave(function(){
    $('#policy_adder_dropdown_content').css('visibility', 'hidden');
});

$('.policy_select_button').click(function(){
    let add_policy_container = document.getElementById('add_policy_container');
    let policy = this.getAttribute('data-policy');

    // determine next index
    let policy_keys = Object.keys(policies);
    let next_index = 0;
    for(key of policy_keys){
        if(parseInt(key) > next_index){
            next_index = key;
        }
    }
    next_index++;

    if(policy == 'byop-advanced'){
        // add new policy html element
        new_policy_text = policy_html_start + (next_index+1) + byop_advanced_hmtl_start + (next_index+1) + byop_advanced_html_end;
        new_policy = $(new_policy_text).insertBefore(add_policy_container);

        // focus text area
        new_policy_textarea = $(new_policy).children()[0].children[0].children[1];
        new_policy_textarea.focus();

        // create new key-value pair in policies object
        new_name = 'Policy ' + (next_index+1);
        policies[next_index] = {
            'name' : new_name, 
            'x'    : new_byop_advanced_x,
            'y'    : new_byop_advanced_y,
        };
    }
    else if(policy == 'ctc'){
        // add new policy html element
        new_policy_text = policy_html_start + next_index + ctc_html;
        new_policy = $(new_policy_text).insertBefore(add_policy_container);

        // create new key-value pair in policies object
        new_name = 'Child Tax Credit';
        policies[next_index] = ctc_starter_object;
    }
    else if(policy == 'eitc'){
        // add new policy html element
        new_policy_text = policy_html_start + next_index + eitc_html;
        new_policy = $(new_policy_text).insertBefore(add_policy_container);

        // create new key-value pair in policies object
        new_name = 'Earned Income Tax Credit';
        policies[next_index] = eitc_starter_object;
    }
    else if(policy == 'ubi'){
        // add new policy html element
        new_policy_text = policy_html_start + next_index + ubi_html;
        new_policy = $(new_policy_text).insertBefore(add_policy_container);

        // create new key-value pair in policies object
        new_name = 'Universal Basic Income';
        policies[next_index] = ubi_starter_object;
    }
    else if(policy == 'refundable'){
        // add new policy html element
        new_policy_text = policy_html_start + (next_index+1) + refundable_html_start + (next_index+1) + refundable_html_end;
        new_policy = $(new_policy_text).insertBefore(add_policy_container);

        // focus text area
        new_policy_textarea = $(new_policy).children()[0].children[0].children[1];
        new_policy_textarea.focus();

        // create new key-value pair in policies object
        new_name = 'Policy ' + (next_index+1);
        policies[next_index] = refundable_starter_object;
    }

    // update chart
    update_chart_names(next_index, new_name); // must be performed first
    update_charts();
});

/********* Remove Policy *********************************************/
function remove_policy(button){
    let policy_container   = button.parentElement.parentElement.parentElement;
    let current_policy_key = policy_container.getAttribute('policy-key');

    // remove from policies object
    delete policies[current_policy_key];

    // delete html element
    $(policy_container).remove();

    // update chart
    remove_curve(current_policy_key);
}

/********** Type in build-your-own-policy name ********************/
function adjust_name(title){
    auto_grow(title);
    adjust_data_name(title);
}

function auto_grow(title) {
    title.style.height = "18px";
    title.style.height = (title.scrollHeight-8)+"px"; //scrollHeight = 26 when one line
}

function adjust_data_name(title){
    let policy     = title.parentElement.parentElement.parentElement;
    let policy_key = policy.getAttribute('policy-key');
    let new_name   = title.value;

    // adjust name in policies object
    policies[policy_key]['name'] = new_name; 

    // update chart legends
    update_chart_names(policy_key, new_name); // must be performed first
    update_charts();
}

/********** Adjust chart sizes ********************/
function make_charts_small(){
    if(chart_size_input.value == 'small'){
        benefits_chart.resize({
            height: 240,
            width: 400,
        });
        summed_benefits_chart.resize({
            height: 240,
            width: 400,
        });
        marginal_tax_chart.resize({
            height: 240,
            width: 400,
        });
        marriage_penalty_chart.resize({
            height: 240,
            width: 400,
        });
        $('.chart_container').css('width', '850px');
    }
    else{
        $('.chart_container').css('width', 'auto');
        benefits_chart.resize({
            height: 320,
            width: undefined,
        });
        summed_benefits_chart.resize({
            height: 320,
            width: undefined,
        });
        marginal_tax_chart.resize({
            height: 320,
            width: undefined,
        });
        marriage_penalty_chart.resize({
            height: 320,
            width: undefined,
        });
    }
}

