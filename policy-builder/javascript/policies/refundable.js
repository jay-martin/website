function update_refundable(input){
	// html elements
	let policy_container            = input.parentElement.parentElement.parentElement.parentElement;
	let auto_adjust_container       = policy_container.children[1].children[0];
	let credit_value_container      = policy_container.children[1].children[1];
	let phase_in_container          = policy_container.children[1].children[2];
	let phase_out_container         = policy_container.children[1].children[3];
	let child_options_container     = policy_container.children[1].children[4];
	let child_adjustments_container = policy_container.children[1].children[5];
	let policy_key                  = policy_container.getAttribute('policy-key');

	// auto-adjust single-married values
	refundable_check_married_credit_value(policy_container.children[1]);

	// input values
	let single_credit_value      = parseInt(credit_value_container.children[0].children[0].value);
	let married_credit_value     = parseInt(credit_value_container.children[1].children[0].value)
	let refund_threshold         = parseInt(phase_in_container.children[1].children[0].value);
	let phase_in_rate            = parseFloat(phase_in_container.children[2].children[0].value) / 100;
	let single_phase_out_begins  = parseInt(phase_out_container.children[1].children[0].value);
	let married_phase_out_begins = parseInt(phase_out_container.children[2].children[0].value);
	let phase_out_rate           = parseFloat(phase_out_container.children[3].children[0].value) / 100;

	// child adjustments
	let is_adjusted_for_children = child_options_container.children[0].children[0].checked;
	let is_scaled_automatically  = child_options_container.children[1].children[0].checked;
	refundable_auto_adjust_child_adjustments(child_adjustments_container, is_adjusted_for_children, is_scaled_automatically, single_credit_value);

	// child adjustment values
	let one_child_adjustment   = parseInt(child_adjustments_container.children[0].children[0].value);
	let two_child_adjustment   = parseInt(child_adjustments_container.children[1].children[0].value);
	let three_child_adjustment = parseInt(child_adjustments_container.children[2].children[0].value);
	let child_adjustments      = [0, one_child_adjustment, two_child_adjustment, three_child_adjustment];

	// phased in and phased out?
	let is_phased_in  = phase_in_container.children[0].children[0].checked;
	let is_phased_out = phase_out_container.children[0].children[0].checked;
	
	// update policies object
	policies[policy_key] = get_refundable_policy_object(is_phased_in, is_phased_out, single_credit_value, married_credit_value, refund_threshold, phase_in_rate, single_phase_out_begins, married_phase_out_begins, phase_out_rate, child_adjustments);

    // update charts
    update_charts();
}

function get_refundable_policy_object(is_phased_in, is_phased_out, single_credit_value, married_credit_value, refund_threshold, phase_in_rate, single_phase_out_begins, married_phase_out_begins, phase_out_rate, child_adjustments){
	// get x-y values
	let single_none   = get_refundable_values(is_phased_in, is_phased_out, single_credit_value + child_adjustments[0], refund_threshold, phase_in_rate, single_phase_out_begins, phase_out_rate);
	let single_one    = get_refundable_values(is_phased_in, is_phased_out, single_credit_value + child_adjustments[1], refund_threshold, phase_in_rate, single_phase_out_begins, phase_out_rate);
	let single_two    = get_refundable_values(is_phased_in, is_phased_out, single_credit_value + child_adjustments[2], refund_threshold, phase_in_rate, single_phase_out_begins, phase_out_rate);
	let single_three  = get_refundable_values(is_phased_in, is_phased_out, single_credit_value + child_adjustments[3], refund_threshold, phase_in_rate, single_phase_out_begins, phase_out_rate);
	let married_none  = get_refundable_values(is_phased_in, is_phased_out, married_credit_value + child_adjustments[1], refund_threshold, phase_in_rate, married_phase_out_begins, phase_out_rate);
	let married_one   = get_refundable_values(is_phased_in, is_phased_out, married_credit_value + child_adjustments[2], refund_threshold, phase_in_rate, married_phase_out_begins, phase_out_rate);
	let married_two   = get_refundable_values(is_phased_in, is_phased_out, married_credit_value + child_adjustments[3], refund_threshold, phase_in_rate, married_phase_out_begins, phase_out_rate);
	let married_three = get_refundable_values(is_phased_in, is_phased_out, married_credit_value + child_adjustments[4], refund_threshold, phase_in_rate, married_phase_out_begins, phase_out_rate);

	return {
		'name' : 'Refundable 1',
        'single' : {
            'none'  : single_none,
            'one'   : single_one,
            'two'   : single_two,
            'three' : single_three,
        },
        'hoh' : {
            'none'  : single_none,
            'one'   : single_one,
            'two'   : single_two,
            'three' : single_three,
        },
        'married' : {
            'none'  : married_none,
            'one'   : married_one,
            'two'   : married_two,
            'three' : married_three,
        },
	}
}

