var policies = {
    1 : {'name' : 'New Policy 1', 'x'  : [0, 0, 5000, 50000, 60000, 1000000], 'y' : [0, 0, 2000, 2000, 0, 0] },
    2 : {'name' : 'New Policy 2', 'x'  : [0, 1000000], 'y': [3000, 3000] },
}

/********* Add Policy *********************************************/
$('.add_policy').mouseover(function(){
    let add_policy_button = this;
});

$('.add_policy').mouseleave(function(){
    let add_policy_button = this;
});

$('.add_policy').click(function(){
    let add_policy_container = this.parentElement.parentElement.parentElement;
    let policy_keys = Object.keys(policies);
    let next_index = 0;
    for(key of policy_keys){
        if(parseInt(key) > next_index){
            next_index = key;
        }
    }
    next_index++;

    // add new policy html element
    let new_policy_text = policy_html_start + next_index + byop_advanced_hmtl_start + next_index + byop_advanced_html_end;
    let new_policy = $(new_policy_text).insertBefore(add_policy_container);

    // focus text area
    let new_policy_textarea = $(new_policy).children()[0].children[0].children[1];
    new_policy_textarea.focus();

    // create new key-value pair in policies object
    let new_name = 'New Policy ' + next_index;
    policies[next_index] = {
        'name' : new_name, 
        'x'    : [0, 1000000],
        'y'    : [3000, 3000],
    };

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

