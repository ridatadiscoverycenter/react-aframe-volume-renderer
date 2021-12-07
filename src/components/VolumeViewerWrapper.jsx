import { Container } from "react-bootstrap";
import { VolumeViewer } from "react-volume-viewer";
import {
  ALL_COLOR_MAPS,
  MODEL_CONSTANTS,
  MODEL_DATA,
} from "../constants/constants";

export default function VolumeViewerWrapper({
  colorMap,
  selection,
  controlsVisible,
}) {
  const model = {
    ...MODEL_CONSTANTS,
    path: `./assets/models/${selection.season.value}-${selection.tide.value}-${selection.measurement.value}.png`,
    range:
      MODEL_DATA[
        `${selection.season.value}-${selection.tide.value}-${selection.measurement.value}`
      ],
  };

  return (
    <Container fluid className="p-4">
      <VolumeViewer
        className="volumeViewer"
        colorMaps={ALL_COLOR_MAPS}
        controlsVisible={controlsVisible}
        model={model}
        colorMap={colorMap}
      />
    </Container>
  );
}
