import { Container, Row } from "react-bootstrap";

import OpacityControls from "./OpacityControl";
import ColorMapControls from "./ColorMapControls";
import ClipControls from "./ClipControls";

export default function Controls(props) {
  return (
    <Container className="m-3 controls">
      <Row className="mb-3">
        <ColorMapControls />
      </Row>
      <Row className="my-3">
        <OpacityControls volumeRange={props} />
      </Row>
      <Row className="mt-5">
        <ClipControls />
      </Row>
    </Container>
  );
}
