import {
  Col,
  Row,
  Button,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

import { BUTTONS } from "../constants/constants";

export default function ModelSelector({
  selection,
  setSelection,
  setColorMap,
  toggleControls,
}) {
  function handleChange(button, value) {
    setSelection((selection) => ({
      ...selection,
      [button]: value,
    }));

    // Change colorMap to corresponding measurement
    button === "measurement" && setColorMap(value.value);
  }

  return (
    <Container fluid className="px-4">
      <Row noGutters>
        <Col className="text-center">
          <Button onClick={toggleControls}>Options</Button>
        </Col>

        {Object.entries(BUTTONS).map(([buttonGroup, buttons]) => (
          <Col className="text-center" key={buttonGroup}>
            <ToggleButtonGroup
              type="radio"
              name={buttonGroup}
              value={selection[buttonGroup]}
              onChange={(val) => handleChange(buttonGroup, val)}
            >
              {buttons.map((b) => {
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
