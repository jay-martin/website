/*********************** Constants *************************************************************************************/
const top_chart_show_all_button_text = "<button class='show_all_button' id='top_chart_breakdown_button' onclick='open_and_close_breakdown(&quot;top_chart_breakdown&quot;, &quot;top_chart_breakdown_button&quot;);'>Show all</button>";
const top_chart_collapse_button_text = "<button class='show_all_button' id='top_chart_breakdown_button' onclick='open_and_close_breakdown(&quot;top_chart_breakdown&quot;, &quot;top_chart_breakdown_button&quot;);'>Collapse</button>";

const eitc_marriage_penalty_show_all_button_text = "<button class='show_all_button' id='eitc_marriage_penalty_breakdown_button' onclick='open_and_close_breakdown(&quot;eitc_marriage_penalty_breakdown&quot;, &quot;eitc_marriage_penalty_breakdown_button&quot;);'>Show all</button>";
const eitc_marriage_penalty_collapse_button_text = "<button class='show_all_button' id='eitc_marriage_penalty_breakdown_button' onclick='open_and_close_breakdown(&quot;eitc_marriage_penalty_breakdown&quot;, &quot;eitc_marriage_penalty_breakdown_button&quot;);'>Collapse</button>";

const hoh_tax_show_all_button_text = "<button class='show_all_button' id='hoh_tax_breakdown_button' onclick='open_and_close_breakdown(&quot;hoh_tax_breakdown&quot;, &quot;hoh_tax_breakdown_button&quot;);'>Show all</button>";
const hoh_tax_collapse_button_text = "<button class='show_all_button' id='hoh_tax_breakdown_button' onclick='open_and_close_breakdown(&quot;hoh_tax_breakdown&quot;, &quot;hoh_tax_breakdown_button&quot;);'>Collapse</button>";

const single_tax_show_all_button_text = "<button class='show_all_button' id='single_tax_breakdown_button' onclick='open_and_close_breakdown(&quot;single_tax_breakdown&quot;, &quot;single_tax_breakdown_button&quot;);'>Show all</button>";
const single_tax_collapse_button_text = "<button class='show_all_button' id='single_tax_breakdown_button' onclick='open_and_close_breakdown(&quot;single_tax_breakdown&quot;, &quot;single_tax_breakdown_button&quot;);'>Collapse</button>";

/*********************** Top Chart *************************************************************************************/
document.getElementById('top_chart_individual').innerHTML        = "Your EITC is worth <b>$2,646</b> and your partner's EITC is worth <b>$585</b>,<br> for a combined EITC of <b>$3,231</b>.";
document.getElementById('top_chart_married').innerHTML           = "With a combined income of $40,000, if you married your EITC would be worth <b>$2,097</b>.";
document.getElementById('top_chart_explanation_line').innerHTML  = "Your family's EITC thus <b>decreases</b> by <b>$1,134</b> as a result of getting married.";
document.getElementById('top_chart_penalty').innerHTML           = "You face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$1,134</p></b>" + top_chart_show_all_button_text;

/*********************** EITC Marriage Penalty *************************************************************************************/
document.getElementById('eitc_marriage_penalty_individual').innerHTML        = "Your EITC is worth <b>$2,646</b> and your partner's EITC is worth <b>$585</b>,<br> for a combined EITC of <b>$3,231</b>.";
document.getElementById('eitc_marriage_penalty_married').innerHTML           = "With a combined income of $40,000, if you married your EITC would be worth <b>$2,097</b>.";
document.getElementById('eitc_marriage_penalty_explanation_line').innerHTML  = "Your family's EITC thus <b>decreases</b> by <b>$1,134</b> as a result of getting married.";
document.getElementById('eitc_marriage_penalty_penalty').innerHTML           = "With your partner's income fixed at <b>$10,000</b> and your income of <b>$30,000</b>, you face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$1,134</p></b>" + eitc_marriage_penalty_show_all_button_text;

/*********************** HOH Tax Marriage Penalty *************************************************************************************/
document.getElementById('hoh_tax_individual').innerHTML       = "You owe <b>$6,790</b> in taxes and your partner owes <b>$2,918</b>, for a combined tax liability of <b>$9,708</b>.";
document.getElementById('hoh_tax_married').innerHTML          = "With a combined income of $120,000, if you married you would owe <b>$10,921</b> in taxes.";
document.getElementById('hoh_tax_explanation_line').innerHTML = "Your family thus owes <b>$1,213 <em>more</em></b> in taxes.";
document.getElementById('hoh_tax_penalty').innerHTML          = "You face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$1,213</p></b>" +  hoh_tax_show_all_button_text;

/*********************** Single Tax Marriage Penalty *************************************************************************************/
document.getElementById('single_tax_individual').innerHTML       = "You owe <b>$9,861</b> in taxes and your partner owes <b>$2,918</b>, for a combined tax liability of <b>$12,779</b>.";
document.getElementById('single_tax_married').innerHTML          = "With a combined income of $120,000, if you married you would owe <b>$10,921</b> in taxes.";
document.getElementById('single_tax_explanation_line').innerHTML = "Your family thus owes <b>$1,858 <em>less</em></b> in taxes.";
document.getElementById('single_tax_penalty').innerHTML          = "You face a <b><p class='inline green'>marriage bonus</p></b> of <b><p class='inline green'>$1,858</p></b>" + single_tax_show_all_button_text;