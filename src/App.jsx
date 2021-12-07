import React, { useState } from "react";

import config from "./assets/config.json";
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

export default function App() {
  const [controlsVisible, setControlsVisible] = useState(false);

  const [colorMap, setColorMap] = useState(ALL_COLOR_MAPS.Haline);
  const [selection, setSelection] = useState(
    Object.keys(BUTTONS).reduce((obj, key) => (
      {
        ...obj, 
        [key]: BUTTONS[key][0]
      }
    ), {})
  );
  

  return (
    <div id="visualizer">
      <Header />
      <InfoText selection={selection} />
      <ModelSelector
        BUTTONS={BUTTONS}
        ALL_COLOR_MAPS={ALL_COLOR_MAPS}
        selection={selection}
        setSelection={setSelection}
        setColorMap={setColorMap}
        toggleControls={() => setControlsVisible(!controlsVisible)}
      />
      <VolumeViewerWrapper
        ALL_COLOR_MAPS={ALL_COLOR_MAPS}
        colorMap={colorMap}
        selection={selection}
        controlsVisible={controlsVisible}
      />
      <Instructions />
      <Footer />
    </div>
  );
}
