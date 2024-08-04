"use strict";
const $ = selector => document.querySelector(selector);

// Function to get a cookie value
const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            console.log(`Getting cookie: ${name}=${c.substring(nameEQ.length, c.length)}`);
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};

// Function to display the summary page
const displaySummaryPage = () => {
    const summaryContainer = document.getElementById('summaryContainer');
    if (!summaryContainer) {
        console.log('Summary container not found.');
        return;
    }

    summaryContainer.innerHTML = '';
    const header = document.createElement('h1');
    header.textContent = 'Summary Display';
    summaryContainer.appendChild(header);
    const form = document.createElement('form');
    form.id = 'summaryForm';
    const fields = [
        { label: 'Total Weight in Boxcars', id: 'totalWeightBoxcars', type: 'text', readOnly: true },
        { label: 'Total Weight in Warehouses', id: 'totalWeightWarehouses', type: 'text', readOnly: true },
        { label: 'CNA Rail System Total Weight', id: 'totalWeightSystem', type: 'text', readOnly: true }
    ];

    fields.forEach(field => {
        const fieldContainer = document.createElement('div');
        fieldContainer.style.display = 'flex';
        fieldContainer.style.alignItems = 'center';
        fieldContainer.style.marginBottom = '10px';
        const label = document.createElement('label');
        label.htmlFor = field.id;
        label.textContent = field.label;
        label.style.width = '200px';
        const input = document.createElement('input');
        input.id = field.id;
        input.type = field.type;
        input.readOnly = field.readOnly;
        fieldContainer.appendChild(label);
        fieldContainer.appendChild(input);
        form.appendChild(fieldContainer);
    });

    summaryContainer.appendChild(form);

    // Return to Main Page button
    const returnToMainPageButton = document.createElement('button');
    returnToMainPageButton.textContent = 'Return to Main Page';
    returnToMainPageButton.id = 'returnToMainPage';
    returnToMainPageButton.type = 'button';
    summaryContainer.appendChild(returnToMainPageButton);

    returnToMainPageButton.addEventListener('click', function(event) {
        window.location.href = 'main.html'; 
    });

    populateSummaryForm();
}

// Function to populate the summary form with data
const populateSummaryForm = () => {
    const totalWeightBoxcars = getCookie('totalWeightInBoxcars') || 0;
    const totalWeightWarehouses = getCookie('totalWeightInWarehouses') || 0;
    const totalWeightSystem = parseFloat(totalWeightBoxcars) + parseFloat(totalWeightWarehouses);
    $('#totalWeightWarehouses').value = totalWeightWarehouses;
    $('#totalWeightSystem').value = totalWeightSystem;
    console.log(`Populated summary form: totalWeightBoxcars=${totalWeightBoxcars}, totalWeightWarehouses=${totalWeightWarehouses}, totalWeightSystem=${totalWeightSystem}`);
}

// Initial Load Logic
document.addEventListener("DOMContentLoaded", () => {
    displaySummaryPage();
});