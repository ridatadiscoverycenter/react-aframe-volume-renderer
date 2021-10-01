import { Container } from "react-bootstrap";
import { Sidebar } from "primereact/sidebar";

import VolumeRenderer from "./VolumeRenderer";
import Controls from "../controls/Controls";

export default function VolumeViewer(props) {
  return (
    <Container fluid id="visualizer" className="mb-3">
      <VolumeRenderer />
    </Container>
  );
}
