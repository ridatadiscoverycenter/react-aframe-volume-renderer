import { Container } from "react-bootstrap";
import { VolumeViewer } from "react-volume-viewer";
import { MODEL_CONSTANTS, MODEL_DATA } from "../constants/constants";

export default function VolumeViewerWrapper(props) {
  const { allColorMaps, colorMap, selection, controlsVisible } = props;

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
        colorMaps={allColorMaps}
        controlsVisible={controlsVisible}
        model={model}
        colorMap={colorMap}
      />
    </Container>
  );
}
