"use strict"

// var day_val = 1;

// $(document).ready(() => {
//   $("#day_id").val(day_val);
//   // reset_form();

//   $("#yn_input_id").change(evt => { next_day() })
// });

// const next_day = () => {
//   var yn = $("#yn_input_id").val();
//   if (yn == "Y" || yn == "y") {
//     day_val++;
//     $("#day_id").val(day_val);
//   }
//   $("#yn_input_id").val("");
// }

// const check_precipitation_input = () => {
//   var precipitation_input_ele = $("#precipitation_input_id");
//   var precipitation_input_txt = precipitation_input_ele.val();
//   var precipitation_input_val = -1;
//   error_status_p = false;

//   if (isNaN(precipitation_input_txt) ||
//     precipitation_input_txt == "") {
//     error_status_p = true;
//     precipitation_input_ele.next().text("Error - Not a Number");
//     $("inches_display_id").val("0");
//   }
//   else {
//     precipitation_input_val = parseInt(precipitation_input_txt);

//     if (precipitation_input_val < 0 ||
//       precipitation_input_val > 1000) {
//       error_status_p = true;
//       precipitation_input_ele.next().text("Error - <0 or > 1000");
//       $("#inches_display_id").val("0");
//     }
//     else {
//       precipitation_input_ele.next().text("");
//       var inches_val = 0;
//       $("#inches_display_id").val(inches_val);
//     }
//   }
// }

// const reset_form = () => {
//   $("#precipitation_input_id").val("0");
//   $("#precipitation_input_id").next().text("");
//   $("inches_display_id").val("0");
//   $("rain_selected_id").checked = true;
//   $("snow_selected_id").checked = false;
// }
/////////////////////////////////////////////////////////////////
const $ = selector => document.querySelector(selector);
let currentDay = 1;
let dataArray = [];

const validateData = () => {
  const dataInput = parseFloat($('#precipitation_input_id').value);
  const confirmSection = $('#yn_input_id');
  const dataFeedback = $('#data_feedback');

  if (isNaN(dataInput) || dataInput < 0 || dataInput > 100) {
    //dataFeedback.textContent
    confirmSection.style.display = 'none';
  } else {
    //dataFeedback.textContent = "*";
    confirmSection.style.display = 'block';
  }
};

const processInput = () => {
  const dataInput = parseFloat($('#precipitation_input_id').value);
  const qualify = document.querySelector('input[name="selection_choice"]:checked')?.value;
  const totalRainInput = $('#rain_total_id');
  const totalSnowInput = $('#snow_total_id');

  if (isNaN(dataInput) || dataInput < 0 || dataInput > 100) {
    return
  }

  if (!qualify) {
    qualifyFeedback.textContent = "Please Select";
    return;
  } else {
    //qualifyFeedback.textContent = "";
  }
  const currentRainTotal = parseFloat(totalRainInput.value || 0);
  const newRainTotal = currentRainTotal + dataInput;
  totalRainInput.value = newRainTotal.toFixed(2);

  const currentSnowTotal = parseFloat(totalSnowInput.value || 0);
  const newSnowTotal = currentSnowTotal + dataInput;
  totalSnowInput.value = newSnowTotal.toFixed(2);

  const entry = `Day ${currentDay}: Data: ${dataInput.toFixed(2)}, Percipitation Type: ${qualify}, Rain Total: ${newRainTotal.toFixed(2)}, Snow Total: ${newSnowTotal.toFixed(2)}`;
  dataArray[dataArray.length] = entry;

  currentDay++;

  if(currentDay > 5) {
    displayResults();
  } else {
    $('#precipitation_input_id').value = '';
    //document.querySelector('input[name="rain_selected_id"]:checked').checked=false;
    //document.querySelector('input[name="snow_selected_id"]:checked').checked=false;
    validateData();
  }

  //$('#data_feedback') .textContent = "*";
};

const displayResults = () => {
  const resultList = document.createElement('ul');
  resultList.id = 'result_list';
  $('#results_id').appendChild(resultList);

  while (resultList.firstChild) {
    resultList.removeChild(resultList.firstChild);
  }

  for (let i = dataArray.length - 1; i >= 0; i--) {
    const li = document.createElement('li');
    li.textContent = dataArray[i];
    resultList.appendChild(li);
  }

  $('#results_id').style.display = 'block';
  $('#current_totals').style.display = 'none';
  $('#data_entry_id').style.display = 'none';
  $('#yn_id').style.display = 'none';
};

const resetData = () => {
  $('#precipitation_input_id').value = '';
  //document.querySelector('input[name="rain_selected_id"]:checked').checked=false;
  //document.querySelector('input[name="snow_selected_id"]:checked').checked=false;
  $('#rain_total_id').value = '';
  $('#snow_total_id').value = '';

  //list results
};

document.addEventListener('DOMContentLoaded', () => {
  $('#precipitation_input_id').addEventListener("input", validateData);

  $('#yn_input_id').addEventListener("input", (event) => {
    if (event.target.value.toLowerCase() === 'y') {
      processInput();
      event.target.calue = '';
    }
  });

  //$("#clear_fields_id").addEventListener("click", resetData);
});
