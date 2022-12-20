/*Tasks:
1. Having occasional problems with the EITC chart not changing and the EITC values all appearing as $0
*/

/*Default values */
document.getElementById('allFSAtotal').innerHTML = 'Under the Family Security Act 2.0, your child benefit is <b>$3,000</b> and your EITC is <b>$3,000</b>, for a total benefit of <b>$6,000</b>.';
document.getElementById('allCurrent').innerHTML = 'Under 2022 law, your child tax credit is <b>$1,400</b> and your EITC is <b>$3,733</b>, for a total benefit of <b>$5,133<b>.';
document.getElementById('allDifference').innerHTML = 'Under the Family Security Act 2.0, your benefit would';
document.getElementById('allDifference_color').innerHTML = '<b>increase by $867</b>.';

function modify_benefit_outputs_all(){
    if(subchart_select.value === 'all'){
        outputs_all();
    }
    else if(subchart_select.value === 'ca'){
        ca_outputs_all();
    }
    else if(subchart_select.value === 'eitc'){
        eitc_outputs_all();
    }
    else if(subchart_select.value === 'hoh'){
        hoh_outputs_all();
    }
}

function ca_outputs_all(){
    numYoung = num_young(numYoungChildren_all.value);
    numOld = num_old(numOldChildren_all.value);
    numChildren = numYoung+numOld;
    filingStatus = filingstatus_all.value;
    income = myRange_income_all.value;

    if(fsa1_or_2_all.value === 'one'){
        fsaCA = fsa1_child_benefit_value(income, filingStatus, numYoung, numOld);
    }
    else{
        fsaCA = fsa2_child_benefit_value(income, filingStatus, numYoung, numOld);
    }
    ctc = ctc_value(income, filingStatus, numYoung, numOld);

    document.getElementById('allFSAca').innerHTML = 'Under the Family Security Act, your child benefit is $' + fsaCA.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.';
    document.getElementById('allCTC').innerHTML = 'Under existing law (2022), your CTC $' + ctc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.';
    difference = fsaCA - ctc;
    if(difference < 0){
        document.getElementById("allDifference_color").style.color = 'red';
        difference = difference * -1;
        document.getElementById('allDifference_color').innerHTML = 'Under the Family Security Act 2.0, your child benefit would decrease by $' + difference.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.';
    }
    else{
        document.getElementById('allDifference_color').innerHTML = 'Under the Family Security Act 2.0, your child benefit would increase by $' + difference.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.';
    }
    
    document.getElementById('allFSAeitc').innerHTML = '';
    document.getElementById('allFSAtotal').innerHTML = '';
    document.getElementById('allCurrentEITC').innerHTML = '';
    document.getElementById('allHOH').innerHTML = '';
    document.getElementById('allCurrent').innerHTML = '';
}

function eitc_outputs_all(){
    numYoung = num_young(numYoungChildren_all.value);
    numOld = num_old(numOldChildren_all.value);
    numChildren = numYoung+numOld;
    filingStatus = filingstatus_all.value;
    income = myRange_income_all.value;

    fsaEITC = fsa_eitc_calculate(income, filingStatus, numChildren);
    currEITC = existingEITC(income, filingStatus, numChildren);

    document.getElementById('allFSAeitc').innerHTML = 'Under the Family Security Act, your EITC is $' + fsaEITC.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.';
    document.getElementById('allCurrentEITC').innerHTML = 'Under 2022 law, your EITC $' + currEITC.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.';
    difference = fsaEITC - currEITC;
    if(difference < 0){
        difference = difference * -1;
        document.getElementById('allDifference_color').innerHTML = 'Under the Family Security Act 2.0, your EITC would decrease by $' + difference.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.';
    }
    else{
        document.getElementById('allDifference_color').innerHTML = 'Under the Family Security Act 2.0, your EITC would increase by $' + difference.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.';
    }
    
    document.getElementById('allFSAca').innerHTML = '';
    document.getElementById('allFSAtotal').innerHTML = '';
    document.getElementById('allCTC').innerHTML = '';
    document.getElementById('allHOH').innerHTML = '';
    document.getElementById('allCurrent').innerHTML = '';
}

function hoh_outputs_all(){
    income = myRange_income_all.value;
    itemDeduct = rangeValue_ID_all.value;

    hoh = taxDifferenceatIncomeValue(income, itemDeduct);
    document.getElementById('allHOH').innerHTML = 'Switching from head of household to single filer raises your taxes by $' + hoh.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.';
    
    document.getElementById('allFSAca').innerHTML = '';
    document.getElementById('allFSAeitc').innerHTML = '';
    document.getElementById('allFSAtotal').innerHTML = '';
    document.getElementById('allCTC').innerHTML = '';
    document.getElementById('allCurrentEITC').innerHTML = '';
    document.getElementById('allCurrent').innerHTML = '';
    document.getElementById('allDifference_color').innerHTML = '';
}

