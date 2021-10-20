import Controls from "../controls/Controls";
import VolumeViewer from "./VolumeViewer";

import { useSelectorContext } from "../../context/selector-context";
import { Container, Row, Col } from "react-bootstrap";

export default function VolumeViewerWrapper(props) {
  const { state } = useSelectorContext();
  return (
    <Container fluid className="p-4">
      <Row>
        <Col xs={3}>
          <Controls
            sidebarVisible={props.sidebarVisible}
            setSidebarVisible={props.setSidebarVisible}
          />
        </Col>
        <Col>
          <VolumeViewer volume={state} />
        </Col>
      </Row>
    </Container>
  );
}
