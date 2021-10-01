import { Container } from "react-bootstrap";

import VolumeRenderer from "./VolumeRenderer";

export default function VolumeViewer(props) {
  return (
    <Container fluid id="visualizer" className="mb-3">
      <VolumeRenderer />
    </Container>
  );
}
