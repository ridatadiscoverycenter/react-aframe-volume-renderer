import React, { useState } from "react";

import Header from "./components/Header";
import InfoText from "./components/InfoText";
import ModelSelector from "./components/ModelSelector";
import VolumeViewerWrapper from "./components/VolumeViewerWrapper";
import Instructions from "./components/instructions/Instructions";
import Footer from "./components/Footer";
import "./styles/main.scss";

import { ALL_COLOR_MAPS, BUTTONS } from "./constants/constants";

export default function App() {
  const [controlsVisible, setControlsVisible] = useState(false);

  const [colorMap, setColorMap] = useState(ALL_COLOR_MAPS.Haline);
  const [selection, setSelection] = useState(
    Object.keys(BUTTONS).reduce(
      (obj, key) => ({
        ...obj,
        [key]: BUTTONS[key][0],
      }),
      {}
    )
  );

  return (
    <div id="visualizer">
      <Header />
      <InfoText selection={selection} />
      <ModelSelector
        selection={selection}
        setSelection={setSelection}
        setColorMap={setColorMap}
        toggleControls={() => setControlsVisible(!controlsVisible)}
      />
      <VolumeViewerWrapper
        colorMap={colorMap}
        selection={selection}
        controlsVisible={controlsVisible}
      />
      <Instructions />
      <Footer />
    </div>
  );
}
