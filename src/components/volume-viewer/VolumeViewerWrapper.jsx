import { Container, Row, Col, Spinner } from "react-bootstrap";

import { useSelectorContext } from "../../context/selector-context";
import Controls from "./controls/Controls";
import VolumeViewer from "./VolumeViewer";

export default function VolumeViewerWrapper(props) {
  const { state } = useSelectorContext();

  return (
    <Container fluid className="p-4">
      <Row noGutters className="justify-content-center">
        {props.controlsVisible && (
          <Col className="controls">
            <Controls />
          </Col>
        )}

        <Col className="align-self-center text-center">
          <div id="modelLoaded" style={{ display: "block" }}>
            <Spinner animation="border" variant="primary">
              <span className="sr-only">Loading Volume</span>
            </Spinner>
          </div>
          <VolumeViewer volume={state} />
        </Col>
      </Row>
    </Container>
  );
}
