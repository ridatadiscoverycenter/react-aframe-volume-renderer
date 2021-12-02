import React, { useState } from "react";

import config from "./assets/config.json";
import configMinMax from "./assets/volume-min-max.json";
import haline from "./assets/colormaps/haline.png";
import thermal from "./assets/colormaps/thermal.png";

import Header from "./components/Header";
import InfoText from "./components/InfoText";
import ModelSelector from "./components/ModelSelector";
import VolumeViewerWrapper from "./components/VolumeViewerWrapper";
import Instructions from "./components/instructions/Instructions";
import Footer from "./components/Footer";
import "./styles/main.scss";

const ALL_COLOR_MAPS = {
  Haline: haline,
  Thermal: thermal,
};
const BUTTONS = {
  season: config.season,
  tide: config.tide,
  measurement: config.measurement,
};
const CONFIG_MIN_MAX = configMinMax;

function getModel(selection) {
  return `${selection.season.value}-${selection.tide.value}-${selection.measurement.value}`;
}

export default function App() {
  const [controlsVisible, setControlsVisible] = useState(false);

  const [selection, setSelection] = useState({
    season: BUTTONS.season[0],
    tide: BUTTONS.tide[0],
    measurement: BUTTONS.measurement[0],
  });
  const [colorMap, setColorMap] = useState(ALL_COLOR_MAPS.Haline);

  const [model, setModel] = useState({
    path: `./assets/models/${getModel(selection)}.png`,
    range: CONFIG_MIN_MAX[getModel(selection)],
    position: config.volumePosition,
    rotation: config.volumeRotation,
    scale: config.volumeScale,
    slices: config.slices,
    spacing: {
      x: config.x_spacing,
      y: config.y_spacing,
      z: config.z_spacing,
    },
  });

  console.log(selection, colorMap, model);

  return (
    <div id="visualizer">
      <Header />
      <InfoText selection={selection} />
      <ModelSelector
        BUTTONS={BUTTONS}
        ALL_COLOR_MAPS={ALL_COLOR_MAPS}
        CONFIG_MIN_MAX={CONFIG_MIN_MAX}
        selection={selection} setSelection={setSelection}
        setColorMap={setColorMap}
        setModel={setModel}
        toggleControls={() => setControlsVisible(!controlsVisible)}
      />
      <VolumeViewerWrapper
        ALL_COLOR_MAPS={ALL_COLOR_MAPS}
        colorMap={colorMap}

        model={model}
        controlsVisible={controlsVisible}
      />
      <Instructions />
      <Footer />
    </div>
  );
}
