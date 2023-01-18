/************************* Controls ********************************************************************************************************************************************/
/** Returns the value of the CDCC for a given filing status and number of children at a given income
 * @param {integer} - income
 * @param {string} - filing status
 * @param {string} - string representing the number of children
 * @return {float} - value of CDCC
 * */
function cdcc_amount_2023(income, filingStatus, numChildren){
    if(filingStatus === 'single'){
        return single_cdcc_amount_2023(income, numChildren);
    }
    else if(filingStatus === 'hoh'){
        return hoh_cdcc_amount_2023(income, numChildren);
    }
    else if(filingStatus === 'married'){
        return married_cdcc_amount_2023(income, numChildren);
    }
}

/** Returns the value of the CDCC for single filers at a given income and for a given number of children
 * @param {integer} - income
 * @param {string} - string representing the number of children
 * @return {float} - value of CDCC
 * */
function single_cdcc_amount_2023(income, numChildren){
    if(numChildren === 'one'){
        return single_cdcc_amount_2023_one_child(income);
    }
    else{
        return single_cdcc_amount_2023_two_plus_children(income);
    }
}

/** Returns the value of the CDCC for heads of households at a given income and for a given number of children
 * @param {integer} - income
 * @param {string} - string representing the number of children
 * @return {float} - value of CDCC
 * */
function hoh_cdcc_amount_2023(income, numChildren){
    if(numChildren === 'one'){
        return hoh_cdcc_amount_2023_one_child(income);
    }
    else{
        return hoh_cdcc_amount_2023_two_plus_children(income);
    }
}

/** Returns the value of the CDCC for married joint filers at a given income and for a given number of children
 * @param {integer} - income
 * @param {string} - string representing the number of children
 * @return {float} - value of CDCC
 * */
function married_cdcc_amount_2023(income, numChildren){
    if(numChildren === 'one'){
        return married_cdcc_amount_2023_one_child(income);
    }
    else{
        return married_cdcc_amount_2023_two_plus_children(income);
    }
}

/************************* Single ********************************************************************************************************************************************/
/** Returns the value of the CDCC for single filers with one child at a given income
 * @param {integer} - income
 * @return {float} - value of CDCC
 * */
function single_cdcc_amount_2023_one_child(income){
    if(income <= 13850){
        return 0;
    }
    else if(income <= 23000){
        return .1 * (income - 13850);
    }
    else if(income <= 43000){
        return one_child_step_value(income);
    }
    else {
        return 600;
    }
}

/** Returns the value of the CDCC for single filers with two or more children at a given income
 * @param {integer} - income
 * @return {float} - value of CDCC
 * */
function single_cdcc_amount_2023_two_plus_children(income){
    if(income <= 13850){
        return 0;
    }
    else if(income <= 24850){
        return .1 * (income - 13850);
    }
    else if(income <= 29183){
        return .12 * (income - 24850) + 1100;
    }
    else if(income <= 43000){
        return two_plus_children_step_value(income);
    }
    else {
        return 1200;
    }
}

/************************* HOH ********************************************************************************************************************************************/
/** Returns the value of the CDCC for heads of households with one child at a given income
 * @param {integer} - income
 * @return {float} - value of CDCC
 * */
function hoh_cdcc_amount_2023_one_child(income){
    if(income <= 20800){
        return 0;
    }
    else if(income <= 29000){
        return .1 * (income - 20800);
    }
    else if(income <= 43000){
        return one_child_step_value(income);
    }
    else {
        return 600;
    }
}

/** Returns the value of the CDCC for single filers with two or more children at a given income
 * @param {integer} - income
 * @return {float} - value of CDCC
 * */
function hoh_cdcc_amount_2023_two_plus_children(income){
    if(income <= 20800){
        return 0;
    }
    else if(income <= 35200){
        return .1 * (income - 20800);
    }
    else if(income <= 43000){
        return two_plus_children_step_value(income);
    }
    else {
        return 1200;
    }
}

/************************* Married ********************************************************************************************************************************************/
/** Returns the value of the CDCC for heads of households with one child at a given income
 * @param {integer} - income
 * @return {float} - value of CDCC
 * */
function married_cdcc_amount_2023_one_child(income){
    if(income <= 27700){
        return 0;
    }
    else if(income <= 35000){
        return .1 * (income - 27700);
    }
    else if(income <= 43000){
        return one_child_step_value(income);
    }
    else {
        return 600;
    }
}

/** Returns the value of the CDCC for single filers with two or more children at a given income
 * @param {integer} - income
 * @return {float} - value of CDCC
 * */
function married_cdcc_amount_2023_two_plus_children(income){
    if(income <= 27700){
        return 0;
    }
    else if(income <= 40900){
        return .1 * (income - 27700);
    }
    else if(income <= 43000){
        return two_plus_children_step_value(income);
    }
    else {
        return 1200;
    }
}

/************************* Phaseout ********************************************************************************************************************************************/
/** Returns the value of the CDCC in the step-wise phaseout for filers with one child
 * @param {integer} - income
 * @return {float} - value of CDCC
 * */
function one_child_step_value(income){
    floor = Math.floor( ( (income - 1) / 1000) ) - 23;
    if(floor % 2 == 0){
        multiple = floor / 2;
    }
    else{
        multiple = (floor - 1) / 2;
    }
    return 900 - multiple * 30;
}

/** Returns the value of the CDCC in the step-wise phaseout for filers with two or more children
 * @param {integer} - income
 * @return {float} - value of CDCC
 * */
function two_plus_children_step_value(income){
    floor = Math.floor( ( (income - 1) / 1000) ) - 29;
    if(floor % 2 == 0){
        multiple = floor / 2;
    }
    else{
        multiple = (floor - 1) / 2;
    }
    return 1620 - multiple * 60;
}

