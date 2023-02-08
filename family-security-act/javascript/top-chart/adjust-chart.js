/* Adjusts the chart according to user filing status and number of children inputs */
function top_chart_adjust_all(filing_status, num_young, num_old, fsa1_or_2){
    chart_values   = top_chart_calculate_all(filing_status, num_young, num_old, fsa1_or_2);
    current_x_vals = chart_values['current_x_vals'];
    ctc            = chart_values['ctc'];
    eitc           = chart_values['eitc'];
    hoh            = chart_values['hoh'];
    fsa_x_vals     = chart_values['fsa_x_vals'];
    fsa_ca         = chart_values['fsa_ca'];
    fsa_eitc       = chart_values['fsa_eitc'];

    difference_x_vals = chart_values['difference_x_vals'];
    difference        = chart_values['difference'];

    top_chart.load({ columns: [current_x_vals, ctc, eitc, hoh, fsa_x_vals, fsa_ca, fsa_eitc, difference_x_vals, difference] });
    if(top_chart_is_active['hoh']){
        top_chart.show(['hoh']);
        top_chart.legend.show(['hoh']);
    }
    else{
        top_chart.hide(['hoh']);
        top_chart.legend.hide(['hoh']);
    }
}

function top_chart_calculate_all(filing_status, num_young, num_old, fsa1_or_2){
    let eitc_x_vals     = get_eitc_x_vals(filing_status, num_young, num_old);
    let ctc_x_vals      = get_ctc_x_vals(filing_status, num_young, num_old);
    let hoh_x_vals      = get_hoh_x_vals(filing_status, num_young, num_old);
    let fsa_eitc_x_vals = get_fsa_eitc_x_vals(filing_status, num_young, num_old);
    let fsa_ca_x_vals   = get_fsa_ca_x_vals(filing_status, num_young, num_old, fsa1_or_2);

    let current_x_vals    = merge_x_values([eitc_x_vals, ctc_x_vals, hoh_x_vals]);
    let fsa_x_vals        = merge_x_values([fsa_eitc_x_vals, fsa_ca_x_vals]);
    let difference_x_vals = merge_x_values([eitc_x_vals, ctc_x_vals, hoh_x_vals, fsa_eitc_x_vals, fsa_ca_x_vals]);

    let fsa_eitc   = [];
    let fsa_ca     = [];
    let eitc       = [];
    let ctc        = [];
    let hoh        = [];
    let difference = [];

    // calculate current benefits curve
    for(x of current_x_vals){
        if(top_chart_is_active['ctc']){
            ctc.push(ctc_value(x, filing_status, num_young, num_old));
        }
        else{
            ctc.push(0);
        }

        if(top_chart_is_active['eitc']){
            eitc.push(existingEITC(x, filing_status, num_young+num_old));
        }
        else{
            eitc.push(0);
        }

        if(top_chart_is_active['hoh']){
            hoh.push(tax_liability_2022('single', x) - tax_liability_2022('hoh', x));
        }
        else{
            hoh.push(0);
        }
    }

    // calculate fsa curve
    for(x of fsa_x_vals){
        if(top_chart_is_active['ctc']){
            if(fsa1_or_2 === 'one'){
                fsa_ca.push(fsa1_child_benefit_value(x, filing_status, num_young, num_old));
            }
            else {
                fsa_ca.push(fsa2_child_benefit_value(x, filing_status, num_young, num_old));
            }
        }
        else{
            fsa_ca.push(0);
        }

        if(top_chart_is_active['eitc']){
            fsa_eitc.push(fsa_eitc_calculate(x, filing_status, num_young+num_old));
        }
        else{
            fsa_eitc.push(0);
        }
    }

    // calculate difference curve
    let dif = 0;
    for(x of difference_x_vals){
        if(top_chart_is_active['eitc']){
            dif += fsa_eitc_calculate(x, filing_status, num_young+num_old) - existingEITC(x, filing_status, num_young+num_old);
        }

        if(top_chart_is_active['ctc']){
            dif -= ctc_value(x, filing_status, num_young, num_old);
            if(fsa1_or_2 === 'one'){
                dif += fsa1_child_benefit_value(x, filing_status, num_young, num_old);
            }
            else {
                dif += fsa2_child_benefit_value(x, filing_status, num_young, num_old);
            }
        }

        if(top_chart_is_active['hoh']){
            dif += tax_liability_2022('hoh', x) - tax_liability_2022('single', x);
        }
        difference.push(dif);
        dif = 0;
    }

    current_x_vals.unshift('x_current');
    eitc.unshift('eitc');
    ctc.unshift('ctc');
    hoh.unshift('hoh');
    fsa_x_vals.unshift('x_fsa');
    fsa_eitc.unshift('fsa_eitc');
    fsa_ca.unshift('fsa_ca');
    difference_x_vals.unshift('x_difference');
    difference.unshift('difference');

    return {
        'current_x_vals'  : current_x_vals, 
        'ctc'             : ctc, 
        'eitc'            : eitc, 
        'hoh'             : hoh,
        'fsa_x_vals'      : fsa_x_vals,
        'fsa_ca'          : fsa_ca, 
        'fsa_eitc'        : fsa_eitc, 
        'difference_x_vals' : difference_x_vals,
        'difference'        : difference,
    };
}

