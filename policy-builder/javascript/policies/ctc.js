function update_ctc(input){
	// policy values
	let policy_container = input.parentElement.parentElement.parentElement.parentElement;
	let policy_key       = policy_container.getAttribute('policy-key');

	// input containers
	let right_side             = policy_container.children[1];
	let credit_value_container = right_side.children[0];
	let refundable_container   = right_side.children[1];
	let phase_out_container    = right_side.children[2];

	// check improper inputs
	let credit_value_input      = credit_value_container.children[0].children[0];
	let amount_refundable_input = refundable_container.children[1].children[0];
	check_amount_refundable(input, credit_value_input, amount_refundable_input);

	// input vales
	let credit_value             = parseInt(credit_value_input.value);

	let is_phased_in             = refundable_container.children[0].children[0].checked;
	let amount_refundable        = parseInt(amount_refundable_input.value);
	let refund_threshold         = parseInt(refundable_container.children[2].children[0].value);
	let phase_in_rate            = parseInt(refundable_container.children[3].children[0].value) / 100;

	let is_phased_out            = phase_out_container.children[0].children[0].checked;
	let single_phase_out_income  = parseInt(phase_out_container.children[1].children[0].value);
	let married_phase_out_income = parseInt(phase_out_container.children[2].children[0].value);
	let phase_out_rate           = parseInt(phase_out_container.children[3].children[0].value) / 100;

	// get x-y values
	let single_one    = get_ctc_values(is_phased_in, is_phased_out, 'single', 'one', credit_value, amount_refundable, refund_threshold, phase_in_rate, single_phase_out_income, married_phase_out_income, phase_out_rate);
	let single_two    = get_ctc_values(is_phased_in, is_phased_out, 'single', 'two', credit_value, amount_refundable, refund_threshold, phase_in_rate, single_phase_out_income, married_phase_out_income, phase_out_rate);
	let single_three  = get_ctc_values(is_phased_in, is_phased_out, 'single', 'three', credit_value, amount_refundable, refund_threshold, phase_in_rate, single_phase_out_income, married_phase_out_income, phase_out_rate);
	let hoh_one       = get_ctc_values(is_phased_in, is_phased_out, 'hoh', 'one', credit_value, amount_refundable, refund_threshold, phase_in_rate, single_phase_out_income, married_phase_out_income, phase_out_rate);
	let hoh_two       = get_ctc_values(is_phased_in, is_phased_out, 'hoh', 'two', credit_value, amount_refundable, refund_threshold, phase_in_rate, single_phase_out_income, married_phase_out_income, phase_out_rate);
	let hoh_three     = get_ctc_values(is_phased_in, is_phased_out, 'hoh', 'three', credit_value, amount_refundable, refund_threshold, phase_in_rate, single_phase_out_income, married_phase_out_income, phase_out_rate);
	let married_one   = get_ctc_values(is_phased_in, is_phased_out, 'married', 'one', credit_value, amount_refundable, refund_threshold, phase_in_rate, single_phase_out_income, married_phase_out_income, phase_out_rate);
	let married_two   = get_ctc_values(is_phased_in, is_phased_out, 'married', 'two', credit_value, amount_refundable, refund_threshold, phase_in_rate, single_phase_out_income, married_phase_out_income, phase_out_rate);
	let married_three = get_ctc_values(is_phased_in, is_phased_out, 'married', 'three', credit_value, amount_refundable, refund_threshold, phase_in_rate, single_phase_out_income, married_phase_out_income, phase_out_rate);

	// update policies object
	policies[policy_key] = {
        'name' : 'Child Tax Credit',
        'single' : {
            'none'  : {'x' : [0, 1000000], 'y' : [0,0]},
            'one'   : single_one,
            'two'   : single_two,
            'three' : single_three,
        },
        'hoh' : {
            'none'  : {'x' : [0, 1000000], 'y' : [0,0]},
            'one'   : hoh_one,
            'two'   : hoh_two,
            'three' : hoh_three,
        },
        'married' : {
            'none'  :{'x' : [0, 1000000], 'y' : [0,0]},
            'one'   : married_one,
            'two'   : married_two,
            'three' : married_three,
        },
    };

    // update charts
    update_charts();
}

function get_ctc_values(is_phased_in, is_phased_out, filingStatus, numChildren, credit_value, amount_refundable, refund_threshold, phase_in_rate, single_phase_out_income, married_phase_out_income, phase_out_rate){
	let xy_vals = {};

	// add phase-in values
	if(is_phased_in){
		xy_vals = get_ctc_values_phased_in(filingStatus, numChildren, credit_value, amount_refundable, refund_threshold, phase_in_rate);
	}
	else{
		xy_vals = get_ctc_values_not_phased_in(numChildren, credit_value);
	}

	// add phase-out values
	let phase_out_vals = get_ctc_phase_out(is_phased_out, filingStatus, numChildren, credit_value, single_phase_out_income, married_phase_out_income, phase_out_rate);
	xy_vals['x'] = xy_vals['x'].concat(phase_out_vals['x']);
	xy_vals['y'] = xy_vals['y'].concat(phase_out_vals['y']);

	return xy_vals;
}

