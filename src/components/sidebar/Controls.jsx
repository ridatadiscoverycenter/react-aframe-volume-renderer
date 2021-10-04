import { Container, Form, Row } from "react-bootstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { range } from "../../assets/config.json";
import { useControlsContext } from "../../context/controls-context";
import OpacityControl from "./OpacityControl";
import ColorMapControl from "./ColorMapControl";

export default function Controls(props) {
  const { state, dispatch } = useControlsContext();

  function handleXSliderChange(val) {
    dispatch({
      type: "CHANGE_X_SLIDER",
      payload1: val[0],
      payload2: val[1]
    })
  }
  function handleYSliderChange(val) {
        dispatch({
      type: "CHANGE_Y_SLIDER",
      payload1: val[0],
      payload2: val[1]
    })
  }
  function handleZSliderChange(val) {
    dispatch({
      type: "CHANGE_X_SLIDER",
      payload1: val[0],
      payload2: val[1]
    })
  }

  return (
    <Container fluid id="controls">
      <Row className="my-3">
        <ColorMapControl width="250" />
      </Row>
      <Row className="my-3">
        <OpacityControl width="250" />
      </Row>

      <Row className="mt-5">
        <h4>Clip</h4>
        <Form className="fullWidth">
          <Form.Group>
            <Form.Label> X </Form.Label>
            <Slider.Range
              allowCross={false}
              step={0.0009}
              defaultValue={[range.min, range.max]}
              min={range.min}
              max={range.max}
              onChange={handleXSliderChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Y </Form.Label>
            <Slider.Range
              allowCross={false}
              step={0.0009}
              defaultValue={[range.min, range.max]}
              min={range.min}
              max={range.max}
              onChange={handleYSliderChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Z </Form.Label>
            <Slider.Range
              allowCross={false}
              step={0.0009}
              defaultValue={[range.min, range.max]}
              min={range.min}
              max={range.max}
              onChange={handleZSliderChange}
            />
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}