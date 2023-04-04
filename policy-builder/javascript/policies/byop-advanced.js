const new_byop_advanced_x = [0,    1000000];
const new_byop_advanced_y = [3000, 3000];

/*************************** Update Points *********************************/
function update_point(input){
    let policy_container = input.parentElement.parentElement.parentElement.parentElement.parentElement;
    let policy_key       = policy_container.getAttribute('policy-key');
    let policy           = policies[policy_key];

    let point_container = input.parentElement.parentElement.parentElement;
    let index           = point_container.getAttribute('data-index');

    // check index for 'end'
    if(index == 'end'){
        index = policy['x'].length - 1;
    }

    // update values
    let data_type = input.getAttribute('data-value_type');
    policy[data_type][index] = parseInt(input.value);

    // update charts
    update_charts();
}

/*************************** Add/Remove Points ******************************/
function point_button_click(button){
    let button_classes = $(button).attr("class");
    if(button_classes.search('plus_button') > 0){
        add_point(button);
    }
    else if(button_classes.search('minus_button') > 0){
        remove_point(button);
    }
}

function add_point(button){
    let policy_container = button.parentElement.parentElement.parentElement;
    let policy_key       = policy_container.getAttribute('policy-key');
    let policy           = policies[policy_key];

    let point_container = button.parentElement;
    let index           = point_container.getAttribute('data-index');

    // new x and y values
    let index_value = policy['x'].length - 2;
    let new_x_value = policy['x'][index_value] + 100; // new x-value (income) equals previous x value plus $100
    let new_y_value = policy['y'][index_value];       // new y-value (benefit value) equals previous y value

    // add point to policy array
    policy['x'].splice(index_value+1, 0, new_x_value);
    policy['y'].splice(index_value+1, 0, new_y_value);

    // update input element values
    let income_input   = button.nextElementSibling.children[0].children[0];
    income_input.value = new_x_value;
    let value_input    = button.nextElementSibling.children[1].children[0];
    value_input.value  = new_y_value;

    // adjust allowed income values on income input
    income_input.min = new_x_value;

    // relevant html elements
    let point_inputs_container = button.nextElementSibling;
    let income_inputs          = point_inputs_container.children;

    // make inputs visible & change border to solid
    $(income_inputs).removeClass('hidden');
    $(point_inputs_container).removeClass('dashed-border');

    // change button from plus to minus symbol
    $(button).removeClass('plus_button').addClass('minus_button');

    // add new "add point" element below
    let next_index       = parseInt(index) + 1;
    let new_element_text = point_element_start + next_index + point_element_end;
    $(new_element_text).insertAfter(point_container);

    // update charts
    update_charts();
}

function remove_point(button){
    let policy_container = button.parentElement.parentElement.parentElement;
    let policy_key       = policy_container.getAttribute('policy-key');
    let policy           = policies[policy_key];

    let point_container = button.parentElement;
    let index           = point_container.getAttribute('data-index');

    // remove point
    policy['x'].splice(index, 1);
    policy['y'].splice(index, 1);

    // adjust data-index values
    let all_points = button.parentElement.parentElement.children;
    let current_point_index = 0; 
    for(points_container of all_points){
        current_point_index = points_container.getAttribute('data-index');
        if(current_point_index > index && current_point_index !== 'end'){
            points_container.setAttribute('data-index', current_point_index - 1);
        }
    }

    // destroy html element
    $(button.parentElement).remove();

    // update charts
    update_charts();
}

/*************************** Point HTML ******************************/
const point_element_start = 
`<div class='point_container' data-name='New Policy 2' data-index='`;

const point_element_end =
`'>
<button class="policy_button plus_button" onclick='point_button_click(this)'></button>
<div class='point_inputs_container dashed-border'>
    <label class='hidden'>Income:
      $<input type="number" min="0" max="1000000" step="100" value="1000000" data-value_type='x' oninput="update_point(this);">
    </label>
    <label class='hidden'>Value:
      $<input type="number" min="0" max="1000000" step="100" value="3000" data-value_type='y' oninput="update_point(this);">
    </label> 
</div>  
</div>`;


/************************* BYOP: Advanced HTML **************************/
const policy_html_start = `<div class='policy' policy-key='`;

const byop_advanced_hmtl_start = `'>
    <div class='policy_left_side'>
        <div class='button_label_container'>
          <button class="policy_button minus_button" onclick="remove_policy(this)"></button>
          <textarea class='byop_policy_label' cols="40" rows="1" oninput='adjust_name(this);'>New Policy `;

const byop_advanced_html_end = `</textarea>
        </div>
    </div>

    <div class='policy_points_right_side'>

        <div class='point_container' data-index="0">
          <div class='endpoints'></div>  
          <div class='point_inputs_container'>
            <label>Income:
              $<input type="number" min="0" max="1000000" step="100" value="0" data-value_type='x' oninput="update_point(this);" disabled>
            </label>
            <label>Value:
              $<input type="number" min="0" max="1000000" step="100" value="3000" data-value_type='y' oninput="update_point(this);">
            </label>
          </div>
        </div>
        <div class='point_container' data-index="1">
          <button class="policy_button plus_button" onclick='point_button_click(this)'></button>
          <div class='point_inputs_container dashed-border'>
            <label class='hidden'>Income:
              $<input type="number" min="0" max="1000000" step="100" value="1000000" data-value_type='x' oninput="update_point(this);">
            </label>
            <label class='hidden'>Value:
              $<input type="number" min="0" max="1000000" step="100" value="3000" data-value_type='y' oninput="update_point(this);">
            </label> 
          </div>  
        </div>
        <div class='point_container' data-index="end">
          <div class="endpoints"></div> 
          <div class='point_inputs_container'>
            <label>Income:
              $<input type="number" min="0" max="1000000" step="100" value="1000000" data-value_type='x' oninput="update_point(this);" disabled>
            </label>
            <label>Value:
              $<input type="number" min="0" max="1000000" step="100" value="3000" data-value_type='y' oninput="update_point(this);">
            </label> 
          </div>
        </div>

    </div> <!-- right side -->

</div> <!-- policy container --> `;






