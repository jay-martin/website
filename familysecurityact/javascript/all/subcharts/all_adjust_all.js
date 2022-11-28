/* Adjusts the chart according to user filing status and number of children inputs */
function all_modify_all_chart(filingStatus, numYoung, numOld, fsa1or2, itemDeduct){
    data = all_modify_all_calculate(filingStatus, numYoung, numOld, fsa1or2, itemDeduct);
    xValues = data[0];
    fsaCA = data[1];
    fsaEITC = data[2];
    ctc = data[3];
    eitc = data[4];
    hoh = data[5];
    dif = data[6];

    if(filingStatus==='hoh'){
        setTimeout(function () {
            master_chart_all.load({
                columns: [xValues, fsaCA, fsaEITC, ctc, eitc, hoh, dif],
            });
        });
    }
    else{
        setTimeout(function () {
            master_chart_all.load({
                columns: [xValues, fsaCA, fsaEITC, ctc, eitc, dif],
                unload: ['HOH_Savings'],
            });
        });
    }
}

function all_modify_all_calculate(filingStatus, numYoung, numOld, fsa1or2, itemDeduct){
    ref = all_reference_values(filingStatus, numYoung, numOld, itemDeduct);
    referenceValues = all_combined_reference_values(ref[0], ref[1], ref[2]);

    fsaEITC = [];
    eitc = [];
    fsaCA = [];
    ctc = [];
    hoh = [];
    dif = [];

    if(filingStatus==='hoh'){
        for (var i = 0; i < referenceValues.length; i++) {
            income = referenceValues[i];
            ctcVal = ctc_value(income, filingStatus, numYoung, numOld);
            eitcVal = existingEITC(income, filingStatus, numYoung+numOld);
            hohVal = taxDifferenceatIncomeValue(income, itemDeduct);
            fsaEITCVal = fsa_eitc_calculate(income, filingStatus, numYoung+numOld);
            if(fsa1or2 === 'one'){
                CAval = fsa1_child_benefit_value(income, filingStatus, numYoung, numOld);
            }
            else{
                CAval = fsa2_child_benefit_value(income, filingStatus, numYoung, numOld);
            }
            difVal = CAval + fsaEITCVal - ctcVal - eitcVal - hohVal;

            ctc.push(ctcVal);
            eitc.push(eitcVal);
            hoh.push(hohVal);
            fsaCA.push(CAval);
            fsaEITC.push(fsaEITCVal);
            dif.push(difVal);
        }
    }
    else{
        for (var i = 0; i < referenceValues.length; i++) {
            income = referenceValues[i];
            ctcVal = ctc_value(income, filingStatus, numYoung, numOld);
            eitcVal = existingEITC(income, filingStatus, numYoung+numOld);
            fsaEITCVal = fsa_eitc_calculate(income, filingStatus, numYoung+numOld);
            if(fsa1or2 === 'one'){
                CAval = fsa1_child_benefit_value(income, filingStatus, numYoung, numOld);
            }
            else{
                CAval = fsa2_child_benefit_value(income, filingStatus, numYoung, numOld);
            }
            difVal = CAval + fsaEITCVal - ctcVal - eitcVal;

            ctc.push(ctcVal);
            eitc.push(eitcVal);
            fsaCA.push(CAval);
            fsaEITC.push(fsaEITCVal);
            dif.push(difVal);
        }
    }

    referenceValues.unshift('x');
    fsaEITC.unshift('FSA_EITC');
    eitc.unshift('EITC');
    fsaCA.unshift('FSA_CA');
    ctc.unshift('CTC');
    hoh.unshift('HOH_Savings');
    dif.unshift('dif');

    return [referenceValues, fsaCA, fsaEITC, ctc, eitc, hoh, dif];
}

/* Merge the single and hoh tax bracket arrays */
function all_combined_reference_values(eitcReference, ctcReference, hohReference){
    partial = eitcReference.concat(ctcReference);
    full = partial.concat(hohReference);
    refSet = new Set(full);
    combined_brackets = Array.from(refSet).sort(function(a,b){return a-b;});
    combined_brackets.unshift(0);

    return combined_brackets;
}

function all_reference_values(filingStatus, numYoung, numOld, itemDeduct){
    eitcReferenceValues = all_eitc_reference_value(filingStatus, numYoung, numOld);
    ctcReferenceValues = all_ctc_reference_values(filingStatus, numYoung, numOld);
    if(filingStatus === 'hoh'){
        hohReferenceValues = taxDifference(itemDeduct)[0];
        hohReferenceValues.splice(hohReferenceValues.length-1, 1);
        hohReferenceValues.splice(0, 1);
    }
    else{
        hohReferenceValues = [];
    }
    return [eitcReferenceValues, ctcReferenceValues, hohReferenceValues];
}

function all_eitc_reference_value(filingStatus, numYoung, numOld){
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

function all_ctc_reference_values(filingStatus, numYoung, numOld){
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