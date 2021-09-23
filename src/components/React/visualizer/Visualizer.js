import { Container } from 'react-bootstrap';

import VolumeRenderer from './VolumeRenderer';
import ControlsPanel from './control-panel/ControlsPanel';
import { VolumeProvider } from '../../../context/volume-context';

export default function Visualizer(props) {
  return (
    <Container fluid className="mb-3">
      <VolumeProvider>
        <ControlsPanel />
        <VolumeRenderer />
      </VolumeProvider>
    </Container>
  )
}