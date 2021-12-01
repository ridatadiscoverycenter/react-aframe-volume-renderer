import React, { useState } from "react";

import "./styles/main.scss";

import Header from "./components/Header";
import InfoText from "./components/InfoText";
import ModelSelector from "./components/ModelSelector";
import VolumeViewerWrapper from "./components/VolumeViewerWrapper";
import Instructions from "./components/instructions/Instructions";
import Footer from "./components/Footer";

// TODO: Import VolumeViewer from package
// TODO: Change the way color maps are passed in
// TODo: Add Add colorMap, path to state (controls-context to selector-context)
// TODO: Rename context file and delete controls
export default function App() {
  const [controlsVisible, setControlsVisible] = useState(false);

  return (
    <div id="visualizer">
      <Header />
      <InfoText />
      <ModelSelector
        toggleControls={() => setControlsVisible(!controlsVisible)}
      />
      <VolumeViewerWrapper controlsVisible={controlsVisible} />
      <Instructions />
      <Footer />
    </div>
  );
}
