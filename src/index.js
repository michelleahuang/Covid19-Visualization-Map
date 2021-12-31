import Globe from "./scripts/globe.js";
import instructions from "./scripts/instructions.js";

const canvas = document.getElementById("globe-canvas")
new Globe(canvas);
instructions();