import React, { useState } from "react";
import "aframe";
import "aframe-event-set-component";
import "aframe-orbit-controls";

import "./Aframe/loader.js";
import "./Aframe/buttons-check.js";
import "./Aframe/render-2d-clipplane";
import "./Aframe/cursor-listener";

import "./styles/main.scss";

import { SelectorProvider } from "./context/selector-context.js";

import Header from "./components/Header";
import InfoText from "./components/InfoText";
import ModelSelector from "./components/ModelSelector";
import Instructions from "./components/instructions/Instructions";
import Footer from "./components/Footer";
import VolumeViewerWrapper from "./components/volume-viewer/VolumeViewerWrapper.jsx";
import { ControlsProvider } from "./context/controls-context.js";

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div id="visualizer">
      <Header />

      <SelectorProvider>
        <ControlsProvider>
          <InfoText />
          <ModelSelector
            toggleSidebar={() => setSidebarVisible(!sidebarVisible)}
          />
          <VolumeViewerWrapper
            sidebarVisible={sidebarVisible}
            setSidebarVisible={setSidebarVisible}
          />
        </ControlsProvider>
      </SelectorProvider>

      <Instructions />
      <Footer />
    </div>
  );
}
