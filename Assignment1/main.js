
"use strict";
var table;
var header;
var totalCargoWeight = 0;

function resetForm(event) {
    event.preventDefault();
    document.querySelector('#transportForm').reset();
    if (table) {
        document.body.removeChild(table);
        table = null;
    }

    if (header) {
        document.body.removeChild(header);
        header = null;
    }

    const totalCargoWeightElement = document.querySelector('#totalCargoWeight');
    if (totalCargoWeightElement) {
        document.body.removeChild(totalCargoWeightElement);
    }

    totalCargoWeight = 0;
}

function addRow() {
    const transportID = document.querySelector('#transportID').value;
    const description = document.querySelector('#description').value;
    const cargoWeight = parseFloat(document.querySelector('#cargoWeight').value);
    const newRow = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = transportID;
    newRow.appendChild(td1);
    const td2 = document.createElement('td');
    td2.textContent = description;
    newRow.appendChild(td2);
    const td3 = document.createElement('td');
    td3.textContent = cargoWeight;
    newRow.appendChild(td3);
    table.appendChild(newRow);

    totalCargoWeight += cargoWeight;
    document.querySelector('#totalCargoWeight').textContent = `Total Cargo Weight: ${totalCargoWeight}`;
}

function generateTable() {
    if (!header) {
        header = document.createElement('h3');
        header.textContent = "Cargo Box Car Manifest for Box Car XXXXX";
        document.body.appendChild(header);
    }

    if (!table) {
        table = document.createElement('table');
        const headerRow = document.createElement('tr');
        const th1 = document.createElement('th');
        th1.textContent = 'Transport ID';
        headerRow.appendChild(th1);
        const th2 = document.createElement('th');
        th2.textContent = 'Description';
        headerRow.appendChild(th2);
        const th3 = document.createElement('th');
        th3.textContent = 'Cargo Weight';
        headerRow.appendChild(th3);
        table.appendChild(headerRow);
        document.body.appendChild(table);

        const totalCargoWeightElement = document.createElement('div');
        totalCargoWeightElement.id = 'totalCargoWeight';
        totalCargoWeightElement.textContent = `Total Cargo Weight: ${totalCargoWeight}`;
        document.body.appendChild(totalCargoWeightElement);
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
});





