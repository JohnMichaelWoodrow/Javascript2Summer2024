"use strict";
// Classes Import
import Boxcar from './Boxcar.js';
import Freight from './Freight.js';
import RailSystem from './RailSystem.js';

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
let currentDay = 1;

// New Instance of RailSystem
const railSystem = new RailSystem();

// Day System Logic //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to update the day display
const updateDayDisplay = () => {
    const dayDisplay = $("#dayDisplay");
    dayDisplay.textContent = `Day: ${currentDay} `;
}

// Function to process day and unload cargo based on station
const processDay = () => {
    const stationCode = `S0${currentDay}`;
    railSystem.boxcars.forEach(boxcar => {
        boxcar.freights = boxcar.freights.filter(freight => {
            if (freight.transportId.endsWith(stationCode)) {
                railSystem.addToWarehouse(freight);
                return false;
            }
            return true;
        });
    });
    displayDivE();
    displayDivF();
};

// Function to advance the day
const advanceDay = () => {
    currentDay += 1;
    if (currentDay > 4) {
        currentDay = 1;
    }
    updateDayDisplay();
    processDay();
}

// Day Counter and Advance Day Button
const daySystem = () => {
    const dayContainer = document.createElement('div');
    dayContainer.id = 'dayContainer';
    const dayDisplay = document.createElement('span');
    dayDisplay.id = 'dayDisplay';
    dayContainer.appendChild(dayDisplay);
    const advanceDayButton = document.createElement('button');
    advanceDayButton.textContent = 'Advance Day';
    advanceDayButton.id = 'advanceDay';
    advanceDayButton.type = 'button';
    advanceDayButton.addEventListener('click', advanceDay);
    dayContainer.appendChild(advanceDayButton);
    document.body.insertBefore(dayContainer, divA);
    updateDayDisplay();
};

// Summary Page Logic ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to set a cookie
const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    console.log(`Setting cookie: ${name}=${value}`);
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

// Function to save data to cookies
const saveDataToCookies = () => {
    const totalWeightInBoxcars = railSystem.boxcars.reduce((sum, boxcar) => sum + boxcar.cargoWeight, 0);
    const totalWeightInWarehouses = railSystem.warehouse.reduce((sum, freight) => sum + freight.cargoWeight, 0);
    setCookie('totalWeightInBoxcars', totalWeightInBoxcars, 1);
    setCookie('totalWeightInWarehouses', totalWeightInWarehouses, 1);
};

// Function to navigate to the summary page
const navigateToSummaryPage = () => {
    saveDataToCookies();
    window.location.href = 'summary.html';
}

// General Purpose Functions /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Reset all radio buttons
const resetRadioButtons = () => {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function(radio) {
        radio.checked = false;
    });
};

// Function to reset Boxcar form
const resetBoxCarForm = () => {
    $('#boxcarId').value = '';
    $('#tareWeight').value = '';
    $('#maxGrossWeight').value = '';
    $('#cargoWeight').value = 0;
    $('#grossWeight').value = 0;
    clearBoxcarFormErrors();
};

// Clear Boxcar error messages
const clearBoxcarFormErrors = () => {
    $('#boxcarIdError').textContent = '';
    $('#tareWeightError').textContent = '';
    $('#maxGrossWeightError').textContent = '';
};

// Reset Freight Form Needed in 2 Divs
const resetFreightForm = () => {
    $('#transportId').value = '';
    $('#description').value = '';
    $('#freightCargoWeight').value = '';
    const selectedBoxcar = document.querySelector('input[name="boxcar"]:checked');
    if (selectedBoxcar) {
        selectedBoxcar.checked = false;
    }

    // Clear error messages
    $('#transportIdError').textContent = '';
    $('#descriptionError').textContent = '';
    $('#freightCargoWeightError').textContent = '';

    disableFreightForm();
    unlockBoxcarSelection();
};

// Functions to enable/disable form and lock/unlock boxcar selection
const disableFreightForm = () => {
    $('#transportId').disabled = true;
    $('#description').disabled = true;
    $('#freightCargoWeight').disabled = true;
    $('#processCargo').disabled = true;
};

