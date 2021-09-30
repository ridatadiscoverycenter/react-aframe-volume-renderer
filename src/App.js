import React from "react";
import "aframe";
import "aframe-event-set-component";
import "aframe-orbit-controls";

import "./components/Aframe/my-loader.js";
import "./components/Aframe/my-buttons-check.js";
import "./components/Aframe/render-2d-clipplane";
import "./components/Aframe/cursor-listener";

import Header from "./components/React/Header";
import VolumeViewer from "./components/React/volume-viewer/VolumeViewer";
import Instructions from "./components/React/instructions/Instructions";
import Footer from "./components/React/Footer";

import "./styles/main.scss";

export default function App() {
  return (
    <div id="visualizer">
      <Header />
      <VolumeViewer />
      <Instructions />
      <Footer />
    </div>
  )
}
