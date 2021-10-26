import { Container, Row } from "react-bootstrap";

import OpacityControls from "./OpacityControl";
import ColorMapControls from "./ColorMapControls";
import ClipControls from "./ClipControls";

export default function Controls(props) {
  const { volume } = props;
  return (
    <Container className="m-3 controls">
      <Row className="mb-3">
        <ColorMapControls />
      </Row>
      <Row className="my-3">
        <OpacityControls
          volume_min_data={volume.volumeData.value.min}
          volume_max_data={volume.volumeData.value.max}
          volume_current_measure={volume.selection.measurement.value}
        />
      </Row>
      <Row className="mt-5">
        <ClipControls />
      </Row>
    </Container>
  );
}