/********************************************** Phase-Out Values ***************************************************************************************************************/
function get_ctc_phase_out(is_phased_out, filingStatus, numChildren, credit_value, single_phase_out_income, married_phase_out_income, phase_out_rate){
	let max_credit = credit_value * integer_num_children(numChildren);
	if(filingStatus == 'hoh'){
		filingStatus = 'single';
	}
	let phase_out_income = eval(filingStatus + '_phase_out_income');
	let credit_equals_zero_income = max_credit / phase_out_rate + phase_out_income;

	if(is_phased_out){
		x_vals = [phase_out_income, credit_equals_zero_income, 1000000];
		y_vals = [max_credit,       0,                         0];
	}
	else{
		x_vals = [1000000];
		y_vals = [max_credit];
	}
	return {'x' : x_vals, 'y' : y_vals};
}

/********************************************** Phase-In Values ***************************************************************************************************************/
function get_ctc_values_not_phased_in(numChildren, credit_value){
	let max_credit = credit_value * integer_num_children(numChildren);
	return {'x' : [0], 'y' : [max_credit]};
}

const single_bracket  = [13850, 24850, 58575, 109225, 195950, 245100, 591975];
const hoh_bracket     = [20800, 36500, 80650, 116150, 202900, 252050, 598900];
const married_bracket = [27700, 49700, 117150, 218450, 391900, 490200, 721450];
const bracket_percent = [0, .1, .12, .22, .24, .32, .35, .37];

function get_ctc_values_phased_in(filingStatus, numChildren, credit_value, amount_refundable, refund_threshold, phase_in_rate){
	let tax_bracket_values = eval(filingStatus + '_bracket');
	let standard_deduction = tax_bracket_values[0];

	let max_credit     = credit_value * integer_num_children(numChildren);
	let max_refundable = amount_refundable * integer_num_children(numChildren);

	// 0 ----> refund_threshold
	let x_vals = [0, refund_threshold];
	let y_vals = [0, 0];

	// refund_threshold -----> standard_deduction
	let full_refundable_income      = max_refundable / phase_in_rate + refund_threshold;
	let value_at_standard_deduction = phase_in_rate * (standard_deduction - refund_threshold);
	if(full_refundable_income < standard_deduction){
		x_vals.push(full_refundable_income, standard_deduction);
		y_vals.push(max_refundable, max_refundable);
	}
	else{
		x_vals.push(standard_deduction, standard_deduction);
		y_vals.push(value_at_standard_deduction, value_at_standard_deduction);
	}

	// standard_deduction ------> income @ max_credit
	let tax_bracket_index = 1, last_index = 3;
	let next_credit_value = y_vals[last_index], next_income_value = x_vals[last_index];
	while(next_credit_value < max_credit){
		if(full_refundable_income < tax_bracket_values[tax_bracket_index-1]){
			value_at_next_income_threshold = y_vals[last_index] + bracket_percent[tax_bracket_index] * (tax_bracket_values[tax_bracket_index] - tax_bracket_values[tax_bracket_index-1]);
			if(value_at_next_income_threshold > max_credit){
				next_income_value = (max_credit - y_vals[last_index]) / bracket_percent[tax_bracket_index] + tax_bracket_values[tax_bracket_index-1];
				next_credit_value = max_credit;
			}
			else{
				next_income_value = tax_bracket_values[tax_bracket_index];
				next_credit_value = value_at_next_income_threshold;
			}
		}
		else if(full_refundable_income < tax_bracket_values[tax_bracket_index]){
			value_at_full_refundable_income = y_vals[last_index] + (bracket_percent[tax_bracket_index] + phase_in_rate) * (full_refundable_income - tax_bracket_values[tax_bracket_index-1]);
			value_at_next_income_threshold  = value_at_full_refundable_income + bracket_percent[tax_bracket_index] * (tax_bracket_values[tax_bracket_index] - full_refundable_income);
			if(value_at_next_income_threshold > max_credit){
				if(value_at_full_refundable_income > max_credit){
					next_income_value = (max_credit - y_vals[last_index]) / (bracket_percent[tax_bracket_index] + phase_in_rate) + tax_bracket_values[tax_bracket_index-1];
				}
				else{
					// push refund max value and increment last_index
					x_vals.push(full_refundable_income);
					y_vals.push(value_at_full_refundable_income);
					last_index++;
					// now calculate next_income_value for when next_credit_value = max_credit
					next_income_value = (max_credit - value_at_full_refundable_income) / bracket_percent[tax_bracket_index] + full_refundable_income;
				}
				next_credit_value = max_credit;
			}
			else{
				next_income_value = tax_bracket_values[tax_bracket_index];
				next_credit_value = value_at_next_income_threshold;
			}
		}
		else{
			value_at_next_income_threshold = y_vals[last_index] + (bracket_percent[tax_bracket_index] + phase_in_rate) * (tax_bracket_values[tax_bracket_index] - tax_bracket_values[tax_bracket_index-1]);
			if(value_at_next_income_threshold > max_credit){
				next_income_value = (max_credit - y_vals[last_index]) / (bracket_percent[tax_bracket_index] + phase_in_rate) + tax_bracket_values[tax_bracket_index-1];
				next_credit_value = max_credit;
			}
			else{
				next_income_value = tax_bracket_values[tax_bracket_index];
				next_credit_value = value_at_next_income_threshold;
			}
		}
		x_vals.push(next_income_value);
		y_vals.push(next_credit_value);
		tax_bracket_index++;
		last_index++;
	}

	return {'x': x_vals, 'y': y_vals};

}

