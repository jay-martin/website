// Constants
const mp_show_all_button_text = "<button class='show_all_button' id='marriage_penalty_breakdown_button' onclick='open_and_close_breakdown(&quot;marriage_penalty_breakdown&quot;, &quot;marriage_penalty_breakdown_button&quot;);'>Show all</button>";
const mp_collapse_button_text = "<button class='show_all_button' id='marriage_penalty_breakdown_button' onclick='open_and_close_breakdown(&quot;marriage_penalty_breakdown&quot;, &quot;marriage_penalty_breakdown_button&quot;);'>Collapse</button>";

// Default outputs
document.getElementById('mp_individual').innerHTML = "Your EITC is worth <b>$2,646</b> and your partner's EITC is worth <b>$585</b>,<br> for a combined EITC of <b>$3,231</b>.";
document.getElementById('mp_married').innerHTML     = "With a combined income of $40,000, if you married your EITC would be worth <b>$2,097</b>.";
document.getElementById('mp_explanation_line').innerHTML  = "Your family's EITC thus <b>decreases</b> by <b>$1,134</b> as a result of getting married.";
document.getElementById('mp_penalty').innerHTML  = "You face a <b><p class='inline red'>marriage penalty</p></b> of <b><p class='inline red'>$1,134</p></b>" + marriage_penalty_show_all_button_text;
