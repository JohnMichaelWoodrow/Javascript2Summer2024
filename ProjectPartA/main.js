"use strict";

// Variable Setup
const $ = selector => document.querySelector(selector);
const selAll = selector => document.querySelectorAll(selector);
const divA = $("#divA");
const divB = $("#divB");
const divC = $("#divC");
const divD = $("#divD");
const divE = $("#divE");
const divF = $("#divF");
const divG = $("#divG");
// Array to store boxcar data
const boxcarDataArray = [];

// Reset Logic
const resetSystem = () => {
    //TODO: reset logic
}

// Reset all radio buttons
const resetRadioButtons = () => {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function(radio) {
        radio.checked = false;
    });
};

// Div A Logic
const displayDivA = () => {
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

            divA.appendChild(newRadioButton);
            divA.appendChild(label);
            divA.appendChild(document.createElement('br')); // Add a line break for better readability
        });
    }

    // Add event listeners if not already added
    const radio1 = $("#radio1");
    if (radio1 && !radio1.hasAttribute('data-listener-added')) {
        radio1.addEventListener('click', function(event) {
            divA.style.display = 'none';
            divB.style.display = 'block';
            divC.style.display = 'none';
            divD.style.display = 'none';
            divE.style.display = 'none';
            divF.style.display = 'none';
            divG.style.display = 'none';
            displayDivB();
        });
        radio1.setAttribute('data-listener-added', 'true');
    }

    const radio2 = $("#radio2");
    if (radio2 && !radio2.hasAttribute('data-listener-added')) {
        radio2.addEventListener('click', function(event) {
            divA.style.display = 'none';
            divB.style.display = 'none';
            divC.style.display = 'block';
            divD.style.display = 'none';
            divE.style.display = 'none';
            divF.style.display = 'none';
            divG.style.display = 'none';
        });
        radio2.setAttribute('data-listener-added', 'true');
    }

    const radio3 = $("#radio3");
    if (radio3 && !radio3.hasAttribute('data-listener-added')) {
        radio3.addEventListener('click', function(event) {
            divA.style.display = 'none';
            divB.style.display = 'none';
            divC.style.display = 'none';
            divD.style.display = 'block';
            divE.style.display = 'none';
            divF.style.display = 'none';
            divG.style.display = 'none';
        });
        radio3.setAttribute('data-listener-added', 'true');
    }

    const radio4 = $("#radio4");
    if (radio4 && !radio4.hasAttribute('data-listener-added')) {
        radio4.addEventListener('click', function(event) {
            divA.style.display = 'none';
            divB.style.display = 'none';
            divC.style.display = 'none';
            divD.style.display = 'none';
            divE.style.display = 'block';
            divF.style.display = 'none';
            divG.style.display = 'none';
        });
        radio4.setAttribute('data-listener-added', 'true');
    }

    const radio5 = $("#radio5");
    if (radio5 && !radio5.hasAttribute('data-listener-added')) {
        radio5.addEventListener('click', function(event) {
            divA.style.display = 'none';
            divB.style.display = 'none';
            divC.style.display = 'none';
            divD.style.display = 'none';
            divE.style.display = 'none';
            divF.style.display = 'none';
            divG.style.display = 'block';
        });
        radio5.setAttribute('data-listener-added', 'true');
    }
}


