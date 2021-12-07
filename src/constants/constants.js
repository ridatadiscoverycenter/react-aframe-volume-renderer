import config from "../assets/config.json";
import MODEL_DATA from "../assets/volume-min-max.json";

// Import all colorMaps from '../assets/colormaps/' as {fileName: path}
const colorMaps = require.context('../assets/colormaps/', false, /\.(png|jpe?g|svg)$/)
const ALL_COLOR_MAPS = colorMaps.keys().reduce((prev, image) => (
  { 
    ...prev, 
    [image.replace('./', '').split(".")[0]]: colorMaps(image).default
  }
), {})

const BUTTONS = {
  season: config.season,
  tide: config.tide,
  measurement: config.measurement,
};

const MODEL_CONSTANTS = config.model

export { ALL_COLOR_MAPS, BUTTONS, MODEL_CONSTANTS, MODEL_DATA };