function merge_x_values(array_of_arrays){
    let x_vals = [];
    for(array of array_of_arrays){
        x_vals = x_vals.concat(array);
    }

    x_vals_set = new Set(x_vals);
    return Array.from(x_vals_set).sort(function(a,b){return a-b;});
}

function get_eitc_x_vals(filing_status, num_young, num_old){
    if(top_chart_is_active['eitc'] == false){
        return [];
    }

    let combined_children = num_young + num_old;
    if(filing_status === 'married'){
        if(combined_children == 0){
            return [0, 7320, 15290, 22610];
        }
        else if(combined_children == 1){
            return [0, 10979, 26262, 49622];
        }
        else if(combined_children == 2){
            return [0, 15290, 26262, 55529];
        }
        else if(combined_children >= 3){
            return [0, 15410, 26262, 59187];
        }
    }
    else {
        if(combined_children == 0){
            return [0, 7320, 9160, 16480];
        }
        else if(combined_children == 1){
            return [0, 10979, 20131, 43493];
        }
        else if(combined_children == 2){
            return [0, 15290, 20131, 49399];
        }
        else if(combined_children >= 3){
            return [0, 15410, 20131, 53057];
        }
    }
}

function get_fsa_eitc_x_vals(filing_status, num_young, num_old){
    if(top_chart_is_active['eitc'] == false){
        return [];
    }

    let combined_children = num_young + num_old;
    if(filing_status === 'married'){
        if(combined_children == 0){
            return [0, 16000, 20000, 34000];
        }
        else {
            return [0, 18000, 33000, 54000];
        }
    }
    else {
        if(combined_children == 0){
            return [0, 8000, 10000, 17000];
        }
        else {
            return [0, 12000, 23000, 37000];
        }
    }
}

function get_ctc_x_vals(filing_status, num_young, num_old){
    if(top_chart_is_active['ctc'] == false){
        return [];
    }

    let combined_children = num_young + num_old;
    
    if(filing_status === 'married'){
        if(combined_children == 0){
            return [];
        }
        else if(combined_children == 1){
            return [0, 2500, 11833, 25900, 31900, 400000, 440000];
        }
        else if(combined_children == 2){
            return [0, 2500, 21667, 25900, 37900, 400000, 480000];
        }
        else if(combined_children == 3){
            return [0, 2500, 25900, 30500, 43900, 400000, 520000];
        }
        else if(combined_children == 4){
            return [0, 2500, 25900, 39833, 46450, 49325, 400000, 560000];
        }
    }
    else if(filing_status === 'hoh'){
        if(combined_children == 0){
            return [];
        }
        else if(combined_children == 1){
            return [0, 2500, 11833, 19400, 25400, 200000, 240000];
        }
        else if(combined_children == 2){
            return [0, 2500, 19400, 21167, 31397, 200000, 280000];
        }
        else if(combined_children == 3){
            return [0, 2500, 19400, 30500, 34050, 36842, 200000, 320000];
        }  
        else if(combined_children == 4){
            return [0, 2500, 19400, 34050, 39833, 41841, 200000, 360000];
        } 
    }
    else if(filing_status === 'single'){
        if(combined_children == 0){
            return [];
        }
        else if(combined_children == 1){
            return [0, 2500, 11833, 12950, 18950, 200000, 240000];
        }
        else if(combined_children == 2){
            return [0, 2500, 12950, 21167, 23225, 24658, 200000, 280000];
        }
        else if(combined_children == 3){
            return [0, 2500, 12950, 23225, 30129, 200000, 320000]; 
        }
        else if(combined_children == 4){
            return [0, 2500, 12950, 23225, 37536, 200000, 360000]; 
        }
    }
}

