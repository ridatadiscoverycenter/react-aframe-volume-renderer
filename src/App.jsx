import React, { useState } from "react";
import "aframe";
import "aframe-event-set-component";
import "aframe-orbit-controls";

import "./VolumeViewer-package/Aframe/loader.js";
import "./VolumeViewer-package/Aframe/buttons-check.js";
import "./VolumeViewer-package/Aframe/cursor-listener";
import "./VolumeViewer-package/Aframe/render-2d-clipplane";

import "./styles/main.scss";

import { SelectorProvider } from "./context/selector-context.js";

import Header from "./components/Header";
import InfoText from "./components/InfoText";
import ModelSelector from "./components/ModelSelector";
import Instructions from "./components/instructions/Instructions";
import Footer from "./components/Footer";
import VolumeViewerWrapper from "./VolumeViewer-package/components/VolumeViewerWrapper";
import { ControlsProvider } from "./VolumeViewer-package/context/controls-context.js";

export default function App() {
  const [controlsVisible, setControlsVisible] = useState(false);

  return (
    <div id="visualizer">
      <Header />

      <SelectorProvider>
        <ControlsProvider>
          <InfoText />
          <ModelSelector
            toggleControls={() => setControlsVisible(!controlsVisible)}
          />
          <VolumeViewerWrapper controlsVisible={controlsVisible} />
        </ControlsProvider>
      </SelectorProvider>

      <Instructions />
      <Footer />
    </div>
  );
}