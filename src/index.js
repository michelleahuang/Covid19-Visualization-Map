import Globe from "./scripts/globe.js";
import instructions from "./scripts/instructions.js";
import createChart from "./scripts/chart.js";

const canvas = document.getElementById("globe-canvas")
const ctx = document.getElementById('chart').getContext('2d');

new Globe(canvas);
instructions();

createChart(ctx);

