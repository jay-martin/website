/** Returns the sum of the incomes of person 1 and person 2
 * @return {integer}
 * */
function combined_income_marriage_penalty(){
    return parseInt(person1_income.value, 10) + parseInt(person2_income.value,10);
}

/** Returns the sum of the children between person 1 and person 2
 * @return {integer}
 * */
function num_children(){
    if (person1_children.value==='none' && person2_children.value==='none'){return 0;}
    if ((person1_children.value==='one' && person2_children.value==='none') || (person1_children.value==='none' && person2_children.value==='one')){return 1;}
    if ((person1_children.value==='none' && person2_children.value==='two') || (person1_children.value==='one' && person2_children.value==='one') || (person1_children.value==='two' && person2_children.value==='none')){return 2;}
    if ((person1_children.value==='none' && person2_children.value==='three') || (person1_children.value==='one' && person2_children.value==='two') || (person1_children.value==='two' && person2_children.value==='one') || (person1_children.value==='three' && person2_children.value==='none')){return 3;}
    if ((person1_children.value==='one' && person2_children.value==='three') || (person1_children.value==='two' && person2_children.value==='two') || (person1_children.value==='one '&& person2_children.value==='three')){return 4;}
    if ((person1_children.value==='two' && person2_children.value==='three') || (person1_children.value==='three' && person2_children.value==='two')){return 5;}
    if ((person1_children.value==='three' && person2_children.value==='three')){return 6;}
}