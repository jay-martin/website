function update_ubi(input){
    let policy_container = input.parentElement.parentElement.parentElement;
    let policy_key       = policy_container.getAttribute('policy-key');

    // inputs
    let ubi_value = parseInt(policy_container.children[1].children[0].children[0].value);
    let include_children = policy_container.children[1].children[1].children[0].checked;

    if(include_children){
        policies[policy_key] = {
            'name' : 'Universal Basic Income',
            'single' : {
                'none'  : {'x' : [0, 1000000], 'y' : [ubi_value, ubi_value]},
                'one'   : {'x' : [0, 1000000], 'y' : [ubi_value*2, ubi_value*2]},
                'two'   : {'x' : [0, 1000000], 'y' : [ubi_value*3, ubi_value*3]},
                'three' : {'x' : [0, 1000000], 'y' : [ubi_value*4, ubi_value*4]},
            },
            'hoh' : {
                'none'  : {'x' : [0, 1000000], 'y' : [ubi_value, ubi_value]},
                'one'   : {'x' : [0, 1000000], 'y' : [ubi_value*2, ubi_value*2]},
                'two'   : {'x' : [0, 1000000], 'y' : [ubi_value*3, ubi_value*3]},
                'three' : {'x' : [0, 1000000], 'y' : [ubi_value*4, ubi_value*4]},
            },
            'married' : {
                'none'  : {'x' : [0, 1000000], 'y' : [ubi_value*2, ubi_value*2]},
                'one'   : {'x' : [0, 1000000], 'y' : [ubi_value*3, ubi_value*3]},
                'two'   : {'x' : [0, 1000000], 'y' : [ubi_value*4, ubi_value*4]},
                'three' : {'x' : [0, 1000000], 'y' : [ubi_value*5, ubi_value*5]},
            },
        };
    }
    else{
        policies[policy_key] = {
            'name' : 'Universal Basic Income',
            'single' : {
                'none'  : {'x' : [0, 1000000], 'y' : [ubi_value, ubi_value]},
                'one'   : {'x' : [0, 1000000], 'y' : [ubi_value, ubi_value]},
                'two'   : {'x' : [0, 1000000], 'y' : [ubi_value, ubi_value]},
                'three' : {'x' : [0, 1000000], 'y' : [ubi_value, ubi_value]},
            },
            'hoh' : {
                'none'  : {'x' : [0, 1000000], 'y' : [ubi_value, ubi_value]},
                'one'   : {'x' : [0, 1000000], 'y' : [ubi_value, ubi_value]},
                'two'   : {'x' : [0, 1000000], 'y' : [ubi_value, ubi_value]},
                'three' : {'x' : [0, 1000000], 'y' : [ubi_value, ubi_value]},
            },
            'married' : {
                'none'  : {'x' : [0, 1000000], 'y' : [ubi_value*2, ubi_value*2]},
                'one'   : {'x' : [0, 1000000], 'y' : [ubi_value*2, ubi_value*2]},
                'two'   : {'x' : [0, 1000000], 'y' : [ubi_value*2, ubi_value*2]},
                'three' : {'x' : [0, 1000000], 'y' : [ubi_value*2, ubi_value*2]},
            },
        };
    }

    // update charts
    update_charts();
}

/********************************************** UBI Starter Object & HTML ***************************************************************************************************************/
const ubi_starter_object = {
    'name' : 'Universal Basic Income',
    'single' : {
        'none'  : {'x' : [0, 1000000], 'y' : [2000, 2000]},
        'one'   : {'x' : [0, 1000000], 'y' : [2000, 2000]},
        'two'   : {'x' : [0, 1000000], 'y' : [2000, 2000]},
        'three' : {'x' : [0, 1000000], 'y' : [2000, 2000]},
    },
    'hoh' : {
        'none'  : {'x' : [0, 1000000], 'y' : [2000, 2000]},
        'one'   : {'x' : [0, 1000000], 'y' : [2000, 2000]},
        'two'   : {'x' : [0, 1000000], 'y' : [2000, 2000]},
        'three' : {'x' : [0, 1000000], 'y' : [2000, 2000]},
    },
    'married' : {
        'none'  : {'x' : [0, 1000000], 'y' : [4000, 4000]},
        'one'   : {'x' : [0, 1000000], 'y' : [4000, 4000]},
        'two'   : {'x' : [0, 1000000], 'y' : [4000, 4000]},
        'three' : {'x' : [0, 1000000], 'y' : [4000, 4000]},
    },
};

const ubi_html = `'>
  <div class='policy_left_side'>
    <div class='button_label_container'>
      <button class="policy_button minus_button" onclick="remove_policy(this)"></button>
      <h3 class='policy_label_header'>Universal Basic Income</h3>
    </div>
  </div>

  <div class='policy_right_side ubi_container'>
    <!-- UBI Value -->
    <label>UBI Value:
      $<input type="number" id="ubi_value" min="0" max="50000" step="500" value="2000" oninput="update_ubi(this)">
    </label>
    <label>Include Children:
        <input type="checkbox" id="ubi_children_checkbox" oninput="update_ubi(this);">
      </label>
  </div>
</div>`;




