/******************************************************************************************
 * This file controls adjustments to the Top Chart
 * ****************************************************************************************/

/* Moves the income slider */
function top_chart_modify_income(){
    let income        = top_chart_income.value;
    let filing_status = top_chart_filing_status.value;
    let num_children  = top_chart_num_children.value;

    top_chart_chart.xgrids([{value: income, text:'Your income'}]);
    top_chart_chart.load({
        columns: [
            ['x_point',        income],
            ['current_point',  ctc_value_2019(income, filing_status, num_children)],
            ['reformed_point', wftra_eitc_value(income, filing_status, num_children)],
        ]
    });
}

/* Adjusts the curve according to filing status and number of children */
function top_chart_adjust_curve(){
    let num_children  = top_chart_num_children.value;
    let filing_status = top_chart_filing_status.value;

    if(filing_status === 'single' || filing_status === 'hoh'){
        single_eitc_builder_2019(top_chart_chart, 'x_current', 'current_eitc', num_children);
        wftra_single_eitc_builder(top_chart_chart, 'x_reformed', 'reformed_eitc', num_children);
    }
    else if(filing_status === 'married'){
        married_eitc_builder_2019(top_chart_chart, 'x_current', 'current_eitc', num_children);
        wftra_married_eitc_builder(top_chart_chart, 'x_reformed', 'reformed_eitc', num_children);
    }

    // modify income if not hiding outputs
    if(top_chart_hide_outputs_switch.checked == false){
        //modify_income();
    }
}

function top_chart_description_generator(){
    let filing_status = capitalize_filing_status(top_chart_filing_status.value);
    let num_children  = capitalize_num_children(top_chart_num_children.value);

    document.getElementById('top_chart_title_description').innerHTML = filing_status + ', ' + num_children;
}

var top_chart_previous_income = 20000;
function top_chart_hide_outputs(){
    top_chart_previous_income = top_chart_income.value;
    if(top_chart_hide_outputs_switch.checked){
        $('#top_chart_outputs').css('display', 'none');
        $('#top_chart_income_container').css('display', 'none');
        top_chart_chart.xgrids([]);
        top_chart_chart.hide(['point']);
    }
    else{
        $('#top_chart_outputs').css('display', 'block');
        $('#top_chart_income_container').css('display', 'block');
        top_chart_chart.xgrids([{value: top_chart_previous_income, text: 'Your income'}]);
        top_chart_chart.show(['point']);
    }
}

/*************************** WFTRA Calculate ************************************/
function wftra_eitc_value(income, filing_status, num_children){
    if(filing_status === 'married'){
        if(num_children === 'none'){

        }
        else if(num_children === 'one'){
            
        }
        else if(num_children === 'two'){
            
        }
        else if(num_children === 'three'){
            
        }
    }
    else {

    }
}

/*************************** WFTRA Chart Builders ************************************/
/** Loads to a c3.js chart a curve for the WFTRA single/hoh eitc for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function wftra_single_eitc_builder(chartName, xName, dataName, numChildren){
    if(numChildren === "none"){
        chartName.load({
            columns: [
                [xName,      0, 10370, 11590, 24569],
                [dataName,   0, 2074,   2074, 0]
            ]
        });
    }
    else if(numChildren === "one"){
        chartName.load({
            columns: [
                [xName,      0, 10370, 19030, 46094],
                [dataName,   0, 4407,  4407,  0]
            ]
        });
    }
    else if(numChildren === "two"){
        chartName.load({
            columns: [
                [xName,      0, 14570, 19030, 53622],
                [dataName,   0, 7285,  7285,  0]
            ]
        });
    }
    else if (numChildren === "three"){
        chartName.load({
            columns: [
                [xName,      0, 14570, 19030, 55351],
                [dataName,   0, 7649,  7649,  0]
            ]
        });
    }
}

/** Loads to a c3.js chart a curve for the WFTRA married eitc for a given number of children
 * @param {string} - variable name of the c3.js chart
 * @param {string} - variable name of the x variable
 * @param {string} - variable name of the dependent variable
 * @param {string} - string representing the number of children ('none', 'one', 'two', 'three')
 * */
function wftra_married_eitc_builder(chartName, xName, dataName, numChildren){
    if(numChildren === "none"){
        chartName.load({
            columns: [
                [xName,      0, 10370, 17390, 30369],
                [dataName,   0, 2074,   2074, 0]
            ]
        });
    }
    else if(numChildren === "one"){
        chartName.load({
            columns: [
                [xName,      0, 10370, 24820, 51884],
                [dataName,   0, 4407,  4407,  0]
            ]
        });
    }
    else if(numChildren === "two"){
        chartName.load({
            columns: [
                [xName,      0, 14570, 24820, 59412],
                [dataName,   0, 7285,  7285,  0]
            ]
        });
    }
    else if (numChildren === "three"){
        chartName.load({
            columns: [
                [xName,      0, 14570, 24820, 61141],
                [dataName,   0, 7649,  7649,  0]
            ]
        });
    }
}



