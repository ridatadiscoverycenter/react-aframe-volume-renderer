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

export default function App() {
  const [controlsVisible, setControlsVisible] = useState(false);

  const [selection, setSelection] = useState({
    season: BUTTONS.season[0],
    tide: BUTTONS.tide[0],
    measurement: BUTTONS.measurement[0],
  });
  const [colorMap, setColorMap] = useState(ALL_COLOR_MAPS.Haline);

  console.log("APP", selection);

  return (
    <div id="visualizer">
      <Header />
      <InfoText selection={selection} />
      <ModelSelector
        BUTTONS={BUTTONS}
        ALL_COLOR_MAPS={ALL_COLOR_MAPS}
        CONFIG_MIN_MAX={CONFIG_MIN_MAX}
        selection={selection}
        setSelection={setSelection}
        setColorMap={setColorMap}
        toggleControls={() => setControlsVisible(!controlsVisible)}
      />
      <VolumeViewerWrapper
        ALL_COLOR_MAPS={ALL_COLOR_MAPS}
        CONFIG_MIN_MAX={CONFIG_MIN_MAX}
        colorMap={colorMap}
        selection={selection}
        controlsVisible={controlsVisible}
      />
      <Instructions />
      <Footer />
    </div>
  );
}
