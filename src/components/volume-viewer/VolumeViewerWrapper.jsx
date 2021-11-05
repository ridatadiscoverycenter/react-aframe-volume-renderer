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
          <Controls
            opacityControlsProps={{
              min: state.volumeData.range.min,
              max: state.volumeData.range.max,
              units:
                state.selection.measurement.value === "temp" ? "°C" : "PSU",
            }}
          />
        )}

        <Col className="align-self-center text-center p-0">
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
