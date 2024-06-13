"use strict";

const $ = selector => document.querySelector(selector);
const selAll = selector => document.querySelectorAll(selector);
var master_clock_var = 0;
var master_clock_step_var = 0;
var power_level_var = 0;
var power_level_step_var = 0;
var charge_status = 0;
var driving_status = 0;
var timer_running = false;

const displayError = (message) => {
  const errorSpan = $("#speed_error");
  errorSpan.textContent = message;
  errorSpan.style.display = "inline";
}

const hideError = () => {
  const errorSpan = $("#speed_error");
  errorSpan.style.display = "none";
}

const updateStatus = (message) => {
  const statusSpan = $("#status_message");
  statusSpan.textContent = message;
}

const reset_system = () => {
  master_clock_var = 0;
  power_level_var = 0;
  master_clock_step_var = 0;
  charge_status = 0;
  driving_status = 0;
  $("#timer_id").value = master_clock_var;
  $("#battery_power_id").value = power_level_var;
  $("#speed_KMH_id").value = 0;
  $("#speed_KMM_id").value = 0;
  $("#battery_min_id").value = 0;
  $("#battery_charge_id").checked = false;
  $("#battery_drain_id").checked = false;
  $("#battery_charge_id").disabled = false;
  $("#battery_drain_id").disabled = false;
  hideError();
  updateStatus("Reset Simulator");
}

const drive_car = () => {
  let speedKMH = parseInt($("#speed_KMH_id").value);
  if (isNaN(speedKMH) || speedKMH < 1 || speedKMH > 240) {
    alert("Speed must be a number between 1 and 240.");
    displayError("Invalid Input");
    return;
  }
  hideError();
  driving_status = 1;
  charge_status = 0;
  power_level_step_var = -1;
  const driving_indicator = $("#battery_drain_id");
  const charging_indicator = $("#battery_charge_id");
  driving_indicator.checked = true;
  charging_indicator.checked = false;
  driving_indicator.disabled = true;
  charging_indicator.disabled = true;
  alert("Driving Car");
  start_timer();
  updateStatus("Driving Car");
}

const drive_car_process = () => {
  let speedKMH = parseInt($("#speed_KMH_id").value);
  let speedKMM = speedKMH / 60;
  $("#speed_KMM_id").value = speedKMM.toFixed(2);

  let batteryMinLeft = power_level_var / speedKMM;
  $("#battery_min_id").value = batteryMinLeft.toFixed(2);

  power_level_var -= speedKMM;
  if (power_level_var <= 0) {
    power_level_var = 0;
    alert("Battery depleted.");
    driving_status = 0;
    $("#battery_drain_id").checked = false;
    $("#battery_drain_id").disabled = false;
    $("#battery_charge_id").disabled = false;
    updateStatus("Battery Depleted");
  }
  $("#battery_power_id").value = power_level_var.toFixed(2);
}

const charge_battery = () => {
  driving_status = 0
  charge_status = 1;
  power_level_step_var = 1
  const driving_indicator = $("#battery_drain_id");
  const charging_indicator = $("#battery_charge_id");
  driving_indicator.checked = false;
  charging_indicator.checked = true;
  driving_indicator.disabled = true;
  charging_indicator.disabled = true;
  alert("Charging Battery");
  start_timer();
  updateStatus("Battery Charging");
}

const start_timer = () => {
  if (!timer_running) {
    alert("Timer Started");
    master_clock_step_var = 1;
    setInterval(tick, 2000);
    timer_running = true;
    updateStatus("Simulator Started");
  }
}

const tick = () => {
  // alert("Tick");
  master_clock_var += master_clock_step_var;
  $("#timer_id").value = master_clock_var;

  if (charge_status === 1) {
    power_level_var += 12;
    if (power_level_var >= 100) {
      power_level_var = 100;
      charge_status = 0;
      alert("Battery fully charged.");
      $("#battery_charge_id").checked = false;
      updateStatus("Battery Charged");
    }
    $("#battery_power_id").value = power_level_var;
  }
  if (driving_status === 1) {
    drive_car_process();
  }
}

document.addEventListener("DOMContentLoaded",
  () => {
    $("#charge_battery_btn").addEventListener("click", charge_battery);
    $("#drive_car_btn").addEventListener("click", drive_car);
    $("#start_btn").addEventListener("click", start_timer);
    $("#reset_btn").addEventListener("click", reset_system);
    hideError();
    updateStatus("Simulator not started yet");
  });
