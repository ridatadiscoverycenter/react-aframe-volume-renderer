import {
  Col,
  Row,
  Button,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

export default function ModelSelector(props) {
  const {
    BUTTONS,
    ALL_COLOR_MAPS,
    selection,
    setSelection,
    setColorMap,
    toggleControls,
  } = props;

  function handleChange(val) {
    setSelection({
      ...selection,
      measurement: val,
    });
    setColorMap(
      val.value === "salt" ? ALL_COLOR_MAPS.Haline : ALL_COLOR_MAPS.Thermal
    );
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
            {BUTTONS.measurement.map((m) => {
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
              setSelection({
                ...selection,
                season: val,
              })
            }
          >
            {BUTTONS.season.map((m) => {
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
              setSelection({
                ...selection,
                tide: val,
              })
            }
          >
            {BUTTONS.tide.map((m) => {
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
