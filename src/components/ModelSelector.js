import { useDispatch } from "react-redux";
import {
  Col,
  Row,
  Button,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

import { useSelectorContext } from "../context/selector-context";
import { myChangeColorMapAction as changeColorMap } from "../redux/AppActions";
import { colorMaps, measurement, season, tide } from "../assets/config.json";

export default function ModelSelector(props) {
  const { sidebarVisible, setSidebarVisible } = props;
  const reduxDispatch = useDispatch(changeColorMap);
  const {
    state: { selection },
    dispatch,
  } = useSelectorContext();
  console.log(selection)

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
            value={selection.measurement.value}
            onChange={(val) => {
              // Change model
              dispatch({
                type: "TOGGLE_MEASUREMENT",
                payload: val,
              });
              // Change color map
              reduxDispatch(
                changeColorMap(
                  val.value === "salt"
                    ? colorMaps.find((m) => m.name === "Haline")
                    : colorMaps.find((m) => m.name === "Thermal")
                )
              );
            }}
          >
            {measurement.map((m) => {
              return <ToggleButton value={m}>{m.name}</ToggleButton>;
            })}
          </ToggleButtonGroup>
        </Col>

        <Col className="text-center">
          <ToggleButtonGroup
            type="radio"
            name="season"
            value={selection.season.value}
            onChange={(val) =>
              dispatch({
                type: "TOGGLE_SEASON",
                payload: val,
              })
            }
          >
            {season.map((m) => {
              return <ToggleButton value={m}>{m.name}</ToggleButton>;
            })}
          </ToggleButtonGroup>
        </Col>

        <Col className="text-center">
          <ToggleButtonGroup
            type="radio"
            name="tide"
            value={selection.tide.value}
            onChange={(val) =>
              dispatch({
                type: "TOGGLE_TIDE",
                payload: val,
              })
            }
          >
            {tide.map((m) => {
              return <ToggleButton value={m}>{m.name}</ToggleButton>;
            })}
          </ToggleButtonGroup>
        </Col>
      </Row>
    </Container>
  );
}
