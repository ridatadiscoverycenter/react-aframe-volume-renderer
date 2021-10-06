import React, { useState } from "react";
import "aframe";
import "aframe-event-set-component";
import "aframe-orbit-controls";

import "./Aframe/my-loader.js";
import "./Aframe/my-buttons-check.js";
import "./Aframe/render-2d-clipplane";
import "./Aframe/cursor-listener";

import "./styles/main.scss";

import { SelectorProvider } from "./context/selector-context.js";

import Header from "./components/Header";
import InfoText from "./components/InfoText";
import ModelSelector from "./components/ModelSelector";
import Instructions from "./components/instructions/Instructions";
import Footer from "./components/Footer";
import VVWrapper from "./components/volume-viewer/VVWrapper.jsx";

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div id="visualizer">
      <Header />

      <SelectorProvider>
        <InfoText />
        <ModelSelector
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
        <VVWrapper
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
      </SelectorProvider>

      <Instructions />
      <Footer />
    </div>
  );
}
