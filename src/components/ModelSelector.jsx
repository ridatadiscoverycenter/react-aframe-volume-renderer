import {
  Col,
  Row,
  Button,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

import { ALL_COLOR_MAPS, BUTTONS } from "../constants/constants";

export default function ModelSelector(props) {
  const { selection, setSelection, setColorMap, toggleControls } = props;

  function handleChange(button, value) {
    setSelection({
      ...selection,
      [button]: value,
    });

    // Change colorMap to corresponding measurement
    button === "measurement" &&
      setColorMap(
        value.value === "salt" ? ALL_COLOR_MAPS.haline : ALL_COLOR_MAPS.thermal
      );
  }

  return (
    <Container fluid className="px-4">
      <Row noGutters>
        <Col className="text-center">
          <Button onClick={toggleControls}>Options</Button>
        </Col>

        {Object.keys(BUTTONS).map((button) => (
          <Col className="text-center" key={button}>
            <ToggleButtonGroup
              type="radio"
              name={button}
              value={selection[button]}
              onChange={(val) => handleChange(button, val)}
            >
              {BUTTONS[button].map((b) => {
                return (
                  <ToggleButton key={b.name} value={b}>
                    {b.name}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
