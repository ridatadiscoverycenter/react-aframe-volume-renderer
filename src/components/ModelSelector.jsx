import {
  Col,
  Row,
  Button,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

function getModel(selection) {
  return `${selection.season.value}-${selection.tide.value}-${selection.measurement.value}`;
}

export default function ModelSelector(props) {
  const {
    BUTTONS,
    ALL_COLOR_MAPS,
    CONFIG_MIN_MAX,
    selection, setSelection,
    setColorMap,
    setModel,
    toggleControls,
  } = props;

  // TODO: Need to setModel
  // TODO: Change all buttons through the handleChange?
  function handleChange(val) {
    setSelection({
      ...selection,
      measurement: val,
    });
    // val.value === "salt"
    //   ? setColorMap(ALL_COLOR_MAPS.Haline)
    //   : setColorMap(ALL_COLOR_MAPS.Thermal);
    setModel(model => (
      {
        ...model,
        path: `./assets/models/${getModel(selection)}.png`,
        range: CONFIG_MIN_MAX[getModel(selection)],
      }
    ))
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
