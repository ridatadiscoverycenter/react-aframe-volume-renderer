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
    toggleControls,
    buttons,
    selection,
    setSelection,
    allColorMaps,
    setColorMap,
    setModel,
  } = props;

  // TODO: Need to setModel
  // TODO: All buttons through the handleChange?
  function handleChange(val) {
    setSelection({
      ...selection,
      measurement: val,
    });
    val.value === "salt"
      ? setColorMap(allColorMaps.Haline)
      : setColorMap(allColorMaps.Thermal);
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
              setSelection({
                ...selection,
                season: val,
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
              setSelection({
                ...selection,
                tide: val,
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
