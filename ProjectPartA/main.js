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

// Arrays to store Boxcar & Freight data
const boxcarDataArray = [];
const transportDataArray = [];
const warehouseDataArray = [];

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
    const options = ['Create Boxcar', 'Add Freight', 'Boxcar Data', 'Warehouse Data', 'All Freight Status'];

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

        boxcarDataArray.push(boxcarData);
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

        boxcarDataArray.forEach((boxcar, index) => {
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
        boxcarDataArray.forEach(boxcarData => {
            addRowToTable(boxcarData);
        });

        const totalRow = document.createElement('tr');
        const totalLabelCell = document.createElement('td');
        totalLabelCell.colSpan = 4;
        totalLabelCell.textContent = 'Total Cargo Weight:';
        const totalValueCell = document.createElement('td');
        const totalCargoWeight = boxcarDataArray.reduce((sum, boxcar) => sum + parseFloat(boxcar.cargoWeight), 0);
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
    boxcarDataArray.forEach((boxcar, index) => {
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
        const transportId = $('#transportId').value;
        if (!transportId.trim()) {
            $('#transportIdError').textContent = 'Transport ID cannot be empty';
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

        transportDataArray.push(freightData);
        updateBoxcarData(freightData);
        resetFreightForm();
    };

    // Update boxcar data
    const updateBoxcarData = (freightData) => {
        const boxcar = boxcarDataArray.find(b => b.boxcarId === freightData.boxcarId);
        if (boxcar) {
            const newGrossWeight = boxcar.grossWeight + freightData.cargoWeight;
            console.log(`Current gross weight: ${boxcar.grossWeight}`);
            console.log(`Freight cargo weight: ${freightData.cargoWeight}`);
            console.log(`New gross weight: ${newGrossWeight}`);
            console.log(`Max gross weight for boxcar ${boxcar.boxcarId}: ${boxcar.maxGrossWeight}`);

            if (newGrossWeight <= boxcar.maxGrossWeight) {
                boxcar.cargoWeight += freightData.cargoWeight;
                boxcar.grossWeight = newGrossWeight;
                console.log('Freight data added to boxcar:', freightData);
            } else {
                warehouseDataArray.push(freightData);
                transportDataArray.splice(transportDataArray.indexOf(freightData), 1); // Remove from transportDataArray
                console.log('Freight data added to warehouse:', freightData);
            }
        }
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

    if (boxcarDataArray.length === 0) {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No boxcar data available.';
        divEContent.appendChild(noDataMessage);
    } else {
        boxcarDataArray.forEach(boxcar => {
            const boxcarEntry = document.createElement('p');
            boxcarEntry.textContent = `Boxcar ID: ${boxcar.boxcarId}, Total Cargo Weight: ${boxcar.cargoWeight}`;
            divEContent.appendChild(boxcarEntry);

            // Find all transport data associated with the current boxcar
            transportDataArray.forEach(data => {
                if (data.boxcarId === boxcar.boxcarId) {
                    const entry = document.createElement('p');
                    entry.textContent = `Transport ID: ${data.transportId}, Description: ${data.description}, Cargo Weight: ${data.cargoWeight}`;
                    divEContent.appendChild(entry);
                }
            });
        });

        const totalWeight = boxcarDataArray.reduce((sum, boxcar) => sum + boxcar.cargoWeight, 0);
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

    if (warehouseDataArray.length === 0) {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No warehouse data available.';
        divFContent.appendChild(noDataMessage);
    } else {
        warehouseDataArray.forEach(data => {
            const entry = document.createElement('p');
            entry.textContent = `Boxcar ID: ${data.boxcarId}, Transport ID: ${data.transportId}, Description: ${data.description}, Cargo Weight: ${data.cargoWeight}`;
            divFContent.appendChild(entry);
        });

        const totalWeight = warehouseDataArray.reduce((sum, data) => sum + data.cargoWeight, 0);
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

    transportDataArray.forEach(data => {
        addRow(data, data.boxcarId);
    });

    // Populate the table with data from warehouseDataArray
    warehouseDataArray.forEach(data => {
        addRow(data, 'Warehouse');
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
    divA.style.display = 'block';
    divB.style.display = 'none';
    divC.style.display = 'none';
    divD.style.display = 'none';
    divE.style.display = 'none';
    divF.style.display = 'none';
    divG.style.display = 'none';
    displayDivA();
});
