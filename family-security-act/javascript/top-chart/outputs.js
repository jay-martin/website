/*Default values */
document.getElementById('top_chart_fsa_output').innerHTML = 'Under the Family Security Act 2.0, your child benefit is <b>$3,000</b> and your EITC is <b>$3,000</b>, for a total benefit of <b>$6,000</b>.';
document.getElementById('top_chart_current_output').innerHTML = 'Under 2022 law, your child tax credit is <b>$1,400</b> and your EITC is <b>$3,733</b>, for a total benefit of <b>$5,133<b>.';
document.getElementById('top_chart_difference_output').innerHTML = "Under the Family Security Act 2.0, your benefit would <b><p class='inline green'>increase by $867</p></b>."

function top_chart_outputs(){
    let chart_type         = subchart_select.value;
    let numYoung           = num_young(top_chart_num_young_children.value);
    let numOld             = num_old(top_chart_num_old_children.value);
    let combined_children  = numYoung+numOld;
    let filing_status      = top_chart_filing_status.value;
    let income             = top_chart_income.value;

    let fsa_eitc = fsa_eitc_calculate(income, filing_status, combined_children);
    let fsa_ca   = fsa1_child_benefit_value(income, filing_status, numYoung, numOld);
    if(top_chart_fsa1_or_2.value === 'two'){
        fsa_ca = fsa2_child_benefit_value(income, filing_status, numYoung, numOld);
    }

    let eitc = existingEITC(income, filing_status, combined_children);
    let ctc = ctc_value(income, filing_status, numYoung, numOld);

    let hoh_savings = 0;
    let fsa_total = 0;
    let current_benefit = 0;
    if(chart_type === 'all'){
        fsa_total       = fsa_eitc + fsa_ca;
        current_benefit = eitc + ctc;

        document.getElementById('top_chart_fsa_output').innerHTML     = 'Under the Family Security Act 2.0, your child benefit is <b>$' + fsa_ca.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + fsa_eitc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>, for a total benefit of <b>$' + fsa_total.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
        document.getElementById('top_chart_current_output').innerHTML = 'Under 2022 law, your child tax credit is <b>$' + ctc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + eitc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>, for a total benefit of <b>$' + current_benefit.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';

        if(top_chart_is_active['hoh']){
            hoh_savings = tax_liability_2022('single', income) - tax_liability_2022('hoh', income);
            full_benefit = current_benefit + hoh_savings;
            document.getElementById('top_chart_current_output').innerHTML = 'Under 2022 law, your child tax credit is <b>$' + ctc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + eitc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>, for a benefit of <b>$' + current_benefit.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>. Additionally, the head of household filing status nominally saves you <b>$' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>, for a total benefit of <b>$' + full_benefit.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
            current_benefit += hoh_savings;
        }
    }
    else if(chart_type === 'ca'){
        fsa_total       = fsa_ca;
        current_benefit = ctc;

        document.getElementById('top_chart_fsa_output').innerHTML     = 'Under the Family Security Act 2.0, your child benefit is <b>$' + fsa_ca.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
        document.getElementById('top_chart_current_output').innerHTML = 'Under 2022 law, your child tax credit is <b>$' + ctc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
    }
    else if(chart_type === 'eitc'){
        fsa_total       = fsa_eitc;
        current_benefit = eitc;

        document.getElementById('top_chart_fsa_output').innerHTML     = 'Under the Family Security Act 2.0, your EITC is <b>$' + fsa_eitc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
        document.getElementById('top_chart_current_output').innerHTML = 'Under 2022 law, your EITC is <b>$' + eitc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
    }

    let difference = fsa_total - current_benefit;
    if(difference < 0){
        difference = difference * -1;
        document.getElementById('top_chart_difference_output').innerHTML = "Under the Family Security Act 2.0, your benefit would <b><p class='inline red'>decrease by $" + difference.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>."
    }
    else {
        document.getElementById('top_chart_difference_output').innerHTML = "Under the Family Security Act 2.0, your benefit would <b><p class='inline green'>increase by $" + difference.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</p></b>."
    }

    /*
    hoh_savings = 0;
    if(filing_status === "hoh"){
        hoh_savings = taxDifferenceatIncomeValue(income, myRange_ID_all.value);
        current_benefit += hoh_savings;

        singleCTC = ctc_value(income, 'single', numYoung, numOld);
        netChange = singleCTC - ctc;
        diffCTCHOH = hoh_savings - netChange;

        if(netChange.toFixed(0) === hoh_savings.toFixed(0) && netChange > 0){
            document.getElementById('top_chart_fsa_output').innerHTML = 'Under the Family Security Act 2.0, your child benefit is <b>$' + fsa_ca.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + fsa_eitc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> for a total benefit of <b>$' + fsa_total.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
            document.getElementById('top_chart_current_output').innerHTML = 'Under 2022 law, your child tax credit is <b>$' + ctc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + eitc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
            //document.getElementById('allHOH').innerHTML = 'Nominally, the head of household filing status saves you <b>$' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> in taxes, for a total benefit of <b>$' + current_benefit.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>. However, your income is too low to receive the full CTC, and as a result if you were to become a single filer you would be able to completely offset the increased $' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' in taxes with an additional $' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' worth of the nonrefundable portion of the CTC, resulting in no net change in after-tax income from the HOH filing status. (You can confirm this by toggling to single filer and seeing that the CTC increases by $' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ', and the total benefit does not change.)';
        }
        else if(netChange < hoh_savings && netChange > 0){
            document.getElementById('top_chart_fsa_output').innerHTML = 'Under the Family Security Act 2.0, your child benefit is <b>$' + fsa_ca.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + fsa_eitc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> for a total benefit of <b>$' + fsa_total.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
            document.getElementById('top_chart_current_output').innerHTML = 'Under 2022 law, your child tax credit is <b>$' + ctc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + eitc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
            //document.getElementById('allHOH').innerHTML = 'Nominally, the head of household filing status saves you <b>$' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> in taxes, for a total benefit of <b>$' + current_benefit.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>. However, your income is too low to receive the full CTC, and as a result if you were to become a single filer you would be able to partially offset the increased $' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' in taxes with an additional $' + netChange.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' worth of the nonrefundable portion of the CTC, resulting in a net change in after-tax income from the HOH filing status of only $' + diffCTCHOH.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '. (You can confirm this by toggling to single filer and seeing that the CTC increases by $' + netChange.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ', and the total benefit increases by only $' + diffCTCHOH.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.)';
        }
        else{
            document.getElementById('top_chart_fsa_output').innerHTML = 'Under the Family Security Act 2.0, your child benefit is <b>$' + fsa_ca.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + fsa_eitc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> for a total benefit of <b>$' + fsa_total.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
            document.getElementById('top_chart_current_output').innerHTML = 'Under 2022 law, your child tax credit is <b>$' + ctc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + eitc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
            //document.getElementById('allHOH').innerHTML = 'Additionally, the head of household filing status saves you <b>$' + hoh_savings.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> in taxes, for a total benefit of <b>$' + current_benefit.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
        }
    }
    else{
        //document.getElementById('allHOH').innerHTML = '';
        document.getElementById('top_chart_fsa_output').innerHTML = 'Under the Family Security Act 2.0, your child benefit is <b>$' + fsa_ca.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + fsa_eitc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>, for a total benefit of <b>$' + fsa_total.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
        document.getElementById('top_chart_current_output').innerHTML = 'Under 2022 law, your child tax credit is <b>$' + ctc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b> and your EITC is <b>$' + eitc.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>, for a total benefit of <b>$' + current_benefit.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</b>.';
    }
    */
}