function get_fsa_ca_x_vals(filing_status, num_young, num_old, fsa1_or_2){
    if(top_chart_is_active['ctc'] == false){
        return [];
    }

    let combined_children = num_young + num_old;
    if(combined_children == 0){
        return [];
    }

    let phaseout_x_value = 200000;
    if(filing_status === 'married'){
        phaseout_x_value = 400000;
    }

    let final_x_value = (3000 * num_old + 4200 * num_young) / .05 + phaseout_x_value;

    if(fsa1_or_2 === 'one'){
        return [0, phaseout_x_value, final_x_value];
    }
    else {
        return [0, 10000, phaseout_x_value, final_x_value];
    }
}

function get_hoh_x_vals(filing_status, num_young, num_old){
    let combined_children = num_young + num_old;
    let highest_x_val = 50000;
    if(combined_children == 1){
        highest_x_val = 300000;
    }
    else if(combined_children == 2){
        highest_x_val = 400000;
    }
    else if(combined_children == 3){
        highest_x_val = 450000;
    }
    else if(combined_children == 4){
        highest_x_val = 500000;
    }

    if(top_chart_is_active['hoh']){
        // return [0, 12950, 19400, 23225, 34050, 54725, 75300, 102025, 108450, 183000, 189450, 228900, 235350, 552850, 559300];
        return [0, 12950, 19400, 23225, 34050, 54725, 75300, 102025, 108450, 183000, 189450, 228900, 235350, highest_x_val];
    }
    else {
        return [];
    }
}

function eitc_x_vals_old(filingStatus, numYoung, numOld){
    numChildren = numYoung+numOld;
    referenceValues = [];

    if(filingStatus==="married"){
        if(numChildren > 2) {
            referenceValues = [15410, 18000, 26262, 33000, 54000, 59187];
        }
        if(numChildren === 2) {
            referenceValues = [15290, 18000, 26262, 33000, 54000, 55529];
        }
        if(numChildren === 1){
            referenceValues = [10979, 18000, 26262, 33000, 49622, 54000];
        }
        if(numChildren === 0) {
            referenceValues = [7320, 15290, 16000, 20000, 22610, 34000];
        }
    }
    else if(filingStatus==="hoh" || filingStatus==="single"){
        if(numChildren > 2) {
            referenceValues = [12000, 15410, 20131, 23000, 37000, 53057];
        }
        if(numChildren === 2) {
            referenceValues = [12000, 15290, 20131, 23000, 37000, 49399];
        }
        if(numChildren === 1){
            referenceValues = [10979, 12000, 20131, 23000, 37000, 43492];
        }
        if(numChildren === 0) {
            referenceValues = [7320,  8000,  9160,  10000, 16480, 17000];
        }
    }
    return referenceValues;
}

