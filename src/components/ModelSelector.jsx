import {
  Col,
  Row,
  Button,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

import { UseContext } from "../context/context";

export default function ModelSelector({ toggleControls }) {
  const {
    state: { buttons, selection, allColorMaps },
    dispatch,
  } = UseContext();

  function handleChange(val) {
    dispatch({
      type: "TOGGLE_MEASUREMENT",
      payload: val,
      colorMap:
        val.value === "salt" ? allColorMaps.Haline : allColorMaps.Thermal,
    });
  }

  return (
    <Container fluid className="px-4">
      <Row noGutters>
        <Col className="text-center">
          <Button onClick={toggleControls}>Options</Button>
        </Col>
        <Col className="text-center">
          <ToggleButtonGroup
            type="radio"
            name="measurement"
            value={selection.measurement}
            onChange={(val) => handleChange(val)}
          >
            {buttons.measurement.map((m) => {
              return (
                <ToggleButton key={m.name} value={m}>
                  {m.name}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Col>

        <Col className="text-center">
          <ToggleButtonGroup
            type="radio"
            name="season"
            value={selection.season}
            onChange={(val) =>
              dispatch({
                type: "TOGGLE_SEASON",
                payload: val,
              })
            }
          >
            {buttons.season.map((m) => {
              return (
                <ToggleButton key={m.name} value={m}>
                  {m.name}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Col>

        <Col className="text-center">
          <ToggleButtonGroup
            type="radio"
            name="tide"
            value={selection.tide}
            onChange={(val) =>
              dispatch({
                type: "TOGGLE_TIDE",
                payload: val,
              })
            }
          >
            {buttons.tide.map((m) => {
              return (
                <ToggleButton key={m.name} value={m}>
                  {m.name}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Col>
      </Row>
    </Container>
  );
}
