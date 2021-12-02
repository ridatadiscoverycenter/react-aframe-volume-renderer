import { Container } from "react-bootstrap";
import { VolumeViewer } from "react-volume-viewer";

export default function VolumeViewerWrapper(props) {
  const { ALL_COLOR_MAPS, colorMap, model, controlsVisible } = props;

  return (
    <Container fluid className="p-4">
      <VolumeViewer
        className="volumeViewer"
        colorMaps={ALL_COLOR_MAPS}
        controlsVisible={controlsVisible}
        colorMap={colorMap}
        model={model}
      />
    </Container>
  );
}
