import { useState } from "react";
import { Container } from "react-bootstrap";
import { Sidebar } from "primereact/sidebar";

import VolumeRenderer from "./VolumeRenderer";
import ControlsPanel from "../ControlsPanel";
import Controls from "../Controls"

import { VolumeProvider } from "../../../context/volume-context";

export default function VolumeViewer(props) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <Container fluid id="visualizer" className="mb-3">
      <VolumeProvider>
        <ControlsPanel />
        <VolumeRenderer />
      </VolumeProvider>

      <Sidebar
        modal={false}
        position="left"
        visible={sidebarVisible}
        // onHide={(e) => setSidebarVisible(false)}
      >
        <Controls />
      </Sidebar>
    </Container>
  )
}