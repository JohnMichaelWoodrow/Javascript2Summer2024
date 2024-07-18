"use strict";

$(document).ready( () => {

    const scores = [];

    const calculateAvg = scores => {
        // display average score
        const total = scores.reduce( (tot, val) => tot + val, 0 );
        const avg = total/scores.length;
        $("#avg").text(avg.toFixed(2));
    }

    const displayLastThree = scores => {
        // display last 3 scores
        const len = scores.length;
        const copy = (len <= 3) ? scores.slice() : scores.slice(len - 3, len); // copy last three
        copy.reverse();
        $("#last").text(copy.join(", "));
    }

    const updateDisplay = scores => {
        $("#all").text(scores.join(", "));
        $("#avg").text(calculateAvg(scores));
        $("#last").text(displayLastThree(scores).join(", "));
    }

    $("#add_score").click( () => {
        
        const score = parseFloat($("#score").val());
                
        if (isNaN(score) || score < 0 || score > 100) {
            $("#add_score").next().text("Score must be between 0 and 100."); 
            // $("#message").text("Score must be between 1 and 100.");
        }
        else {
            $("#add_score").next().text("");  
            // $("#message").text("");  // remove any previous error message

            // add score to scores array 
            scores.push(score);

            // display all scores
            updateDisplay(scores);

            // display average score
            calculateAvg(scores);

            // display last 3 scores
            displayLastThree(scores);
        }
        
        // get text box ready for next entry
        $("#score").val("");
        $("#score").focus(); 
    });

    $("#delete_score").click( () => {
        const index = parseInt($("#index").val());
        if (isNaN(index)){
            $("#delete_score").next().text("Must be a number");
            console.log("Must be a number");
        } else if (index < 0 || index > scores.length -1){
            $("#delete_score").next().text("Must be a valid index");
            console.log("Must be a valid index");
        } else {
            scores.splice(index, 1);
            $("#delete_score").next().text("");
            updateDisplay(scores);
            console.log(scores);
        }
        $("#index").val("");
        $("#score").focus();
    }); 

    // set focus on initial load
    $("#score").focus();
});