function get_refundable_values(is_phased_in, is_phased_out, credit_value, refund_threshold, phase_in_rate, phase_out_begins, phase_out_rate){
	let x_vals = [], y_vals = [];

	if(is_phased_in){
		// $0 ------> refund threshold
		x_vals.push(0, refund_threshold);
		y_vals.push(0, 0);

		// refund threshold ------> end of phase-in
		end_of_phase_in = credit_value / phase_in_rate + refund_threshold;
		x_vals.push(end_of_phase_in);
		y_vals.push(credit_value);
	}
	else{
		// value @ income=$0
		x_vals.push(0, 0, 0); //added multiple times to make c3.js line animation smoother
		y_vals.push(credit_value, credit_value, credit_value);
	}

	if(is_phased_out){
		// end of phase-in -------> end of plateau
		x_vals.push(phase_out_begins);
		y_vals.push(credit_value);

		// end of plateau -------> end of phaseout
		end_of_phase_out = credit_value / phase_out_rate + phase_out_begins;
		x_vals.push(end_of_phase_out);
		y_vals.push(0);

		// end of phaseout -------> $1,000,000
		x_vals.push(1000000);
		y_vals.push(0);
	}
	else{
		// value @ income = $1,000,000
		x_vals.push(1000000, 1000000, 1000000);
		y_vals.push(credit_value, credit_value, credit_value);
	}

	return {'x' : x_vals, 'y' : y_vals};
}

/********************************************** Check Improper Values *****************************************************************************************************/
function refundable_check_married_credit_value(policy_inputs_container){
	let credit_value_container     = policy_inputs_container.children[1];
	let single_credit_value        = parseInt(credit_value_container.children[0].children[0].value);
	let married_credit_value_input = credit_value_container.children[1].children[0];

	let phase_out_container            = policy_inputs_container.children[3];
	let single_phase_out_begins        = parseInt(phase_out_container.children[1].children[0].value);
	let married_phase_out_begins_input = phase_out_container.children[2].children[0];

	let adjust_for_married = policy_inputs_container.children[0].children[0].children[0].checked;
	if(adjust_for_married){
		married_credit_value_input.value     = 2 * single_credit_value;
		married_phase_out_begins_input.value = 2 * single_phase_out_begins;
	}
}

function refundable_auto_adjust_child_adjustments(child_adjustments_container, is_adjusted_for_children, is_scaled_automatically, single_credit_value){
	let one_child_input   = child_adjustments_container.children[0].children[0];
	let two_child_input   = child_adjustments_container.children[1].children[0];
	let three_child_input = child_adjustments_container.children[2].children[0];

	if(is_adjusted_for_children){
		if(is_scaled_automatically){
			one_child_input.value   = single_credit_value;
			two_child_input.value   = single_credit_value * 2;
			three_child_input.value = single_credit_value * 3;
		}
	}
	else{
		one_child_input.value   = 0;
		two_child_input.value   = 0;
		three_child_input.value = 0;
	}
}

