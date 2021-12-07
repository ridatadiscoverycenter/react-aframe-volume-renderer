import { season, tide, measurement, model } from "../assets/config.json";

const BUTTONS = {
  measurement: measurement,
  season: season,
  tide: tide,
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

export { ALL_COLOR_MAPS, BUTTONS };
export { model as MODEL_CONSTANTS };
export * as MODEL_DATA from "../assets/volume-min-max.json";
