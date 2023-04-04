function update_eitc(input){
  // policy key
  let policy_container = input.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  let policy_key       = policy_container.getAttribute('policy-key');

  // num children and filing status
  let child_container    = input.parentElement.parentElement.parentElement.parentElement.parentElement;
  let num_children       = child_container.getAttribute('num-child');
  let marriage_container = input.parentElement.parentElement.parentElement;
  let filing_status      = marriage_container.getAttribute('filing-status');
  
  // input values
  let this_curve       = input.parentElement.parentElement;
  let credit_value     = parseInt(this_curve.children[0].children[0].value);
  let phase_in_rate    = parseFloat(this_curve.children[1].children[0].value) / 100;
  let phase_out_begins = parseInt(this_curve.children[3].children[0].value);
  let phase_out_rate   = parseFloat(this_curve.children[4].children[0].value) / 100;
  
  // calculated values
  let end_phase_in_income  = credit_value / phase_in_rate;
  let end_phase_out_income = credit_value / phase_out_rate + phase_out_begins;

  // construct new x-y object
  let xy_vals = {'x' : [0, end_phase_in_income, phase_out_begins, end_phase_out_income, 1000000], 'y': [0, credit_value, credit_value, 0, 0]};

  // update policies object
  policies[policy_key][filing_status][num_children] = xy_vals;
  if(filing_status == 'single'){
    policies[policy_key]['hoh'][num_children] = xy_vals;
  }

  // update charts
  update_charts();
}

/********************************************** EITC Starter Object & HTML ***************************************************************************************************************/
const eitc_starter_object = {
    'name' : 'Earned Income Tax Credit',
    'single' : {
        'none'  : {'x' : [0, 7840, 9800, 17640, 1000000],  'y' : [0, 600,  600,  0, 0]},
        'one'   : {'x' : [0, 11750, 21560, 46560, 1000000], 'y' : [0, 3995,  3995,  0, 0]},
        'two'   : {'x' : [0, 16510, 21560, 52918, 1000000], 'y' : [0, 6604,  6604,  0, 0]},
        'three' : {'x' : [0, 16510, 21560, 56838, 1000000], 'y' : [0, 7430,  7430,  0, 0]},
    },
    'hoh' : {
        'none'  : {'x' : [0, 7840, 9800, 17640, 1000000],  'y' : [0, 600,  600,  0, 0]},
        'one'   : {'x' : [0, 11750, 21560, 46560, 1000000], 'y' : [0, 3995,  3995,  0, 0]},
        'two'   : {'x' : [0, 16510, 21560, 52918, 1000000], 'y' : [0, 6604,  6604,  0, 0]},
        'three' : {'x' : [0, 16510, 21560, 56838, 1000000], 'y' : [0, 7430,  7430,  0, 0]},
    },
    'married' : {
        'none'  : {'x' : [0, 7840, 16370, 24210, 1000000],  'y' : [0, 600,  600,   0, 0]},
        'one'   : {'x' : [0, 11750, 28120, 53120, 1000000], 'y' : [0, 3995,  3995,  0, 0]},
        'two'   : {'x' : [0, 16510, 28120, 59478, 1000000], 'y' : [0, 6604,  6604,  0, 0]},
        'three' : {'x' : [0, 16510, 28120, 63398, 1000000], 'y' : [0, 7430,  7430,  0, 0]},
    },
};

