import { season, tide, measurement, model } from "../assets/config.json";

const BUTTONS = {
  measurement: measurement,
  season: season,
  tide: tide,
};

// Import all colorMaps from '../assets/colormaps/' as {fileName: path}
// TODO: Should be {name: [name], path: [path]}
const colorMaps = require.context(
  "../assets/colormaps/",
  false,
  /\.(png|jpe?g|svg)$/
);
const ALL_COLOR_MAPS = colorMaps.keys().map((image) => ({
  name: image.replace("./", "").split(".")[0],
  path: colorMaps(image).default,
}));

export { ALL_COLOR_MAPS, BUTTONS };
export { model as MODEL_CONSTANTS };
export * as MODEL_DATA from "../assets/volume-min-max.json";
