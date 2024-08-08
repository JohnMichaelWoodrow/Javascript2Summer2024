"use strict";

$(document).ready( () => {

    $("#add_score").click( () => {
        
        const score = parseFloat($("#score").val());

        if (isNaN(score) || score < 0 || score > 100) {
            $("#add_score").next().text("Score must be between 0 and 100."); 
        }
        else {
            $("#add_score").next().text("");  

            // add score to scores array 
            testScores.add(score);

            // display all 
            $("#all").text(testScores.toString());

            // display avg
            $("#avg").text(testScores.avg.toFixed(1));

            // display last 3
            $("#last").text(testScores.lastThree);
        }

        $("#score").val("");
        $("#score").focus(); 

        for (const score of testScores) {
            console.log(score);
        }
    });
    
    $("#score").focus();
});