const enableFreightForm = () => {
    $('#transportId').disabled = false;
    $('#description').disabled = false;
    $('#freightCargoWeight').disabled = false;
    $('#processCargo').disabled = false;
};

const lockBoxcarSelection = () => {
    const boxcarRadios = document.querySelectorAll('input[name="boxcar"]');
    boxcarRadios.forEach(radio => {
        radio.disabled = true;
    });
};

const unlockBoxcarSelection = () => {
    const boxcarRadios = document.querySelectorAll('input[name="boxcar"]');
    boxcarRadios.forEach(radio => {
        radio.disabled = false;
    });
};

// Div A Logic ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const displayDivA = () => {
    const options = ['Create Boxcar', 'Add Freight', 'Boxcar Data', 'Warehouse Data', 'All Freight Status','System Summary'];

    // Check if radio buttons already exists
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
            divA.appendChild(document.createElement('br'));
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
            divC.style.display = 'none';
            divD.style.display = 'block';
            divE.style.display = 'none';
            divF.style.display = 'none';
            divG.style.display = 'none';
            displayDivD();
        });
        radio2.setAttribute('data-listener-added', 'true');
    }

    const radio3 = $("#radio3");
    if (radio3 && !radio3.hasAttribute('data-listener-added')) {
        radio3.addEventListener('click', function(event) {
            divA.style.display = 'none';
            divB.style.display = 'none';
            divC.style.display = 'none';
            divD.style.display = 'none';
            divE.style.display = 'block';
            divF.style.display = 'none';
            divG.style.display = 'none';
            displayDivE();
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
            divE.style.display = 'none';
            divF.style.display = 'block';
            divG.style.display = 'none';
            displayDivF();
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
            displayDivG();
        });
        radio5.setAttribute('data-listener-added', 'true');
    }

    const radio6 = $("#radio6");
    if (radio6 && !radio6.hasAttribute('data-listener-added')) {
        radio6.addEventListener('click', function(event) {
            navigateToSummaryPage();
        });
        radio6.setAttribute('data-listener-added', 'true');
    }
}

