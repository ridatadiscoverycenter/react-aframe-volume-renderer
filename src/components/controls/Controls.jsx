import { Container, Row } from "react-bootstrap";

import OpacityControls from "./OpacityControl";
import ColorMapControls from "./ColorMapControls";
import ClipControls from "./ClipControls";

export default function Controls(props) {
  return (
    <Container className="p-3">
      <Row noGutters className="mb-3">
        <ColorMapControls />
      </Row>
      <Row noGutters className="my-3">
        <OpacityControls />
      </Row>
      <Row noGutters className="mt-5">
        <ClipControls />
      </Row>
    </Container>
  );
}
