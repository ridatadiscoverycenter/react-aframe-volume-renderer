import {
  Col,
  Row,
  Button,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

import { useSelectorContext } from "../context/selector-context";
import { colorMaps, measurement, season, tide } from "../assets/config.json";
import { useControlsContext } from "../VolumeViewer-package/context/controls-context";

export default function ModelSelector({ toggleControls }) {
  const {
    state: { selection },
    dispatch: selectorDispatch,
  } = useSelectorContext();

  const { dispatch: controlsDispatch } = useControlsContext();

  function handleChange(val) {
    // Change model
    selectorDispatch({
      type: "TOGGLE_MEASUREMENT",
      payload: val,
    });
    // Change color map
    controlsDispatch({
      type: "CHANGE_COLOR_MAP",
      payload:
        val.value === "salt"
          ? colorMaps.find((m) => m.name === "Haline")
          : colorMaps.find((m) => m.name === "Thermal"),
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
            {measurement.map((m) => {
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
              selectorDispatch({
                type: "TOGGLE_SEASON",
                payload: val,
              })
            }
          >
            {season.map((m) => {
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
              selectorDispatch({
                type: "TOGGLE_TIDE",
                payload: val,
              })
            }
          >
            {tide.map((m) => {
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
