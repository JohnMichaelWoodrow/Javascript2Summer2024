"use strict";

$(document).ready(() => {
    console.debug("document ready");
    $("#apply_id").click(event => {
        const passCode = $("#pass_id");
        //PLACE HOLDER // (1) Fill in the missing Line
        check(passCode); // Add this line (whole line)
    });
});

const check = (passCode) => {
    const itemCodePattern = /^[A-Z]{3}$/; // (2) Fix this line *** (just the regex)
    var testPassCode = passCode.val().trim();
    if (testPassCode == "") {
        passCode.next().text(`No Free Ticket`);
    } else if (!itemCodePattern.test(testPassCode)) {
        passCode.next().text(`No Free Ticket`);
    } else {
        passCode.next().text("Free Ticket"); // fix this line Should display free ticket (changed from alert to actual html element)
    }
}
