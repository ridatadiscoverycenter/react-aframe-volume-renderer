import { Container, Form, Row } from "react-bootstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useControlsContext } from "../../context/controls-context";
import OpacityControls from "./OpacityControl";
import ColorMapControls from "./ColorMapControls";

export default function Controls(props) {
  const {
    state: { sliderRange },
    dispatch,
  } = useControlsContext();

  function handleClick(axis, val) {
    dispatch({
      type: `CHANGE_SLIDER`,
      payload: {
        [axis.concat("SliderBounds")]: val,
      },
    });
  }

  return (
    <Container id="controls">
      <Row className="my-3">
        <ColorMapControls />
      </Row>
      <Row className="my-3">
        <OpacityControls />
      </Row>
      <Row className="mt-5">
        <h4>Clip</h4>
        <Form className="fullWidth">
          {["x", "y", "z"].map((axis) => {
            return (
              <Form.Group key={axis}>
                <Form.Label>{axis.toUpperCase()}</Form.Label>
                <Slider.Range
                  allowCross={false}
                  step={0.0009}
                  defaultValue={[sliderRange.min, sliderRange.max]}
                  min={sliderRange.min}
                  max={sliderRange.max}
                  onChange={(val) => handleClick(axis, val)}
                />
              </Form.Group>
            );
          })}
        </Form>
      </Row>
    </Container>
  );
}
