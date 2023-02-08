function modifyCAGraph(){
    if(fsa1_or_2_CA.value==="one"){
        modifyCAGraph1(filingstatus_ca.value, numYoungChildren.value, numOldChildren.value);
    }
    else{
        modifyCAGraph2(filingstatus_ca.value, numYoungChildren.value, numOldChildren.value);
    }
    modifyIncome_CA();
}

/* Moves the income slider */
function modifyIncome_CA(){
    let income = myRange_CA.value;
    CAchart.xgrids([{value: income, text:'Your income'}]);

    numYoung = num_young(numYoungChildren.value);
    numOld = num_old(numOldChildren.value);
    benefits = child_benefit_difference(income, filingstatus_ca.value, numYoung, numOld, fsa1_or_2_CA.value);

    let fsa_benefit = benefits[0];
    let current_benefit = benefits[1];
    let difference = benefits[2];

    CAchart.load({
        columns: [
            ['x_point', income],
            ['fsa_point', fsa_benefit],
            ['current_point', current_benefit],
            ['difference_point', difference],
        ]
    });

}