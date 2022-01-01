import Globe from "./scripts/globe.js";
import instructions from "./scripts/instructions.js";
import createChart from "./scripts/chart.js";

const canvas = document.getElementById("globe-canvas")
const ctx = document.getElementById("chart").getContext("2d");

const globe = new Globe(canvas);
// globe.addCountries();

instructions();
createChart(ctx);