/********************************************** Hide Inputs ***************************************************************************************************************/
function hide_phase_in_inputs(checkbox){
	let is_phased_in = checkbox.checked;
	let refundable_container = checkbox.parentElement.parentElement;
	let refundablity_threshold_container = refundable_container.children[1];
	let phase_in_rate_container = refundable_container.children[2];

	if(is_phased_in){
		$(refundablity_threshold_container).css('display','inline-block');
		$(phase_in_rate_container).css('display','inline-block');
	}
	else{
		$(refundablity_threshold_container).css('display','none');
		$(phase_in_rate_container).css('display','none');
	}
}

function hide_phase_out_inputs(checkbox){
	let is_phased_out = checkbox.checked;
	let phase_out_container = checkbox.parentElement.parentElement;

	let single_income_container  = phase_out_container.children[1];
	let married_income_container = phase_out_container.children[2];
	let phase_out_rate_container = phase_out_container.children[3];

	if(is_phased_out){
		$(single_income_container).css('display','inline-block');
		$(married_income_container).css('display','inline-block');
		$(phase_out_rate_container).css('display','inline-block');
	}
	else{
		$(single_income_container).css('display','none');
		$(married_income_container).css('display','none');
		$(phase_out_rate_container).css('display','none');
	}
}

function disable_married_credit_value_input(automatically_adjust_checkbox){
	let policy_inputs_container        = automatically_adjust_checkbox.parentElement.parentElement.parentElement;
	let married_credit_value_input     = policy_inputs_container.children[1].children[1].children[0];
	let married_phase_out_begins_input = policy_inputs_container.children[3].children[2].children[0];

	let automatically_adjust = automatically_adjust_checkbox.checked;
	if(automatically_adjust){
		married_credit_value_input.disabled     = true;
		married_phase_out_begins_input.disabled = true;
	}
	else{
		married_credit_value_input.disabled     = false;
		married_phase_out_begins_input.disabled = false;
	}
}

function hide_child_adjustments(input){
	let policy_inputs_container       = input.parentElement.parentElement.parentElement;
	let is_adjusted_container         = policy_inputs_container.children[4];
	let scale_automatically_container = is_adjusted_container.children[1];
	let child_adjustments_container   = policy_inputs_container.children[5];

	let is_adjusted_for_children = is_adjusted_container.children[0].children[0].checked;
	let is_scaled_automatically  = is_adjusted_container.children[1].children[0].checked;

	let one_child_adjustment_input   = child_adjustments_container.children[0].children[0];
	let two_child_adjustment_input   = child_adjustments_container.children[1].children[0];
	let three_child_adjustment_input = child_adjustments_container.children[2].children[0];

	if(is_adjusted_for_children){
		$(scale_automatically_container).css('display', 'inline-block');
		$(child_adjustments_container).css('display', 'block');
		if(is_scaled_automatically){
			one_child_adjustment_input.disabled   = true;
			two_child_adjustment_input.disabled   = true;
			three_child_adjustment_input.disabled = true;
		}
		else{
			one_child_adjustment_input.disabled   = false;
			two_child_adjustment_input.disabled   = false;
			three_child_adjustment_input.disabled = false;
		}
	}
	else{
		$(scale_automatically_container).css('display', 'none');
		$(child_adjustments_container).css('display', 'none');
	}
}

