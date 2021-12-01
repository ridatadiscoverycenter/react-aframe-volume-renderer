import React, { useState } from "react";
import { VolumeViewer } from "react-volume-viewer";

import "./styles/main.scss";

import Header from "./components/Header";
import InfoText from "./components/InfoText";
import ModelSelector from "./components/ModelSelector";
import Instructions from "./components/instructions/Instructions";
import Footer from "./components/Footer";

import { useSelectorContext } from "./context/selector-context.js";

// TODO: Import VolumeViewer from package
// TODO: Change the way color maps are passed in
// TODo: Add Add colorMap, path to state (controls-context to selector-context)
// TODO: Rename context file and delete controls
export default function App() {
  const {state} = useSelectorContext();
  const {season, tide, measurement} = state.selection;
  const [controlsVisible, setControlsVisible] = useState(false);

  return (
    <div id="visualizer">
      <Header />
      <InfoText />
      <ModelSelector
        toggleControls={() => setControlsVisible(!controlsVisible)}
      />
      <VolumeViewer
        className="aframe-container"
        colorMaps={state.allColorMaps}
        controlsVisible={controlsVisible}
        colorMap={state.colorMap}
        model={{
          path: `./assets/models/${season.value}-${tide.value}-${measurement.value}.png`,
          range: state.configMinMax[
            `${season.value}-${tide.value}-${measurement.value}`
          ],
          position: state.position,
          rotation: state.rotation,
          scale: state.scale,
          slices: state.slices,
          spacing: {
            x: state.x_spacing,
            y: state.y_spacing,
            z: state.z_spacing,
          },
        }}
      />
      <Instructions />
      <Footer />
    </div>
  );
}
