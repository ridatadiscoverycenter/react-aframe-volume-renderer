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
  const fileName = `${selection.season.value}-${selection.tide.value}-${selection.measurement.value}`;
  const modelData = MODEL_DATA[`${fileName}`];

  return (
    <Container fluid className="p-4">
      <VolumeViewer
        className="volumeViewer"
        colorMap={colorMap}
        colorMaps={ALL_COLOR_MAPS}
        controlsVisible={controlsVisible}
        model={{
          ...MODEL_CONSTANTS,
          path: `./assets/models/${fileName}.png`,
          range: { ...modelData, mid: (modelData.min + modelData.max) / 2 },
        }}
      />
    </Container>
  );
}
