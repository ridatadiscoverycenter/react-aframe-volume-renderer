import config from "../assets/config.json";
import MODEL_DATA from "../assets/volume-min-max.json";

import haline from "../assets/colormaps/haline.png";
import thermal from "../assets/colormaps/thermal.png";

const ALL_COLOR_MAPS = {
  Haline: haline,
  Thermal: thermal,
};

const BUTTONS = {
  season: config.season,
  tide: config.tide,
  measurement: config.measurement,
};

const MODEL_CONSTANTS = {
  position: config.volumePosition,
  rotation: config.volumeRotation,
  scale: config.volumeScale,
  slices: config.slices,
  spacing: {
    x: config.x_spacing,
    y: config.y_spacing,
    z: config.z_spacing,
  },
};

export { ALL_COLOR_MAPS, BUTTONS, MODEL_CONSTANTS, MODEL_DATA };