const eitc_html = `'>
<div class='policy_left_side'>
    <div class='button_label_container'>
      <button class="policy_button minus_button" onclick="remove_policy(this)"></button>
      <h3 class='policy_label_header'>EITC</h3>
    </div>
  </div>

  <div class='eitc_right_side'>
    <!-- Zero Children -->
    <div class='endpoints'></div> 
    <div class='eitc_child_container' num-child="none">
      <div class='child_label'>Childless:</div>  
      <div class='right_side'>
        <div class='eitc_inputs_container' filing-status="single" style="margin-bottom: 5px;">
          <label><b>Single/HOH:</b></label>
          <div>
            <label>Credit Value:
              $<input type="number" min="0" max="50000" step="100" value="600" data-value_type='credit-value' oninput="update_eitc(this);">
            </label>
            <label>Phase-In Rate:
              <input type="number" min="0" max="100" step="1.00" value="7.65" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
            <br>
            <label>Phase-Out Begins:
              $<input type="number" min="0" max="500000" step="500" value="9800" data-value_type='phase-out-income' oninput="update_eitc(this);">
            </label>
            <label>Phase-Out Rate:
              <input type="number" min="0" max="100" step="1.00" value="7.65" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
          </div>
        </div>
        <div class='eitc_inputs_container' filing-status="married">
          <label><b>Married:</b></label>
          <div>
            <label>Credit Value:
              $<input type="number" min="0" max="50000" step="100" value="600" data-value_type='credit-value' oninput="update_eitc(this);">
            </label>
            <label>Phase-In Rate:
              <input type="number" min="0" max="100" step="1.00" value="7.65" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
            <br>
            <label>Phase-Out Begins:
              $<input type="number" min="0" max="500000" step="500" value="16370" data-value_type='phase-out-income' oninput="update_eitc(this);">
            </label>
            <label>Phase-Out Rate:
              <input type="number" min="0" max="100" step="1.00" value="7.65" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- One Child -->
    <div class='endpoints'></div> 
    <div class='eitc_child_container' num-child="one">
      <div class='child_label'>1 Child:</div>  
      <div class='right_side'>
        <div class='eitc_inputs_container' filing-status="single" style="margin-bottom: 5px;">
          <label><b>Single/HOH:</b></label>
          <div>
            <label>Credit Value:
              $<input type="number" min="0" max="50000" step="100" value="3995" data-value_type='credit-value' oninput="update_eitc(this);">
            </label>
            <label>Phase-In Rate:
              <input type="number" min="0" max="100" step="1.00" value="34" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
            <br>
            <label>Phase-Out Begins:
              $<input type="number" min="0" max="500000" step="500" value="21560" data-value_type='phase-out-income' oninput="update_eitc(this);">
            </label>
            <label>Phase-Out Rate:
              <input type="number" min="0" max="100" step="1.00" value="15.98" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
          </div>
        </div>
        <div class='eitc_inputs_container' filing-status="married">
          <label><b>Married:</b></label>
          <div>
            <label>Credit Value:
              $<input type="number" min="0" max="50000" step="100" value="3995" data-value_type='credit-value' oninput="update_eitc(this);">
            </label>
            <label>Phase-In Rate:
              <input type="number" min="0" max="100" step="1.00" value="34" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
            <br>
            <label>Phase-Out Begins:
              $<input type="number" min="0" max="500000" step="500" value="28120" data-value_type='phase-out-income' oninput="update_eitc(this);">
            </label>
            <label>Phase-Out Rate:
              <input type="number" min="0" max="100" step="1.00" value="15.98" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- 2 Children -->
    <div class='endpoints'></div> 
    <div class='eitc_child_container' num-child="two">
      <div class='child_label'>2 Child:</div>  
      <div class='right_side'>
        <div class='eitc_inputs_container' filing-status="single" style="margin-bottom: 5px;">
          <label><b>Single/HOH:</b></label>
          <div>
            <label>Credit Value:
              $<input type="number" min="0" max="50000" step="100" value="6604" data-value_type='credit-value' oninput="update_eitc(this);">
            </label>
            <label>Phase-In Rate:
              <input type="number" min="0" max="100" step="1.00" value="40" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
            <br>
            <label>Phase-Out Begins:
              $<input type="number" min="0" max="500000" step="500" value="21560" data-value_type='phase-out-income' oninput="update_eitc(this);">
            </label>
            <label>Phase-Out Rate:
              <input type="number" min="0" max="100" step="1.00" value="21.06" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
          </div>
        </div>
        <div class='eitc_inputs_container' filing-status="married">
          <label><b>Married:</b></label>
          <div>
            <label>Credit Value:
              $<input type="number" min="0" max="50000" step="100" value="6604" data-value_type='credit-value' oninput="update_eitc(this);">
            </label>
            <label>Phase-In Rate:
              <input type="number" min="0" max="100" step="1.00" value="40" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
            <br>
            <label>Phase-Out Begins:
              $<input type="number" min="0" max="500000" step="500" value="28120" data-value_type='phase-out-income' oninput="update_eitc(this);">
            </label>
            <label>Phase-Out Rate:
              <input type="number" min="0" max="100" step="1.00" value="21.06" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- Three Children -->
    <button class="policy_button minus_button"></button>
    <div class='eitc_child_container' num-child="three">
      <div class='child_label'>3+ Child:</div>  
      <div class='right_side'>
        <div class='eitc_inputs_container' filing-status="single" style="margin-bottom: 5px;">
          <label><b>Single/HOH:</b></label>
          <div>
            <label>Credit Value:
              $<input type="number" min="0" max="50000" step="100" value="7430" data-value_type='credit-value' oninput="update_eitc(this);">
            </label>
            <label>Phase-In Rate:
              <input type="number" min="0" max="100" step="1.00" value="45" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
            <br>
            <label>Phase-Out Begins:
              $<input type="number" min="0" max="500000" step="500" value="21560" data-value_type='phase-out-income' oninput="update_eitc(this);">
            </label>
            <label>Phase-Out Rate:
              <input type="number" min="0" max="100" step="1.00" value="21.06" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
          </div>
        </div>
        <div class='eitc_inputs_container' filing-status="married">
          <label><b>Married:</b></label>
          <div>
            <label>Credit Value:
              $<input type="number" min="0" max="50000" step="100" value="7430" data-value_type='credit-value' oninput="update_eitc(this);">
            </label>
            <label>Phase-In Rate:
              <input type="number" min="0" max="100" step="1.00" value="45" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
            <br>
            <label>Phase-Out Begins:
              $<input type="number" min="0" max="500000" step="500" value="28120" data-value_type='phase-out-income' oninput="update_eitc(this);">
            </label>
            <label>Phase-Out Rate:
              <input type="number" min="0" max="100" step="1.00" value="21.06" data-value_type='phase-in-rate' oninput="update_eitc(this);">%
            </label>
          </div>
        </div>
      </div>
    </div>

  </div> <!-- right side -->

</div> <!-- policy container -->`


