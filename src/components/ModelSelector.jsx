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
import { useControlsContext } from "../context/controls-context";

export default function ModelSelector({ sidebarVisible, setSidebarVisible }) {
  const {
    state: { selection },
    dispatch: selectorDispatch,
  } = useSelectorContext();

  const { dispatch: controlsDispatch } = useControlsContext();

  return (
    <Container fluid className="my-3">
      <Row>
        <Col className="text-center">
          <Button onClick={(e) => setSidebarVisible(!sidebarVisible)}>
            Options
          </Button>
        </Col>
        <Col className="text-center">
          <ToggleButtonGroup
            type="radio"
            name="measurement"
            value={selection.measurement}
            onChange={(val) => {
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
            }}
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
