import { Container } from "react-bootstrap";

import VolumeRenderer from "./VolumeRenderer";
import ControlsPanel from "./ControlsPanel";

import { VolumeProvider } from "../../context/volume-context";

export default function VolumeViewer(props) {
  return (
    <Container fluid id="visualizer" className="mb-3">
      <VolumeProvider>
        <ControlsPanel />
        <VolumeRenderer />
      </VolumeProvider>
    </Container>
  )
}