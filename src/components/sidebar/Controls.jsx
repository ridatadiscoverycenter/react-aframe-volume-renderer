import { Container, Form, Row } from "react-bootstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { range } from "../../assets/config.json";
import OpacityControl from "./OpacityControl";
import ColorMapControl from "./ColorMapControl";

export default function Controls(props) {
  function handleXSliderChange(val) {
    return null
  }
  function handleYSliderChange(val) {
    return null
  }
  function handleZSliderChange(val) {
    return null
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
              onChange={this.xSlideHandleChange}
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
              onChange={this.ySlideHandleChange}
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
              onChange={this.zSlideHandleChange}
            />
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}