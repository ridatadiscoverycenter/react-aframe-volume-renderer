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

import Header from "./components/React/Header";
import ControlPanel from "./components/React/ControlsPanel.js";
import VolumeViewer from "./components/React/volume-viewer/VolumeViewer";
import Instructions from "./components/React/instructions/Instructions";
import Footer from "./components/React/Footer";

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div id="visualizer">
      <Header />

      <SelectorProvider>
        <ControlPanel
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