// Div B Logic
const displayDivB = () => {
    if (!$('#createBoxcarForm')) {
        const createBoxcarForm = document.createElement('form');
        createBoxcarForm.id = 'createBoxcarForm';

        // Create input fields and labels
        const fields = [
            { label: 'Boxcar ID', id: 'boxcarId', type: 'text' },
            { label: 'TARE Weight', id: 'tareWeight', type: 'number' },
            { label: 'Max Gross Weight', id: 'maxGrossWeight', type: 'number' },
            { label: 'Cargo Weight', id: 'cargoWeight', type: 'number', readOnly: true, defaultValue: 0 },
            { label: 'Gross Weight', id: 'grossWeight', type: 'number', readOnly: true, defaultValue: 0 }
        ];

        fields.forEach(field => {
            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.textContent = field.label;

            const input = document.createElement('input');
            input.id = field.id;
            input.type = field.type;
            if (field.readOnly) input.readOnly = true;
            if (field.defaultValue !== undefined) input.value = field.defaultValue;

            createBoxcarForm.appendChild(label);
            createBoxcarForm.appendChild(input);
            createBoxcarForm.appendChild(document.createElement('br')); // Add a line break for better readability
        });

        // Append the form to divB
        divB.appendChild(createBoxcarForm);

        // Function to update the Cargo Weight and Gross Weight fields
        const updateWeights = () => {
            const tareWeight = parseFloat($('#tareWeight').value) || 0;
            const cargoWeight = 0; // Cargo Weight is always 0 by default
            const grossWeight = tareWeight + cargoWeight;

            $('#cargoWeight').value = cargoWeight;
            $('#grossWeight').value = grossWeight;
        };
        // Add event listener to tareWeight to update cargoWeight and grossWeight
        $('#tareWeight').addEventListener('input', updateWeights);
    }

    // Function to process the boxcar data
    const processBoxCarArray = () => {
        const boxcarData = {
            boxcarId: $('#boxcarId').value,
            tareWeight: $('#tareWeight').value,
            maxGrossWeight: $('#maxGrossWeight').value,
            cargoWeight: $('#cargoWeight').value,
            grossWeight: $('#grossWeight').value
        };

        boxcarDataArray.push(boxcarData);
        console.log('Boxcar data added:', boxcarData);
    };

    // Function to reset the form
    const resetBoxCarForm = () => {
        $('#boxcarId').value = '';
        $('#tareWeight').value = '';
        $('#maxGrossWeight').value = '';
        $('#cargoWeight').value = 0;
        $('#grossWeight').value = 0;
    };

    // Add Process Box Car button
    if (!document.querySelector('#processBoxCar')) {
        const processBoxCar = document.createElement('button');
        processBoxCar.textContent = 'Process Box Car';
        processBoxCar.id = 'processBoxCar';
        processBoxCar.type = 'button'; // prevent form submission
        divB.appendChild(processBoxCar);
        processBoxCar.addEventListener('click', function(event){
            processBoxCarArray();
            displayDivC();
        });
    }

    // Add Reset Form button
    if (!document.querySelector('#resetFormButton')) {
        const resetFormButton = document.createElement('button');
        resetFormButton.textContent = 'Reset Form';
        resetFormButton.id = 'resetFormButton';
        resetFormButton.type = 'button'; // prevent form submission
        divB.appendChild(resetFormButton);
        resetFormButton.addEventListener('click', function(event){
            resetBoxCarForm();
        });
    }

    // Add Return to Main Page button
    if (!document.querySelector('#returnToMainPage')) {
        const returnToMainPage = document.createElement('button');
        returnToMainPage.textContent = 'Return To Main Page';
        returnToMainPage.id = 'returnToMainPage';
        returnToMainPage.type = 'button'; // prevent form submission
        divB.appendChild(returnToMainPage);
        returnToMainPage.addEventListener('click', function(event) {
            divA.style.display = 'block';
            divB.style.display = 'none';
            divC.style.display = 'none';
            divD.style.display = 'none';
            divE.style.display = 'none';
            divF.style.display = 'none';
            divG.style.display = 'none';
            resetRadioButtons();
            displayDivA();
        });
    }
}


// Div C Logic
const displayDivC = () => {
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
        divB.appendChild(returnToCreateBoxCar);
        returnToCreateBoxCar.addEventListener('click', function(event){
            divA.style.display = 'none';
            divB.style.display = 'block';
            divC.style.display = 'none';
            divD.style.display = 'none';
            divE.style.display = 'none';
            divF.style.display = 'none';
            divG.style.display = 'none';
            displayDivB();
        });
    }

    if (!document.querySelector('#returnToMainPage')) {
        const returnToMainPage = document.createElement('button');
        returnToMainPage.textContent = 'Return To Main Page';
        returnToMainPage.id = 'returnToMainPage';
        returnToMainPage.type = 'button'; // prevent form submission
        divB.appendChild(returnToMainPage);
        returnToMainPage.addEventListener('click', function(event) {
            divA.style.display = 'block';
            divB.style.display = 'none';
            divC.style.display = 'none';
            divD.style.display = 'none';
            divE.style.display = 'none';
            divF.style.display = 'none';
            divG.style.display = 'none';
            displayDivA();
        });
    }
}

// Div D Logic
const displayDivD = () => {
    //TODO: Display divD logic
}

// Div E Logic
const displayDivE = () => {
    //TODO: Display divE logic
}

// Div F Logic
const displayDivF = () => {
    //TODO: Display divF logic
}

// Div G Logic
const displayDivG = () => {
    //TODO: Display divG logic
}

// Initial Load Logic
document.addEventListener("DOMContentLoaded", () => {
    divA.style.display = 'block';
    divB.style.display = 'none';
    divC.style.display = 'none';
    divD.style.display = 'none';
    divE.style.display = 'none';
    divF.style.display = 'none';
    divG.style.display = 'none';
    displayDivA();
  });