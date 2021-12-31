import Globe from "./scripts/globe.js";
import instructions from "./scripts/instructions.js";
import getData from "./scripts/data.js";

const canvas = document.getElementById("globe-canvas")
new Globe(canvas);
instructions();
getData();