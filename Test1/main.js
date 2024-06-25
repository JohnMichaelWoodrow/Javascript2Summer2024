// //jquery or dom selector
// when using document.write it gotta be outside like up here
//

///////////////////

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







//var tableData = [];
    //var tableGenerated = false;
    
    //DOES IT BUT GENERATES HEADER EVERYTIME
    //
    // $("#processCargoForm").on("submit", function(event){
    //     event.preventDefault();
    //     var table = $("<table>");
    //     var headerRow = $("<tr>");
    //     headerRow.append("<th>Transport ID</th>");
    //     headerRow.append("<th>Description</th>");
    //     headerRow.append("<th>Cargo Weight</th>");
    //     table.append(headerRow);
    //     $("body").append(table);
    //     var transportID = $("#transportID").val();
    //     var description = $("#description").val();
    //     var cargoWeight = $("#cargoWeight").val();
    //     var newRow = $("<tr>");
    //     newRow.append("<td>" + transportID + "</td>");
    //     newRow.append("<td>" + description + "</td>");
    //     newRow.append("<td>" + cargoWeight + "</td>");
    //     table.append(newRow);
    // });
///////////////////////////CLOSER KINDA

    // function addRow(){
    //     var transportID = $('#transportID').val();
    //     var description = $('#description').val();
    //     var cargoWeight = $('#cargoWeight').val();

    //     tableData.push({transportID: transportID, description: description, cargoWeight: cargoWeight});
    //     $('#transportID').val('');
    //     $('#description').val('');
    //     $('#cargoWeight').val('');
    // };

    // function generateTable(){
    //     var table = $('<table>');
    //     var thead = $('<thead>');
    //     var headerRow = $('<tr>');
    //     headerRow.append($('<th>').text('Transport ID'));
    //     headerRow.append($('<th>').text('Description'));
    //     headerRow.append($('<th>').text('Cargo Weight'));
    //     thead.append(headerRow);
    //     table.append(thead);
    //     $('body').append(table);

    //     tableGenerated = true;

    //     var tableBody = $('table tableBody');
    //     $.each(tableData, function(index, item){
    //         var row = $('<tr>');
    //         row.append($('<td>').text(item.transportID));
    //         row.append($('<td>').text(item.description));
    //         row.append($('<td>').text(item.cargoWeight));
    //         tableBody.append(row);
    //     });
    // };

    // $("#processCargoForm").on("submit", function(event){
    //     event.preventDefault();
    //     addRow();
    //     generateTable();
    // });

    ////////////////////////////////////////////////////////////////////////////

    // $("#processCargoForm").on("submit", (event) => {
    //     event.preventDefault();
        // var processCargoHeading = document.createElement("h2");
        // var dataRow = document.createElement("tr");
        // var transportID = document.createElement("tr");
        // var description = document.createElement("tr");
        // var cargoWeight = document.createElement("tr");
        // processCargoHeading.textContent = $("Cargo Box Car Manifest For Box Car XXXXX").val();
        // transportID.textContent = $("#transportID").val();
        // description.textContent = $("#description").val();
        // cargoWeight.textContent = $("#cargoWeight").val();
        // dataRow.appendChild(transportID);
        // dataRow.appendChild(description);
        // dataRow.appendChild(cargoWeight);

    //     $("table").append(dataRow);
    // });

//////////////////////////////////////////////////////////
//OG TRY
///////////////////////////////////////////////////////////

// document.write("test");

// document.addEventListener('DOMContentLoaded', function(){
// ///////    document.getElementById('processCargoButton').addEventListener('click', function(){
//         processCargo();
//     });
// });

// processCargo = () => {
//     $("h2").append("Some appended text.");
// };

// CAN USE
//   doc write
//   create Element
//   append
//   insert Before
//   jquery