"use strict";

var ones_value = 0;
var hundreds_value = 0;
var answer = 0;
var final = 0;

$(document).ready(() => {
    $("#calculate_id").click(event => {
        event.preventDefault();
        readButtons();
        calculateAndDisplay();
    });
});

const readButtons = () => {
    ones_value = parseInt($("input[name=ones_code]:checked").val());
    hundreds_value = parseInt($("input[name=hundreds_code]:checked").val());
}

const calculateAndDisplay = () => {
    final = ones_value * hundreds_value;
    const answer = $("#answer_id");
    answer.next().text(final);
    console.log(final);
}



