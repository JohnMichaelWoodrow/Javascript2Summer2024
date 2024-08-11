"use strict";

var ones_value = 0;
var hundreds_value = 0;
var answer = 0;

$(document).ready(() => {
    $("#calculate_id").click(event => {
        event.preventDefault();
        readButtons();
        calculateAndDisplay();
    });
});

const readButtons = () => {
    ones_value = parseInt($("input[name=ones_code]:checked").val());
    hundreds_value = parseInt($("input[name=hundreds_code]:checked").val()); // (1) Can’t read the hundred’s buttons ***(added whole line)
}

const calculateAndDisplay = () => {
    answer = (hundreds_value * 100) + ones_value; // (2) Missing the Calculations(whole line)
    $("#answer_id").val(answer); // (3) Missing the Display refresh(whole line)
}


