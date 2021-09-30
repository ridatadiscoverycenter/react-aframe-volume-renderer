import { Container } from "react-bootstrap";
import { Sidebar } from "primereact/sidebar";

import VolumeRenderer from "./VolumeRenderer";
import Controls from "../Controls"

export default function VolumeViewer(props) {
  const {sidebarVisible, setSidebarVisible } = props

  return (
    <Container fluid id="visualizer" className="mb-3">
      <VolumeRenderer />

      <Sidebar
        modal={false}
        position="left"
        visible={sidebarVisible}
        onHide={(e) => setSidebarVisible(false)}
      >
        <Controls />
      </Sidebar>
    </Container>
  )
}