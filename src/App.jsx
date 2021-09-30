import React, { useState } from "react";
import "aframe";
import "aframe-event-set-component";
import "aframe-orbit-controls";

import "./components/Aframe/my-loader.js";
import "./components/Aframe/my-buttons-check.js";
import "./components/Aframe/render-2d-clipplane";
import "./components/Aframe/cursor-listener";

import "./styles/main.scss";

import { SelectorProvider } from "./context/selector-context.js";

import Header from "./components/Header";
import ModelSelector from "./components/ModelSelector.js";
import VolumeViewer from "./components/volume-viewer/VolumeViewer";
import Instructions from "./components/instructions/Instructions";
import Footer from "./components/Footer";

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div id="visualizer">
      <Header />

      <SelectorProvider>
        <ModelSelector
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
        <VolumeViewer
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
      </SelectorProvider>

      <Instructions />
      <Footer />
    </div>
  );
}
