import { Container } from "react-bootstrap";
import { VolumeViewer } from "react-volume-viewer";

export default function VolumeViewerWrapper(props) {
  const { controlsVisible, model, colorMap, allColorMaps } = props;

  return (
    <Container fluid className="p-4">
      <VolumeViewer
        className="volumeViewer"
        colorMaps={allColorMaps}
        controlsVisible={controlsVisible}
        colorMap={colorMap}
        model={model}
      />
    </Container>
  );
}
