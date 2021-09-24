import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Sidebar } from 'primereact/sidebar';

import VolumeRenderer from './VolumeRenderer';
import ControlsPanel from './control-panel/ControlsPanel';
import Controls from "./control-panel/Controls"
import { VolumeProvider } from '../../../context/volume-context';

export default function Visualizer(props) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <Container fluid className="mb-3">
      <VolumeProvider>
        <ControlsPanel setSidebarVisible={setSidebarVisible}/>
        <VolumeRenderer />
        <Sidebar
          modal={false}
          position="bottom"
          visible={sidebarVisible}
          onHide={() => setSidebarVisible(false)}
          style={{width:'20em', height:'45em'}}
        >
          <Controls/>
        </Sidebar>
      </VolumeProvider>
    </Container>
  )
}