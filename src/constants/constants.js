import CONFIG from "../assets/config.json";

const MODEL_CONSTANTS = CONFIG.model;

const BUTTONS = {
  measurement: CONFIG.measurement,
  season: CONFIG.season,
  tide: CONFIG.tide,
};

// Import all colorMaps from '../assets/colormaps/' as {fileName: path}
const colorMaps = require.context(
  "../assets/colormaps/",
  false,
  /\.(png|jpe?g|svg)$/
);
const ALL_COLOR_MAPS = colorMaps.keys().map((image) => ({
  name: image.replace("./", "").split(".")[0],
  path: colorMaps(image),
}));

export { ALL_COLOR_MAPS, BUTTONS, MODEL_CONSTANTS };
export * as MODEL_DATA from "../assets/volume-min-max.json";