/********************************************** Refundable Starter Object & HTML ***************************************************************************************************************/
const refundable_starter_object = {
    'name' : 'New Policy 1',
    'single' : {
        'none'  : {'x' : [0, 1000000], 'y' : [3000,3000]},
        'one'   : {'x' : [0, 1000000], 'y' : [3000,3000]},
        'two'   : {'x' : [0, 1000000], 'y' : [3000,3000]},
        'three' : {'x' : [0, 1000000], 'y' : [3000,3000]},
    },
    'hoh' : {
        'none'  : {'x' : [0, 1000000], 'y' : [3000,3000]},
        'one'   : {'x' : [0, 1000000], 'y' : [3000,3000]},
        'two'   : {'x' : [0, 1000000], 'y' : [3000,3000]},
        'three' : {'x' : [0, 1000000], 'y' : [3000,3000]},
    },
    'married' : {
        'none'  : {'x' : [0, 1000000], 'y' : [6000,6000]},
        'one'   : {'x' : [0, 1000000], 'y' : [6000,6000]},
        'two'   : {'x' : [0, 1000000], 'y' : [6000,6000]},
        'three' : {'x' : [0, 1000000], 'y' : [6000,6000]},
    },
}; 

const refundable_html_start = `'>
  <div class='policy_left_side'>
        <div class='button_label_container'>
          <button class="policy_button minus_button" onclick="remove_policy(this)"></button>
          <textarea class='byop_policy_label' cols="40" rows="1" oninput='adjust_name(this);'>Policy `;

const refundable_html_end =`</textarea>
        </div>
      </div>

      <div class='policy_right_side'>

        <!-- Automatic Adjustment: Marriage -->
        <div>
          <label>Automatically Adjust for Married:<input type="checkbox" oninput="update_refundable(this);disable_married_credit_value_input(this)" checked>
          </label>
        </div>

        <!-- Credit Value -->
        <div>
          <label>Single/HOH Credit Value:
            $<input type="number" min="0" max="20000" step="500" value="3000" oninput="update_refundable(this);">
          </label>
          <label>Married Credit Value:
            $<input type="number" min="0" max="40000" step="500" value="6000" oninput="update_refundable(this);" disabled>
          </label>
        </div>

        <!-- Phase-In -->
        <div>
          <label>Phased In:<input type="checkbox" id="byop_phase_in_checkbox" oninput="update_refundable(this);hide_phase_in_inputs(this);"></label>
          <label style='display: none;'>Refund Threshold:
            $<input type="number" min="0" max="1000000" step="500" value="0" oninput="update_refundable(this)">
          </label>
          <label style='display: none;'>Phase-In Rate:
            <input type="number" min="0" max="100" step="1" value="40" oninput="update_refundable(this)">%
          </label>
        </div>

        <!-- Phase-Out -->
        <div>
          <label>Phased Out:<input type="checkbox" oninput="update_refundable(this);hide_phase_out_inputs(this)"></label>
          <label style='display: none;'>Single/HOH Phase-out Begins:
            $<input type="number" min="0" max="1000000" step="1000" value="40000" oninput="update_refundable(this)">
          </label>
          <label style='display: none;'>Married Phase-out Begins:
            $<input type="number" min="0" max="1000000" step="1000" value="80000" oninput="update_refundable(this)" disabled>
          </label>
          <label style='display: none;'>Phase-Out Rate:
            <input type="number" min="0" max="100" step="1" value="20" oninput="update_refundable(this)">%
          </label>
        </div>

        <!-- Adjust with children checkboxes -->
        <div>
          <label>Increase with Number of Children:<input type="checkbox" oninput="update_refundable(this);hide_child_adjustments(this);">
          </label>
          <label style='display: none;'>Scale Automatically:<input type="checkbox" oninput="update_refundable(this);hide_child_adjustments(this);" checked>
          </label>
        </div>

        <!-- Child Adjustments -->
        <div style='display: none;'>
          <label>One Child Adjustment:
            $<input type="number" min="0" max="20000" step="100" value="0" oninput="update_refundable(this)" disabled>
          </label>
          <label>Two Child Adjustment:
            $<input type="number" min="0" max="20000" step="100" value="0" oninput="update_refundable(this)" disabled>
          </label>
          <label>Three Child Adjustment:
            $<input type="number" min="0" max="20000" step="100" value="0" oninput="update_refundable(this)" disabled>
          </label>
        </div>

      </div> <!-- right side -->
    </div> <!-- policy container -->`