// Div B Logic ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const displayDivB = () => {
    if (!$('#createBoxcarForm')) {
        const createBoxcarForm = document.createElement('form');
        createBoxcarForm.id = 'createBoxcarForm';

        // Create input fields, labels, and error spans
        const fields = [
            { label: 'Boxcar ID', id: 'boxcarId', type: 'text', errorId: 'boxcarIdError' },
            { label: 'TARE Weight', id: 'tareWeight', type: 'number', errorId: 'tareWeightError' },
            { label: 'Max Gross Weight', id: 'maxGrossWeight', type: 'number', errorId: 'maxGrossWeightError' },
            { label: 'Cargo Weight', id: 'cargoWeight', type: 'number', readOnly: true, defaultValue: 0 },
            { label: 'Gross Weight', id: 'grossWeight', type: 'number', readOnly: true, defaultValue: 0 }
        ];

        fields.forEach(field => {
            const fieldContainer = document.createElement('div');
            fieldContainer.style.display = 'flex';
            fieldContainer.style.alignItems = 'center';
            fieldContainer.style.marginBottom = '10px';
            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.textContent = field.label;
            label.style.width = '150px';
            const input = document.createElement('input');
            input.id = field.id;
            input.type = field.type;
            if (field.readOnly) input.readOnly = true;
            if (field.defaultValue !== undefined) input.value = field.defaultValue;
            const errorSpan = document.createElement('span');
            errorSpan.id = field.errorId;
            errorSpan.style.color = 'red';
            errorSpan.style.marginLeft = '10px';
            fieldContainer.appendChild(label);
            fieldContainer.appendChild(input);
            fieldContainer.appendChild(errorSpan);
            createBoxcarForm.appendChild(fieldContainer);
        });

        // Append the form to divB
        divB.appendChild(createBoxcarForm);

        // Function to update the Cargo Weight and Gross Weight fields
        const updateWeights = () => {
        const tareWeight = parseFloat($('#tareWeight').value) || 0;
        const cargoWeight = parseFloat($('#cargoWeight').value) || 0;
        const grossWeight = tareWeight + cargoWeight;
        $('#cargoWeight').value = cargoWeight;
        $('#grossWeight').value = grossWeight;
    };

        // Add event listener to tareWeight to update cargoWeight and grossWeight
        $('#tareWeight').addEventListener('input', updateWeights);
        updateWeights();
    }

    // Validation functions
    const validateBoxcarId = () => {
        const boxcarId = $('#boxcarId').value;
        const regex = /^BX\d{3}$/;
        if (!regex.test(boxcarId)) {
            $('#boxcarIdError').textContent = 'Boxcar ID must start with "BX" followed by 3 digits';
            return false;
        }
        $('#boxcarIdError').textContent = '';
        return true;
    };

    const validateTareWeight = () => {
        const tareWeight = parseFloat($('#tareWeight').value);
        if (isNaN(tareWeight) || tareWeight < 0 || tareWeight > 20000) {
            $('#tareWeightError').textContent = 'TARE Weight must be a number between 0 and 20000';
            return false;
        }
        $('#tareWeightError').textContent = '';
        return true;
    };

    const validateMaxGrossWeight = () => {
        const tareWeight = parseFloat($('#tareWeight').value);
        const maxGrossWeight = parseFloat($('#maxGrossWeight').value);
        if (isNaN(maxGrossWeight) || maxGrossWeight < tareWeight || maxGrossWeight > 200000) {
            $('#maxGrossWeightError').textContent = 'Max Gross Weight must be a number greater than TARE Weight and between 0 and 20000';
            return false;
        }
        $('#maxGrossWeightError').textContent = '';
        return true;
    };

    // Function to process the boxcar data
    const processBoxCarArray = () => {
        clearBoxcarFormErrors(); 

        if (!validateBoxcarId() || !validateTareWeight() || !validateMaxGrossWeight()) {
            return; 
        }

        const boxcarData = {
            boxcarId: $('#boxcarId').value,
            tareWeight: parseFloat($('#tareWeight').value),
            maxGrossWeight: parseFloat($('#maxGrossWeight').value),
            cargoWeight: parseFloat($('#cargoWeight').value),
            grossWeight: parseFloat($('#grossWeight').value)
        };

        const boxcar = new Boxcar(
            boxcarData.boxcarId,
            boxcarData.tareWeight,
            boxcarData.maxGrossWeight
        );

        railSystem.addBoxcar(boxcar);
        console.log('Boxcar data added:', boxcarData);
        displayDivBC();
        resetBoxCarForm();
    };

    // Process Box Car button
    if (!document.querySelector('#processBoxCar')) {
        const processBoxCar = document.createElement('button');
        processBoxCar.textContent = 'Process Box Car';
        processBoxCar.id = 'processBoxCar';
        processBoxCar.type = 'button'; 
        divB.appendChild(processBoxCar);
        processBoxCar.addEventListener('click', function(event){
            processBoxCarArray();
        });
    }

    // Reset Form button
    if (!document.querySelector('#resetFormButton')) {
        const resetFormButton = document.createElement('button');
        resetFormButton.textContent = 'Reset Form';
        resetFormButton.id = 'resetFormButton';
        resetFormButton.type = 'button'; 
        divB.appendChild(resetFormButton);
        resetFormButton.addEventListener('click', function(event){
            resetBoxCarForm();
        });
    }

    // Return to Main Page button
    if (!document.querySelector('#returnToMainPage')) {
        const returnToMainPage = document.createElement('button');
        returnToMainPage.textContent = 'Return To Main Page';
        returnToMainPage.id = 'returnToMainPage';
        returnToMainPage.type = 'button'; 
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
            resetBoxCarForm();
            displayDivA();
        });
    }

    // Display divB
    divB.style.display = 'block';
}

// Function to update boxcar options
const updateBoxcarOptions = () => {
    const boxcarList = $('#boxcarList');
    if (boxcarList) {
        while (boxcarList.firstChild) {
            boxcarList.removeChild(boxcarList.firstChild);
        }

        railSystem.boxcars.forEach((boxcar, index) => {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'boxcar';
            radio.value = boxcar.boxcarId;
            radio.id = `boxcar${index}`;
            const label = document.createElement('label');
            label.htmlFor = `boxcar${index}`;
            label.textContent = boxcar.boxcarId;
            boxcarList.appendChild(radio);
            boxcarList.appendChild(label);
            boxcarList.appendChild(document.createElement('br'));
        });
    }
}

