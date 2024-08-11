"use strict";

$(document).ready(() => {
    console.debug("document ready");
    $("#apply_id").click(event => {
        const passCode = $("#pass_id");
        console.log(passCode);
    });
});

const check = (passCode) => {
    const itemCodePattern = /^[a-zA-Z]{3}$/; 
    var testPassCode = passCode.val().trim();
    if (testPassCode == "") {
        passCode.next().text(`No Free Ticket`);
    } else if (!itemCodePattern.test(testPassCode)) {
        passCode.next().text(`No Free Ticket`);
    } else {
        passCode.next().text(`You WIN a Free Ticket`);
    }
}