function ctc_x_vals_old(filingStatus, numYoung, numOld){
    referenceValues = [];
    if (filingStatus==="married"){
        /* NO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===0 && numOld===0) {
                referenceValues = [400000];
        }
        if(numYoung===0 && numOld===1) {
                referenceValues = [2500,  10000, 11833, 25900, 31900, 400000, 440000, 460000];
        }
        if(numYoung===0 && numOld===2){
                referenceValues = [2500,  10000, 21167, 25900, 37900, 400000, 480000, 520000];
        }
        /* ONE YOUNG CHILD, VARY OLD CHILDREN */
        if(numYoung===1 && numOld===0) {
                referenceValues = [2500,  10000, 11833, 25900, 31900, 400000, 440000, 484000];
        }
        if(numYoung===1 && numOld===1) {
                referenceValues = [2500,  10000, 21167, 25900, 37900, 400000, 480000, 544000];
        }
        if(numYoung ===1 && numOld===2){
                referenceValues= [2500,   10000, 25900, 30500, 43900, 400000, 520000, 604000];
        }
        /* TWO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===2 && numOld===0) {
                referenceValues = [2500,  10000, 21167, 25900, 37900, 400000, 480000, 568000];
        }
        if(numYoung===2 && numOld===1) {
                referenceValues = [2500,   10000, 25900, 30500, 43900, 400000, 520000, 628000];

        }
        if(numYoung ===2 && numOld===2){
                referenceValues = [2500,   10000, 25900, 39833, 46450, 49325, 400000, 560000, 688000];

        }
    }
    else if (filingStatus==="hoh"){
        /* NO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===0 && numOld===0) {
                referenceValues = [200000];
        }
        if(numYoung===0 && numOld===1) {
                referenceValues = [2500,  10000, 11833, 19400, 25400, 200000, 240000, 260000];
        }
        if(numYoung===0 && numOld===2){
                referenceValues = [2500,  10000, 19400, 21167, 31397, 200000, 280000, 320000];
        }
        /* ONE YOUNG CHILD, VARY OLD CHILDREN */
        if(numYoung===1 && numOld===0) {
                referenceValues = [2500,  10000, 11833, 19400, 25400, 200000, 240000, 284000];
        }
        if(numYoung===1 && numOld===1) {
                referenceValues = [2500,  10000, 19400, 21167, 31397, 200000, 280000, 344000];
        }
        if(numYoung ===1 && numOld===2){
                referenceValues= [2500,   10000, 19400, 30500, 34050, 36842, 200000, 320000, 404000];
        }
        /* TWO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===2 && numOld===0) {
                referenceValues = [2500,  10000, 19400, 21167, 31397, 200000, 280000, 368000];
        }
        if(numYoung===2 && numOld===1) {
                referenceValues = [2500,  10000, 19400, 30500, 34050, 36842,  200000, 320000, 428000];

        }
        if(numYoung ===2 && numOld===2){
                referenceValues = [2500,  10000, 19400, 34050, 39833, 41841, 200000, 360000, 488000];
        }
    }
    else if (filingStatus==="single"){
        /* NO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===0 && numOld===0) {
                referenceValues = [200000];
        }
        if(numYoung===0 && numOld===1) {
                referenceValues = [2500,  10000, 11833, 12950, 18950, 200000, 240000, 260000];
        }
        if(numYoung===0 && numOld===2){
                referenceValues = [2500,  10000, 12950, 21167, 23225, 24658,  200000, 280000, 320000];
        }
        /* ONE YOUNG CHILD, VARY OLD CHILDREN */
        if(numYoung===1 && numOld===0) {
                referenceValues = [2500,  10000, 11833, 12950, 18950, 200000, 240000, 284000];
        }
        if(numYoung===1 && numOld===1) {
                referenceValues = [2500,  10000, 12950, 21167, 23225, 200000, 280000, 344000];
        }
        if(numYoung ===1 && numOld===2){
                referenceValues= [2500,   10000, 12950, 23225, 30129, 200000, 320000, 404000];
        }
        /* TWO YOUNG CHILDREN, VARY OLD CHILDREN */
        if(numYoung===2 && numOld===0) {
                referenceValues = [2500,  10000, 12950, 21167, 23225, 200000, 280000, 368000];
        }
        if(numYoung===2 && numOld===1) {
                referenceValues = [2500,  10000, 12950, 23225, 30129, 200000, 320000, 428000];

        }
        if(numYoung ===2 && numOld===2){
                referenceValues = [2500,  10000, 12950, 23225, 37536, 200000, 360000, 488000];
        }
    }
    return referenceValues;
}  