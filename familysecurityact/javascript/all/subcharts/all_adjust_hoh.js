/* Adjusts hoh chart according to user input */
function all_modify_hoh_chart(itemDeduct){
    data = taxDifference(itemDeduct);
    combined_brackets = data[0];
    combined_brackets.unshift('x');
    tax_dif = data[1];

    for (var i = 0; i < tax_dif.length; i++) {
        tax_dif[i] = tax_dif[i] * -1;
    }
    tax_dif.unshift('HOH_Savings');

    master_chart_all.load({
        columns: [
            combined_brackets,
            tax_dif
        ],
        unload: ['FSA_EITC', 'EITC', 'FSA_CA', 'CTC', 'dif'],
    });
}