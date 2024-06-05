"use strict";
var manifestTable;
var manifestHeader;
var cargoStatusTable;
var totalCargoWeight = 0;
const emptyWeight = 15000;
const maxWeight = 105000;

function resetForm(event) {
    event.preventDefault();
    document.querySelector('#transportForm').reset();
    
    if (manifestTable) {
        manifestTable.closest('div').remove();
        manifestTable = null;
    }

    if (cargoStatusTable) {
        cargoStatusTable.closest('div').remove();
        cargoStatusTable = null;
    }

    const totalCargoWeightElement = document.querySelector('#totalCargoWeight');
    if (totalCargoWeightElement) {
        document.body.removeChild(totalCargoWeightElement);
    }

    totalCargoWeight = 0;
    document.querySelector('#totalWeight').value = emptyWeight;
    const totalWeightDisplay = document.querySelector('#totalWeightDisplay');
    if (totalWeightDisplay) {
        totalWeightDisplay.remove();
    }
}

function addRowToTable(table, rowData) {
    const newRow = document.createElement('tr');
    rowData.forEach(data => {
        const td = document.createElement('td');
        td.textContent = data;
        newRow.appendChild(td);
    });
    table.appendChild(newRow);
}

function addRow() {
    const transportID = document.querySelector('#transportID').value.trim();
    const description = document.querySelector('#description').value.trim();
    const cargoWeight = parseFloat(document.querySelector('#cargoWeight').value);

    if (transportID === "") {
        alert("Transport ID cannot be empty.");
        return;
    }

    if (description === "") {
        alert("Description cannot be empty.");
        return;
    }

    if (isNaN(cargoWeight)) {
        alert("Cargo Weight must be a numeric value.");
        return;
    }

    if (cargoWeight < 1 || cargoWeight > (maxWeight - emptyWeight)) {
        alert(`Cargo Weight must be between 1 and ${maxWeight - emptyWeight}.`);
    }

    let status;
    if ((totalCargoWeight + cargoWeight) > (maxWeight - emptyWeight)) {
        alert("Cargo weight exceeds the maximum weight limit for the box car.");
        status = "Warehouse";
    } else {
        status = "BX500";
        totalCargoWeight += cargoWeight;
        addRowToTable(manifestTable, [transportID, description, cargoWeight]);
        document.querySelector('#totalWeight').value = emptyWeight + totalCargoWeight;
        document.querySelector('#totalWeightDisplay').textContent = `Total Weight: ${totalCargoWeight}`;
    }
    addRowToTable(cargoStatusTable, [transportID, description, cargoWeight, status]);
}

function generateTable() {
    if (!cargoStatusTable) {
        const cargoStatusDiv = document.createElement('div');
        cargoStatusDiv.id = 'cargoStatus';
        const cargoStatusHeader = document.createElement('h3');
        cargoStatusHeader.textContent = "Cargo Status";
        cargoStatusDiv.appendChild(cargoStatusHeader);
        const cargoStatusTableElem = document.createElement('table');
        const cargoStatusHeaderRow = document.createElement('tr');
        const th1 = document.createElement('th');
        th1.textContent = 'Transport ID';
        const th2 = document.createElement('th');
        th2.textContent = 'Description';
        const th3 = document.createElement('th');
        th3.textContent = 'Weight';
        const th4 = document.createElement('th');
        th4.textContent = 'Status';
        cargoStatusHeaderRow.appendChild(th1);
        cargoStatusHeaderRow.appendChild(th2);
        cargoStatusHeaderRow.appendChild(th3);
        cargoStatusHeaderRow.appendChild(th4);
        cargoStatusTableElem.appendChild(cargoStatusHeaderRow);
        cargoStatusTable = document.createElement('tbody');
        cargoStatusTableElem.appendChild(cargoStatusTable);
        cargoStatusDiv.appendChild(cargoStatusTableElem);
        document.body.appendChild(cargoStatusDiv);
    }

    if (!manifestTable) {
        const manifestDiv = document.createElement('div');
        manifestDiv.id = 'manifest';
        const manifestHeader = document.createElement('h3');
        manifestHeader.textContent = "Manifest: BX500";
        manifestDiv.appendChild(manifestHeader);
        const manifestTableElem = document.createElement('table');
        const manifestHeaderRow = document.createElement('tr');
        const th1 = document.createElement('th');
        th1.textContent = 'Transport ID';
        const th2 = document.createElement('th');
        th2.textContent = 'Description';
        const th3 = document.createElement('th');
        th3.textContent = 'Weight';
        manifestHeaderRow.appendChild(th1);
        manifestHeaderRow.appendChild(th2);
        manifestHeaderRow.appendChild(th3);
        manifestTableElem.appendChild(manifestHeaderRow);
        manifestTable = document.createElement('tbody');
        manifestTableElem.appendChild(manifestTable);
        manifestDiv.appendChild(manifestTableElem);
        const totalWeightDisplay = document.createElement('div');
        totalWeightDisplay.id = 'totalWeightDisplay';
        totalWeightDisplay.textContent = `Total Weight: ${totalCargoWeight}`;
        manifestDiv.appendChild(totalWeightDisplay); 
        document.body.appendChild(manifestDiv);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Document is ready!");

    const transportForm = document.querySelector('#transportForm');
    transportForm.addEventListener('submit', function(event) {
        event.preventDefault();
        generateTable();
        addRow();
    });

    const resetButton = transportForm.querySelector('#resetButton');
    resetButton.addEventListener('click', function(event) {
        resetForm(event);
    });

    document.querySelector('#totalWeight').value = emptyWeight;
});
