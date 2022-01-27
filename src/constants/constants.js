import config from "../assets/config.json";

const BUTTONS = {
  measurement: config.measurement,
  season: config.season,
  tide: config.tide,
};

// Import all colorMaps from '../assets/colormaps/' as {fileName: path}
const colorMaps = require.context(
  "../assets/colormaps/",
  false,
  /\.(png|jpe?g|svg)$/
);
const ALL_COLOR_MAPS = colorMaps.keys().reduce(
  (obj, image) => ({
    ...obj,
    [image.replace("./", "").split(".")[0]]: colorMaps(image).default,
  }),
  {}
);

const MODEL_CONSTANTS = config.model

export { ALL_COLOR_MAPS, BUTTONS, MODEL_CONSTANTS };
export * as MODEL_DATA from "../assets/volume-min-max.json";
