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

    // Check if radio buttons already exist to prevent duplication
    if (!document.querySelector('#radio1')) {
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
    }

    // Add event listeners if not already added
    const radio1 = $("#radio1");
    if (radio1 && !radio1.hasAttribute('data-listener-added')) {
        radio1.addEventListener('click', function(event) {
            div1.style.display = 'none';
            div2.style.display = 'block';
            div3.style.display = 'none';
            div4.style.display = 'none';
            div5.style.display = 'none';
            div6.style.display = 'none';
            div7.style.display = 'none';
            displayDiv2();
        });
        radio1.setAttribute('data-listener-added', 'true');
    }

    const radio2 = $("#radio2");
    if (radio2 && !radio2.hasAttribute('data-listener-added')) {
        radio2.addEventListener('click', function(event) {
            div1.style.display = 'none';
            div2.style.display = 'none';
            div3.style.display = 'block';
            div4.style.display = 'none';
            div5.style.display = 'none';
            div6.style.display = 'none';
            div7.style.display = 'none';
        });
        radio2.setAttribute('data-listener-added', 'true');
    }

    const radio3 = $("#radio3");
    if (radio3 && !radio3.hasAttribute('data-listener-added')) {
        radio3.addEventListener('click', function(event) {
            div1.style.display = 'none';
            div2.style.display = 'none';
            div3.style.display = 'none';
            div4.style.display = 'block';
            div5.style.display = 'none';
            div6.style.display = 'none';
            div7.style.display = 'none';
        });
        radio3.setAttribute('data-listener-added', 'true');
    }

    const radio4 = $("#radio4");
    if (radio4 && !radio4.hasAttribute('data-listener-added')) {
        radio4.addEventListener('click', function(event) {
            div1.style.display = 'none';
            div2.style.display = 'none';
            div3.style.display = 'none';
            div4.style.display = 'none';
            div5.style.display = 'block';
            div6.style.display = 'none';
            div7.style.display = 'none';
        });
        radio4.setAttribute('data-listener-added', 'true');
    }

    const radio5 = $("#radio5");
    if (radio5 && !radio5.hasAttribute('data-listener-added')) {
        radio5.addEventListener('click', function(event) {
            div1.style.display = 'none';
            div2.style.display = 'none';
            div3.style.display = 'none';
            div4.style.display = 'none';
            div5.style.display = 'none';
            div6.style.display = 'none';
            div7.style.display = 'block';
        });
        radio5.setAttribute('data-listener-added', 'true');
    }
}


const displayDiv2 = () => {
    /**
     * 
     * TODO: MAKE THE VARIABLES ACTUALLY WHAT THEY NEED TO BE
     * 
     * FIX CSS/STYLING OF WHERE EVERYTHING GOES
     * 
     * HANDLE PROCESS AND RESET BUTTONS
     * 
     * 
     */
    if (!document.querySelector('#createBoxcarForm')) {
        const createBoxcarForm = document.createElement('form');
        createBoxcarForm.id = 'createBoxcarForm';

        // Create input fields and labels
        const fields = [
            { label: 'Boxcar ID', id: 'boxcarId', type: 'text' },
            { label: 'TAREWeight', id: 'tareWeight', type: 'number' },
            { label: 'Max Gross Weight', id: 'maxGrossWeight', type: 'number' },
            { label: 'Cargo Weight', id: 'cargoWeight', type: 'number' },
            { label: 'Gross Weight', id: 'grossWeight', type: 'number' }
        ];

        fields.forEach(field => {
            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.textContent = field.label;

            const input = document.createElement('input');
            input.id = field.id;
            input.type = field.type;

            createBoxcarForm.appendChild(label);
            createBoxcarForm.appendChild(input);
            createBoxcarForm.appendChild(document.createElement('br')); // Add a line break for better readability
        });

        // Append the form to div2
        div2.appendChild(createBoxcarForm);
    }

    if (!document.querySelector('#processBoxCar')) {
        const processBoxCar = document.createElement('button');
        processBoxCar.textContent = 'Process Box Car';
        processBoxCar.id = 'processBoxCar';
        processBoxCar.type = 'button'; // prevent form submission
        div2.appendChild(processBoxCar);
        processBoxCar.addEventListener('click', function(event){
            displayDiv3();

        });
    }

    if (!document.querySelector('#resetFormButton')) {
        const resetFormButton = document.createElement('button');
        resetFormButton.textContent = 'Reset Form';
        resetFormButton.id = 'resetFormButton';
        resetFormButton.type = 'reset'; // reset form fields
        div2.appendChild(resetFormButton);
        resetFormButton.addEventListener('click', function(event){
            //Reset Logic here(maybe a global one instead?)

        });
    }

    if (!document.querySelector('#returnToMainPage')) {
        const returnToMainPage = document.createElement('button');
        returnToMainPage.textContent = 'Return To Main Page';
        returnToMainPage.id = 'returnToMainPage';
        returnToMainPage.type = 'button'; // prevent form submission
        div2.appendChild(returnToMainPage);
        returnToMainPage.addEventListener('click', function(event) {
            div1.style.display = 'block';
            div2.style.display = 'none';
            div3.style.display = 'none';
            div4.style.display = 'none';
            div5.style.display = 'none';
            div6.style.display = 'none';
            div7.style.display = 'none';
            displayDiv1();
        });
    }
}


const displayDiv3 = () => {
    function addRowToTable() {
        //add row to table logic
    }

    function addRow() {
        //add row logic 
    }

    function generateTable() {
        //table logic
    }

    if (!document.querySelector('#returnToCreateBoxCar')) {
        const returnToCreateBoxCar = document.createElement('button');
        returnToCreateBoxCar.textContent = 'Return To Create Box Car';
        returnToCreateBoxCar.id = 'returnToCreateBoxCar';
        returnToCreateBoxCar.type = 'button'; // prevent form submission
        div2.appendChild(returnToCreateBoxCar);
        returnToCreateBoxCar.addEventListener('click', function(event){
            div1.style.display = 'none';
            div2.style.display = 'block';
            div3.style.display = 'none';
            div4.style.display = 'none';
            div5.style.display = 'none';
            div6.style.display = 'none';
            div7.style.display = 'none';
            displayDiv2();
        });
    }

    if (!document.querySelector('#returnToMainPage')) {
        const returnToMainPage = document.createElement('button');
        returnToMainPage.textContent = 'Return To Main Page';
        returnToMainPage.id = 'returnToMainPage';
        returnToMainPage.type = 'button'; // prevent form submission
        div2.appendChild(returnToMainPage);
        returnToMainPage.addEventListener('click', function(event) {
            div1.style.display = 'block';
            div2.style.display = 'none';
            div3.style.display = 'none';
            div4.style.display = 'none';
            div5.style.display = 'none';
            div6.style.display = 'none';
            div7.style.display = 'none';
            displayDiv1();
        });
    }
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


document.addEventListener("DOMContentLoaded", () => {
    div1.style.display = 'block';
    div2.style.display = 'none';
    div3.style.display = 'none';
    div4.style.display = 'none';
    div5.style.display = 'none';
    div6.style.display = 'none';
    div7.style.display = 'none';
    displayDiv1();
  });