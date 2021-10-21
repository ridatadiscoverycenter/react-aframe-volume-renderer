import { Form } from "react-bootstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useControlsContext } from "../../../context/controls-context";

export default function ClipControls(props) {
  const {
    state: { sliderRange },
    dispatch,
  } = useControlsContext();

  function handleChange(axis, val) {
    dispatch({
      type: `CHANGE_SLIDER`,
      payload: {
        [axis.concat("SliderBounds")]: val,
      },
    });
  }

  return (
    <div>
      <h4>Clip</h4>
      <Form>
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
                onChange={(val) => handleChange(axis, val)}
              />
            </Form.Group>
          );
        })}
      </Form>
    </div>
  );
}
