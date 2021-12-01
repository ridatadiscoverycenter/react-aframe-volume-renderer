import React, { useState } from "react";
import { VolumeViewer } from "react-volume-viewer"

import "./styles/main.scss";

// import { SelectorProvider } from "./context/selector-context.js";
// import { ControlsProvider } from "./VolumeViewer-package/context/controls-context.js";

import Header from "./components/Header";
import InfoText from "./components/InfoText";
import ModelSelector from "./components/ModelSelector";
import Instructions from "./components/instructions/Instructions";
import Footer from "./components/Footer";
// import VolumeViewerWrapper from "./VolumeViewer-package/components/VolumeViewerWrapper";


import haline from "./assets/colormaps/haline.png";
import thermal from "./assets/colormaps/thermal.png";
import { useSelectorContext } from "./context/selector-context.js";

// TODO: Import VolumeViewer from package
// TODO: Change the way color maps are passed in
// TODo: Add Add colorMap, path to state (controls-context to selector-context)
// TODO: Rename context file and delete controls
export default function App() {
  const state = useSelectorContext();
  const [controlsVisible, setControlsVisible] = useState(false);

  return (
    <div id="visualizer">
      <Header />

      {/* <SelectorProvider>
        <ControlsProvider> */}
          <InfoText />
          <ModelSelector
            toggleControls={() => setControlsVisible(!controlsVisible)}
          />
          {/* <VolumeViewerWrapper controlsVisible={controlsVisible} /> */}
          <VolumeViewer 
            className="aframe-container"
            colorMaps={{
              Haline: haline,
              Thermal: thermal,
            }}
            controlsVisible={controlsVisible}

            // colorMap={colorMap} GET FROM STATE
            model={{
              range: { min: 0.05, max: 33.71, unit: "°C" },
              path: state.path,
              position: state.position,
              rotation: state.rotation,
              scale: state.scale,
              slices: state.slices,
              spacing: {
                x: state.x_spacing,
                y: state.y_spacing,
                z: state.z_spacing
              },
              
            }}
          />
        {/* </ControlsProvider>
      </SelectorProvider> */}

      <Instructions />
      <Footer />
    </div>
  );
}