// Div C Logic ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const displayDivC = () => {
    // Create container for the table if it doesn't exist
    if (!$('#boxcarTableContainer')) {
        const tableContainer = document.createElement('div');
        tableContainer.id = 'boxcarTableContainer';
        divC.appendChild(tableContainer);
    }

    const generateTable = () => {
        const table = document.createElement('table');
        table.id = 'boxcarTable';
        const headerRow = document.createElement('tr');
        const headers = ['Box Car ID', 'TARE', 'Max Gross', 'Cargo', 'Gross'];
        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });

        table.appendChild(headerRow);
        $('#boxcarTableContainer').appendChild(table);
    };

    // Add row to table
    const addRowToTable = (boxcarData) => {
        const table = $('#boxcarTable');
        const row = document.createElement('tr');
        Object.values(boxcarData).forEach(text => {
            const cell = document.createElement('td');
            cell.textContent = text;
            row.appendChild(cell);
        });
        table.appendChild(row);
    };

    // Populate the table with data from boxcarDataArray
    const populateTable = () => {
        railSystem.boxcars.forEach(boxcar => {
            const boxcarData = {
                boxcarId: boxcar.boxcarId,
                tareWeight: boxcar.tareWeight,
                maxGrossWeight: boxcar.maxGrossWeight,
                cargoWeight: boxcar.cargoWeight,
                grossWeight: boxcar.grossWeight
            };
            addRowToTable(boxcarData);
        });

        const totalRow = document.createElement('tr');
        const totalLabelCell = document.createElement('td');
        totalLabelCell.colSpan = 4;
        totalLabelCell.textContent = 'Total Cargo Weight:';
        const totalValueCell = document.createElement('td');
        const totalCargoWeight = railSystem.boxcars.reduce((sum, boxcar) => sum + parseFloat(boxcar.cargoWeight), 0);
        totalValueCell.textContent = totalCargoWeight;
        totalRow.appendChild(totalLabelCell);
        totalRow.appendChild(totalValueCell);
        $('#boxcarTable').appendChild(totalRow);
    };

    // Clear existing table if it exists
    const clearExistingTable = () => {
        const existingTable = $('#boxcarTable');
        if (existingTable) {
            existingTable.remove();
        }
    };

    // Clear existing table and generate a new one
    clearExistingTable();
    generateTable();
    populateTable();

    // Validate that button container is created
    let buttonContainer = document.querySelector('#divCButtonContainer');
    if (!buttonContainer) {
        buttonContainer = document.createElement('div');
        buttonContainer.id = 'divCButtonContainer';

        // Return to Create Box Car button
        const returnToCreateBoxCar = document.createElement('button');
        returnToCreateBoxCar.textContent = 'Return To Create Box Car';
        returnToCreateBoxCar.id = 'returnToCreateBoxCar';
        returnToCreateBoxCar.type = 'button';
        returnToCreateBoxCar.addEventListener('click', function(event){
            divC.style.display = 'none';
            divB.style.display = 'block';
            resetBoxCarForm();
            displayDivB();
        });
        buttonContainer.appendChild(returnToCreateBoxCar);

        // Return to Main Page button
        const returnToMainPage = document.createElement('button');
        returnToMainPage.textContent = 'Return To Main Page';
        returnToMainPage.id = 'returnToMainPage';
        returnToMainPage.type = 'button'; 
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
        buttonContainer.appendChild(returnToMainPage);

        $('#divC').appendChild(buttonContainer);
    }

    divC.style.display = 'block';
}

// Function to display both divB and divC
const displayDivBC = () => {
    divA.style.display = 'none';
    divB.style.display = 'block';
    divC.style.display = 'block';
    divD.style.display = 'none';
    divE.style.display = 'none';
    divF.style.display = 'none';
    divG.style.display = 'none';
    displayDivB();
    displayDivC();
}

