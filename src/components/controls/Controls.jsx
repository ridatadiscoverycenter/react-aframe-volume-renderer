import { Container, Form, Row } from "react-bootstrap";
import { Sidebar } from "primereact/sidebar";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useControlsContext } from "../../context/controls-context";
import OpacityControls from "./OpacityControl";
import ColorMapControls from "./ColorMapControls";

export default function Controls({ sidebarVisible, setSidebarVisible }) {
  const {
    state: { sliderRange },
    dispatch,
  } = useControlsContext();

  return (
    <Sidebar
      id="controls"
      modal={false}
      position="left"
      visible={sidebarVisible}
      onHide={(e) => setSidebarVisible(false)}
    >
      <Container fluid id="controls">
        <Row className="my-3">
          <ColorMapControls />
        </Row>
        <Row className="my-3">
          <OpacityControls />
        </Row>

        <Row className="mt-5">
          <h4>Clip</h4>
          <Form className="fullWidth">
            <Form.Group>
              <Form.Label> X </Form.Label>
              <Slider.Range
                allowCross={false}
                step={0.0009}
                defaultValue={[sliderRange.min, sliderRange.max]}
                min={sliderRange.min}
                max={sliderRange.max}
                onChange={(val) =>
                  dispatch({
                    type: "CHANGE_X_SLIDER",
                    payload1: val[0],
                    payload2: val[1],
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Y </Form.Label>
              <Slider.Range
                allowCross={false}
                step={0.0009}
                defaultValue={[sliderRange.min, sliderRange.max]}
                min={sliderRange.min}
                max={sliderRange.max}
                onChange={(val) => {
                  dispatch({
                    type: "CHANGE_Y_SLIDER",
                    payload1: val[0],
                    payload2: val[1],
                  });
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Z </Form.Label>
              <Slider.Range
                allowCross={false}
                step={0.0009}
                defaultValue={[sliderRange.min, sliderRange.max]}
                min={sliderRange.min}
                max={sliderRange.max}
                onChange={(val) => {
                  dispatch({
                    type: "CHANGE_Z_SLIDER",
                    payload1: val[0],
                    payload2: val[1],
                  });
                }}
              />
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </Sidebar>
  );
}
