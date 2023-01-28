/****************************** Intuitive Chart *********************************/
// Constants
const marriage_penalty_show_all_button_text = "<button class='show_all_button' id='marriage_penalty_breakdown_button' onclick='open_and_close_breakdown(&quot;marriage_penalty_breakdown&quot;, &quot;marriage_penalty_breakdown_button&quot;);'>Show all</button>";
const marriage_penalty_collapse_button_text = "<button class='show_all_button' id='marriage_penalty_breakdown_button' onclick='open_and_close_breakdown(&quot;marriage_penalty_breakdown&quot;, &quot;marriage_penalty_breakdown_button&quot;);'>Collapse</button>";

// Default values
document.getElementById('marriage_penalty_individual').innerHTML       = "You owe <b>$6,790</b> in taxes and your partner owes <b>$2,918</b>, for a combined tax liability of <b>$9,708</b>.";
document.getElementById('marriage_penalty_married').innerHTML          = "With a combined income of $120,000, if you married you would owe <b>$10,921</b> in taxes.";
document.getElementById('marriage_penalty_explanation_line').innerHTML = "Your family thus owes <b>$1,213 <em>more</em></b> in taxes.";
document.getElementById('marriage_penalty_penalty').innerHTML            = "You face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$1,213</p></b>" +  marriage_penalty_show_all_button_text;