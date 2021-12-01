import { Container } from "react-bootstrap";
import { VolumeViewer } from "react-volume-viewer";

import { useSelectorContext } from "../context/selector-context";

export default function VolumeViewerWrapper({ controlsVisible }) {
  const { state } = useSelectorContext();
  const { season, tide, measurement } = state.selection;
  return (
    <Container fluid className="p-4">
      <VolumeViewer
        className="aframe-container"
        colorMaps={state.allColorMaps}
        controlsVisible={controlsVisible}
        colorMap={state.colorMap}
        model={{
          path: `./assets/models/${season.value}-${tide.value}-${measurement.value}.png`,
          range:
            state.configMinMax[
              `${season.value}-${tide.value}-${measurement.value}`
            ],
          ...state.model,
        }}
      />
    </Container>
  );
}
