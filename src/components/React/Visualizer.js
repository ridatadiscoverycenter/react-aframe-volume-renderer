import { Container } from 'react-bootstrap';

import VolumeRenderer from './volume-renderer/VolumeRenderer';
import ControlsPanel from './control-panel/ControlsPanel';
import { VolumeProvider } from '../../context/volume-context';

export default function(props) {
  return (
    <Container fluid className="mb-3">
      <VolumeProvider>
        <ControlsPanel />
        <VolumeRenderer />
      </VolumeProvider>
    </Container>
  )
}