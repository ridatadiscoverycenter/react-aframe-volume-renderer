import React, { useState } from "react";

import "./styles/main.scss";
import { BUTTONS } from "./constants/constants";

import Header from "./components/Header";
import InfoText from "./components/InfoText";
import ModelSelector from "./components/ModelSelector";
import VolumeViewerWrapper from "./components/VolumeViewerWrapper";
import Instructions from "./components/instructions/Instructions";
import Footer from "./components/Footer";

export default function App() {
  const [controlsVisible, setControlsVisible] = useState(false);

  const [colorMap, setColorMap] = useState("salt");
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
