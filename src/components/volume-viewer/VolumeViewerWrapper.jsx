import { Container, Row, Col } from "react-bootstrap";

import { useSelectorContext } from "../../context/selector-context";
import Controls from "../controls/Controls";
import VolumeViewer from "./VolumeViewer";

export default function VolumeViewerWrapper(props) {
  const { state } = useSelectorContext();
  return (
    <Container fluid className="p-4">
      <Row noGutters>
        {props.sidebarVisible && (
          <Col xs={3}>
            <Controls />
          </Col>
        )}
        <Col>
          <VolumeViewer volume={state} />
        </Col>
      </Row>
    </Container>
  );
}