/********************************************** Check Improper Inputs ****************************************************************************************************/
function check_amount_refundable(current_input, credit_value_input, amount_refundable_input){
	let credit_value      = parseInt(credit_value_input.value);
	let amount_refundable = parseInt(amount_refundable_input.value);

	if(amount_refundable > credit_value){
		if(current_input.id == 'ctc_amount_refundable'){
			credit_value_input.value = amount_refundable;
		}
		else{
			amount_refundable_input.value = credit_value;
		}
	}
}

/********************************************** Hide Inputs ***************************************************************************************************************/
function hide_phased_in_inputs(phase_in_checkbox){
	let policy_container            = phase_in_checkbox.parentElement.parentElement.parentElement.parentElement;
	let refundable_container        = policy_container.children[1].children[1];
	let amount_refundable_container = refundable_container.children[1];
	let refund_threshold_container  = refundable_container.children[2];
	let phase_in_rate_container     = refundable_container.children[3];

	if(phase_in_checkbox.checked){
		$(amount_refundable_container).css('display', 'inline-block');
		$(refund_threshold_container).css('display', 'inline-block');
		$(phase_in_rate_container).css('display', 'inline-block');
	}
	else{
		$(amount_refundable_container).css('display', 'none');
		$(refund_threshold_container).css('display', 'none');
		$(phase_in_rate_container).css('display', 'none');
	}
}

function hide_phase_out_inputs(phase_out_checkbox){
	let policy_container            = phase_out_checkbox.parentElement.parentElement.parentElement.parentElement;
	let phase_out_container         = policy_container.children[1].children[2];
	let phase_out_single_income_container  = phase_out_container.children[1];
	let phase_out_married_income_container = phase_out_container.children[2];
	let phase_out_rate_container           = phase_out_container.children[3];

	if(phase_out_checkbox.checked){
		$(phase_out_single_income_container).css('display', 'inline-block');
		$(phase_out_married_income_container).css('display', 'inline-block');
		$(phase_out_rate_container).css('display', 'inline-block');
	}
	else{
		$(phase_out_single_income_container).css('display', 'none');
		$(phase_out_married_income_container).css('display', 'none');
		$(phase_out_rate_container).css('display', 'none');
	}
}


/********************************************** CTC Starter Object & HTML ***************************************************************************************************************/
const ctc_starter_object = {
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
};

const ctc_html = `'>
<div class='policy_left_side'>
    <div class='button_label_container'>
      <button class="policy_button minus_button" onclick="remove_policy(this)"></button>
      <h3 class='policy_label_header'>Child Tax Credit</h3>
    </div>
  </div>

  <div class='policy_right_side'>

    <!-- CTC Credit Value -->
    <div class='ctc_credit_value'>
      <label>Credit Value Per Child:
        $<input type="number" id="ctc_value" min="0" max="50000" step="500" value="2000" oninput="update_ctc(this)">
      </label>
    </div>

    <!--Refundable-->
    <div class='ctc_refundability'>
      <label>Phased In:<input type="checkbox" id="ctc_phased_in_checkbox" oninput="update_ctc(this);hide_phased_in_inputs(this)" checked>
      </label>
      <label>Amount Refundable:
        $<input type="number" id="ctc_amount_refundable" min="0" max="50000" step="100" value="1600" oninput="update_ctc(this)">
      </label>
      <label>Refund Threshold:
        $<input type="number" id="ctc_refundability_threshold" min="0" max="1000000" step="500" value="2500" oninput="update_ctc(this)">
      </label>
      <label>Refundable Phase-In Rate:
        <input type="number" id="ctc_phase_in_rate" min="0" max="100" step="1" value="15" oninput="update_ctc(this)">%
      </label>
    </div>

    <!-- Phase-Out -->
    <div class='ctc_phase_out'>
      <label>Phased Out:<input type="checkbox" id="ctc_phase_out_checkbox" oninput="update_ctc(this);hide_phase_out_inputs(this);" checked>
      </label>
      <label>Single/HOH Phase-out:
        $<input type="number" id="ctc_single_phase_out_income" min="0" max="1000000" step="1000" value="200000" oninput="update_ctc(this)">
      </label>
      <label>Married Phase-out:
        $<input type="number" id="ctc_married_phase_out_income" min="0" max="1000000" step="1000" value="400000" oninput="update_ctc(this)">
      </label>
      <label>Phase-Out Rate:
        <input type="number" id="ctc_phase_out_rate" min="0" max="100" step="1" value="5" oninput="update_ctc(this)">%
      </label>
    </div>

  </div>
</div>`



