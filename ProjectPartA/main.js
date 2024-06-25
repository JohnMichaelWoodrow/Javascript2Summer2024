"use strict";

const $ = selector => document.querySelector(selector);
const selAll = selector => document.querySelectorAll(selector);
const div1 = $("#div1");
const div2 = $("#div2");
const div3 = $("#div3");
const div4 = $("#div4");
const div5 = $("#div5");
const div6 = $("#div6");
const div7 = $("#div7");

const resetSystem = () => {
    //TODO: reset logic
}

const displayDiv1 = () => {
    const options = ['Create Boxcar', 'Add Freight', 'Boxcar Data', 'Warehouse Data', 'All Freight Status']; // Array of options

    options.forEach((option, index) => {
        const newRadioButton = document.createElement('input');
        newRadioButton.type = 'radio';
        newRadioButton.id = `radio${index + 1}`;
        newRadioButton.name = 'options';
        newRadioButton.value = option;

        const label = document.createElement('label');
        label.htmlFor = `radio${index + 1}`;
        label.textContent = option;

        div1.appendChild(newRadioButton);
        div1.appendChild(label);
        div1.appendChild(document.createElement('br')); // Add a line break for better readability
    });
    const radio1 = $("#radio1");
    radio1.addEventListener('click', function(event){
        div1.style.display = 'none';
        div2.style.display = 'block';
        div3.style.display = 'none';
        div4.style.display = 'none';
        div5.style.display = 'none';
        div6.style.display = 'none';
        div7.style.display = 'none';
    });
    const radio2 = $("#radio2");
    radio2.addEventListener('click', function(event){
        div1.style.display = 'none';
        div2.style.display = 'none';
        div3.style.display = 'block';
        div4.style.display = 'none';
        div5.style.display = 'none';
        div6.style.display = 'none';
        div7.style.display = 'none';
    });
    const radio3 = $("#radio3");
    radio3.addEventListener('click', function(event){
        div1.style.display = 'none';
        div2.style.display = 'none';
        div3.style.display = 'none';
        div4.style.display = 'block';
        div5.style.display = 'none';
        div6.style.display = 'none';
        div7.style.display = 'none';
    });
    const radio4 = $("#radio4");
    radio4.addEventListener('click', function(event){
        div1.style.display = 'none';
        div2.style.display = 'none';
        div3.style.display = 'none';
        div4.style.display = 'none';
        div5.style.display = 'block';
        div6.style.display = 'none';
        div7.style.display = 'none';
    });
    const radio5 = $("#radio5");
    radio5.addEventListener('click', function(event){
        div1.style.display = 'none';
        div2.style.display = 'none';
        div3.style.display = 'none';
        div4.style.display = 'none';
        div5.style.display = 'none';
        div6.style.display = 'none';
        div7.style.display = 'block';
    });


}

const displayDiv2 = () => {
    //TODO: Display div2 logic
}

const displayDiv3 = () => {
    //TODO: Display div3 logic
}

const displayDiv4 = () => {
    //TODO: Display div4 logic
}

const displayDiv5 = () => {
    //TODO: Display div5 logic
}

const displayDiv6 = () => {
    //TODO: Display div6 logic
}

const displayDiv7 = () => {
    //TODO: Display div7 logic
}


document.addEventListener("DOMContentLoaded",
  () => {
    div1.style.display = 'block';
    div2.style.display = 'none';
    div3.style.display = 'none';
    div4.style.display = 'none';
    div5.style.display = 'none';
    div6.style.display = 'none';
    div7.style.display = 'none';
    displayDiv1();
  });