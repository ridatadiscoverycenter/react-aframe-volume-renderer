import { Container, Row, Col, Spinner } from "react-bootstrap";

import { useSelectorContext } from "../../context/selector-context";
import Controls from "../controls/Controls";
import VolumeViewer from "./VolumeViewer";

export default function VolumeViewerWrapper(props) {
  const { state } = useSelectorContext();
  return (
    <Container fluid className="p-4">
      <Row noGutters className="justify-content-md-center">
        {props.sidebarVisible && (
          <Col xs={3}>
            <Controls />
          </Col>
        )}
        <Col className="text-center">
          <div id="modelLoaded" style={{ display: "none" }}>
            <Spinner animation="border" variant="primary" className="mx-auto">
              <span className="sr-only">Loading Volume</span>
            </Spinner>
          </div>
          <VolumeViewer volume={state} />
        </Col>
      </Row>
    </Container>
  );
}