function outputs_all(){

    numYoung = num_young(numYoungChildren_all.value);
    numOld = num_old(numOldChildren_all.value);
    numChildren = numYoung+numOld;
    filingStatus = filingstatus_all.value;
    income = myRange_income_all.value;

    fsaEITC = fsa_eitc_calculate(income, filingStatus, numChildren);
    if(fsa1_or_2_all.value === 'one'){
        fsaCA = fsa1_child_benefit_value(income, filingStatus, numYoung, numOld);
    }
    else{
        fsaCA = fsa2_child_benefit_value(income, filingStatus, numYoung, numOld);
    }
    fsaTotal = fsaCA + fsaEITC;

    currEITC = existingEITC(income, filingStatus, numChildren);
    ctc = ctc_value(income, filingStatus, numYoung, numOld);
    currTotal = currEITC+ctc;

    hoh_savings = 0;
    if(filingStatus === "hoh"){
        hoh_savings = taxDifferenceatIncomeValue(income, myRange_ID_all.value);
        currTotal += hoh_savings;

        singleCTC = ctc_value(income, 'single', numYoung, numOld);
        netChange = singleCTC - ctc;
        diffCTCHOH = hoh_savings - netChange;

        if(netChange.toFixed(0) === hoh_savings.toFixed(0) && netChange > 0){
            document.getElementById('allFSAtotal').innerHTML = 'Under the Family Security Act 2.0, your child benefit is <b>$' + fsaCA.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + fsaEITC.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> for a total benefit of <b>$' + fsaTotal.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
            document.getElementById('allCurrent').innerHTML = 'Under 2022 law, your child tax credit is <b>$' + ctc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + currEITC.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
            document.getElementById('allHOH').innerHTML = 'Nominally, the head of household filing status saves you <b>$' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> in taxes, for a total benefit of <b>$' + currTotal.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>. However, your income is too low to receive the full CTC, and as a result if you were to become a single filer you would be able to completely offset the increased $' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' in taxes with an additional $' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' worth of the nonrefundable portion of the CTC, resulting in no net change in after-tax income from the HOH filing status. (You can confirm this by toggling to single filer and seeing that the CTC increases by $' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ', and the total benefit does not change.)';
        }
        else if(netChange < hoh_savings && netChange > 0){
            document.getElementById('allFSAtotal').innerHTML = 'Under the Family Security Act 2.0, your child benefit is <b>$' + fsaCA.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + fsaEITC.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> for a total benefit of <b>$' + fsaTotal.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
            document.getElementById('allCurrent').innerHTML = 'Under 2022 law, your child tax credit is <b>$' + ctc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + currEITC.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
            document.getElementById('allHOH').innerHTML = 'Nominally, the head of household filing status saves you <b>$' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> in taxes, for a total benefit of <b>$' + currTotal.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>. However, your income is too low to receive the full CTC, and as a result if you were to become a single filer you would be able to partially offset the increased $' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' in taxes with an additional $' + netChange.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' worth of the nonrefundable portion of the CTC, resulting in a net change in after-tax income from the HOH filing status of only $' + diffCTCHOH.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '. (You can confirm this by toggling to single filer and seeing that the CTC increases by $' + netChange.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ', and the total benefit increases by only $' + diffCTCHOH.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.)';
        }
        else{
            document.getElementById('allFSAtotal').innerHTML = 'Under the Family Security Act 2.0, your child benefit is <b>$' + fsaCA.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + fsaEITC.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> for a total benefit of <b>$' + fsaTotal.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
            document.getElementById('allCurrent').innerHTML = 'Under 2022 law, your child tax credit is <b>$' + ctc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + currEITC.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
            document.getElementById('allHOH').innerHTML = 'Additionally, the head of household filing status saves you <b>$' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> in taxes, for a total benefit of <b>$' + currTotal.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
        }
    }
    else{
        document.getElementById('allHOH').innerHTML = '';
        document.getElementById('allFSAtotal').innerHTML = 'Under the Family Security Act 2.0, your child benefit is <b>$' + fsaCA.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + fsaEITC.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>, for a total benefit of <b>$' + fsaTotal.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
        document.getElementById('allCurrent').innerHTML = 'Under 2022 law, your child tax credit is <b>$' + ctc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + currEITC.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>, for a total benefit of <b>$' + currTotal.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
    }


    difference = fsaTotal - currTotal;
    if(difference < 0){
        document.getElementById("allDifference_color").style.color = 'red';
        difference = difference * -1;
        document.getElementById('allDifference_color').innerHTML = '<b>decrease by $' + difference.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.</b>';
    }
    else{
        document.getElementById("allDifference_color").style.color = 'green';
        document.getElementById('allDifference_color').innerHTML = '<b>increase by $' + difference.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.</b>';
    }
}