// Div D Logic ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const displayDivD = () => {
    const boxcarList = document.createElement('div');
    boxcarList.id = 'boxcarList';

    // Display list of boxcars
    railSystem.boxcars.forEach((boxcar, index) => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'boxcar';
        radio.value = boxcar.boxcarId;
        radio.id = `boxcar${index}`;
        radio.addEventListener('change', () => {
            enableFreightForm();
            lockBoxcarSelection();
        });

        const label = document.createElement('label');
        label.htmlFor = `boxcar${index}`;
        label.textContent = boxcar.boxcarId;
        boxcarList.appendChild(radio);
        boxcarList.appendChild(label);
        boxcarList.appendChild(document.createElement('br'));
    });

    // Append boxcar list to divD
    if (!document.querySelector('#boxcarList')) {
        divD.appendChild(boxcarList);
    }

    if (!$('#createFreightForm')) {
        const createFreightForm = document.createElement('form');
        createFreightForm.id = 'createFreightForm';

        // Create input fields and labels
        const fields = [
            { label: 'Transport ID', id: 'transportId', type: 'text', errorId: 'transportIdError' },
            { label: 'Description', id: 'description', type: 'text', errorId: 'descriptionError' },
            { label: 'Cargo Weight', id: 'freightCargoWeight', type: 'number', errorId: 'freightCargoWeightError' }
        ];

        fields.forEach(field => {
            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.textContent = field.label;
            const input = document.createElement('input');
            input.id = field.id;
            input.type = field.type;
            const errorSpan = document.createElement('span');
            errorSpan.id = field.errorId;
            errorSpan.style.color = 'red';
            errorSpan.style.marginLeft = '10px';
            createFreightForm.appendChild(label);
            createFreightForm.appendChild(input);
            createFreightForm.appendChild(errorSpan);
            createFreightForm.appendChild(document.createElement('br'));
        });

        // Append the form to divD
        divD.appendChild(createFreightForm);

        // Process Cargo button
        const processCargoButton = document.createElement('button');
        processCargoButton.textContent = 'Process Cargo';
        processCargoButton.id = 'processCargo';
        processCargoButton.type = 'button';
        createFreightForm.appendChild(processCargoButton);
        processCargoButton.addEventListener('click', function(event) {
            processFreight();
            displayDivE();
            displayDivF();
        });

        // Reset Form button
        const resetFormButton = document.createElement('button');
        resetFormButton.textContent = 'Reset Form';
        resetFormButton.id = 'resetFormButton';
        resetFormButton.type = 'button';
        createFreightForm.appendChild(resetFormButton);
        resetFormButton.addEventListener('click', function(event) {
            resetFreightForm();
        });

        // Return to Main Page button
        const returnToMainPageButton = document.createElement('button');
        returnToMainPageButton.textContent = 'Return To Main Page';
        returnToMainPageButton.id = 'returnToMainPage';
        returnToMainPageButton.type = 'button';
        createFreightForm.appendChild(returnToMainPageButton);
        returnToMainPageButton.addEventListener('click', function(event) {
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

        disableFreightForm(); // Disable fields initially
    }

    // Validate transport ID
    const validateTransportId = () => {
        const transportId = $('#transportId').value.trim();
        const regex = /^[A-Z]{3}\d{4}S(0[1-4])$/;
    
        if (!regex.test(transportId)) {
            $('#transportIdError').textContent = 'Transport ID must follow the proper format (AAA #### S 01-04)';
            return false;
        }
        $('#transportIdError').textContent = '';
        return true;
    };

    // Validate description
    const validateDescription = () => {
        const description = $('#description').value;
        if (!description.trim()) {
            $('#descriptionError').textContent = 'Description cannot be empty';
            return false;
        }
        $('#descriptionError').textContent = '';
        return true;
    };

    // Validate freight cargo weight
    const validateFreightCargoWeight = () => {
        const freightCargoWeight = parseFloat($('#freightCargoWeight').value);
        if (isNaN(freightCargoWeight) || freightCargoWeight <= 0) {
            $('#freightCargoWeightError').textContent = 'Cargo Weight must be a positive number';
            return false;
        }
        $('#freightCargoWeightError').textContent = '';
        return true;
    };

    // Process freight
    const processFreight = () => {
        const selectedBoxcar = document.querySelector('input[name="boxcar"]:checked');
        if (!selectedBoxcar) {
            $('#freightCargoWeightError').textContent = 'Please select a boxcar.';
            return;
        }

        if (!validateTransportId() || !validateDescription() || !validateFreightCargoWeight()) {
            return;
        }

        const cargoWeight = parseFloat($('#freightCargoWeight').value);

        const freightData = {
            boxcarId: selectedBoxcar.value,
            transportId: $('#transportId').value,
            description: $('#description').value,
            cargoWeight: cargoWeight
        };

        const freight = new Freight(
            freightData.transportId,
            freightData.description,
            freightData.cargoWeight
        );

        const boxcar = railSystem.getBoxcar(freightData.boxcarId);

        if (boxcar && boxcar.addFreight(freight)) {
            console.log('Freight data added to boxcar:', freightData);
        } else {
            railSystem.addToWarehouse(freight);
            console.log('Freight data added to warehouse:', freightData);
        }

        resetFreightForm();
    };

    // Display only divD initially
    divA.style.display = 'none';
    divB.style.display = 'none';
    divC.style.display = 'none';
    divD.style.display = 'block';
    divE.style.display = 'none';
    divF.style.display = 'none';
    divG.style.display = 'none';
};

// Div E Logic ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const displayDivE = () => {
    const divEContent = $('#divE');

    // Clear existing content
    while (divEContent.firstChild) {
        divEContent.removeChild(divEContent.firstChild);
    }

    const title = document.createElement('h1');
    title.textContent = 'CNA - Boxcar Manifest';
    divEContent.appendChild(title);

    if (railSystem.boxcars.length === 0) {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No boxcar data available.';
        divEContent.appendChild(noDataMessage);
    } else {
        railSystem.boxcars.forEach(boxcar => {
            const boxcarEntry = document.createElement('p');
            boxcarEntry.textContent = `Boxcar ID: ${boxcar.boxcarId}, Total Cargo Weight: ${boxcar.cargoWeight}`;
            divEContent.appendChild(boxcarEntry);

            // Find all transport data associated with the current boxcar
            boxcar.freights.forEach(freight => {
                const entry = document.createElement('p');
                entry.textContent = `Transport ID: ${freight.transportId}, Description: ${freight.description}, Cargo Weight: ${freight.cargoWeight}`;
                divEContent.appendChild(entry);
            });
        });

        const totalWeight = railSystem.boxcars.reduce((sum, boxcar) => sum + boxcar.cargoWeight, 0);
        const totalWeightEntry = document.createElement('p');
        totalWeightEntry.textContent = `Total Cargo Weight: ${totalWeight}`;
        divEContent.appendChild(totalWeightEntry);
    }

    // Add Return to Add Freight button
    if (!document.querySelector('#returnToAddFreightFromE')) {
        const returnToAddFreightButton = document.createElement('button');
        returnToAddFreightButton.textContent = 'Return To Add Freight';
        returnToAddFreightButton.id = 'returnToAddFreightFromE';
        returnToAddFreightButton.type = 'button';
        divEContent.appendChild(returnToAddFreightButton);
        returnToAddFreightButton.addEventListener('click', function(event) {
            divA.style.display = 'none';
            divB.style.display = 'none';
            divC.style.display = 'none';
            divD.style.display = 'block';
            divE.style.display = 'none';
            divF.style.display = 'none';
            divG.style.display = 'none';
            resetFreightForm();
            displayDivD();
        });
    }

    // Add Return to Main Page button
    if (!document.querySelector('#returnToMainPageFromE')) {
        const returnToMainPageButton = document.createElement('button');
        returnToMainPageButton.textContent = 'Return To Main Page';
        returnToMainPageButton.id = 'returnToMainPageFromE';
        returnToMainPageButton.type = 'button';
        divEContent.appendChild(returnToMainPageButton);
        returnToMainPageButton.addEventListener('click', function(event) {
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

    // Display divE
    divE.style.display = 'block';
};

// Div F Logic ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const displayDivF = () => {
    const divFContent = $('#divF');

    // Clear existing content
    while (divFContent.firstChild) {
        divFContent.removeChild(divFContent.firstChild);
    }

    const title = document.createElement('h1');
    title.textContent = 'CNA - Warehouse Manifest';
    title.style.color = 'red';
    divFContent.appendChild(title);

    if (railSystem.warehouse.length === 0) {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No warehouse data available.';
        divFContent.appendChild(noDataMessage);
    } else {
        railSystem.warehouse.forEach(freight => {
            const entry = document.createElement('p');
            entry.textContent = `Transport ID: ${freight.transportId}, Description: ${freight.description}, Cargo Weight: ${freight.cargoWeight}`;
            divFContent.appendChild(entry);
        });

        const totalWeight = railSystem.warehouse.reduce((sum, freight) => sum + freight.cargoWeight, 0);
        const totalWeightEntry = document.createElement('p');
        totalWeightEntry.textContent = `Total Cargo Weight: ${totalWeight}`;
        divFContent.appendChild(totalWeightEntry);
    }

    // Add Return to Add Freight button
    if (!document.querySelector('#returnToAddFreightFromF')) {
        const returnToAddFreightButton = document.createElement('button');
        returnToAddFreightButton.textContent = 'Return To Add Freight';
        returnToAddFreightButton.id = 'returnToAddFreightFromF';
        returnToAddFreightButton.type = 'button';
        divFContent.appendChild(returnToAddFreightButton);
        returnToAddFreightButton.addEventListener('click', function(event) {
            divA.style.display = 'none';
            divB.style.display = 'none';
            divC.style.display = 'none';
            divD.style.display = 'block';
            divE.style.display = 'none';
            divF.style.display = 'none';
            divG.style.display = 'none';
            resetFreightForm();
            displayDivD();
        });
    }

    // Add Return to Main Page button
    if (!document.querySelector('#returnToMainPageFromF')) {
        const returnToMainPageButton = document.createElement('button');
        returnToMainPageButton.textContent = 'Return To Main Page';
        returnToMainPageButton.id = 'returnToMainPageFromF';
        returnToMainPageButton.type = 'button';
        divFContent.appendChild(returnToMainPageButton);
        returnToMainPageButton.addEventListener('click', function(event) {
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

    // Display divF
    divF.style.display = 'block';
};

// Div G Logic ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const displayDivG = () => {
    const divGContent = $('#divG');

    // Clear existing 
    while (divGContent.firstChild) {
        divGContent.removeChild(divGContent.firstChild);
    }

    const title = document.createElement('h1');
    title.textContent = 'CNA - Complete Freight Status';
    divGContent.appendChild(title);

    // Create table
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['Transport ID', 'Description', 'Weight', 'Status'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    // Populate the table with data from transportDataArray
    const addRow = (data, status) => {
        const row = document.createElement('tr');
        const values = [data.transportId, data.description, data.cargoWeight, status];
        values.forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    };

    railSystem.boxcars.forEach(boxcar => {
        boxcar.freights.forEach(freight => {
            addRow(freight, 'Boxcar');
        });
    });

    railSystem.warehouse.forEach(freight => {
        addRow(freight, 'Warehouse');
    });

    divGContent.appendChild(table);

    // Return to Main Page button
    const returnToMainPageButton = document.createElement('button');
    returnToMainPageButton.textContent = 'Return To Main Page';
    returnToMainPageButton.id = 'returnToMainPageFromG';
    returnToMainPageButton.type = 'button'; 
    divGContent.appendChild(returnToMainPageButton);
    returnToMainPageButton.addEventListener('click', function(event) {
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
};

// Initial Load Logic
document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.getAttribute('data-page');
    if (page === 'summary') {
        displaySummaryPage();
    } else {
        const divA = $("#divA");
        const divB = $("#divB");
        const divC = $("#divC");
        const divD = $("#divD");
        const divE = $("#divE");
        const divF = $("#divF");
        const divG = $("#divG");

        if (divA) {
            divA.style.display = 'block';
            displayDivA();
        }
        if (divB) divB.style.display = 'none';
        if (divC) divC.style.display = 'none';
        if (divD) divD.style.display = 'none';
        if (divE) divE.style.display = 'none';
        if (divF) divF.style.display = 'none';
        if (divG) divG.style.display = 'none';

        if (divA) daySystem();
    }
});


