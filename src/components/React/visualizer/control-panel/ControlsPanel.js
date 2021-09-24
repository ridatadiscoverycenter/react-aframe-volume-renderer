import {Col, Row, Button, Container, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';

import { useVolumeContext } from '../../../../context/volume-context';

export default function ControlPanel(props) {
  const {
    state: {options},
    dispatch
  } = useVolumeContext();

  return (
    <Container fluid className="my-3">
      <Row>
        <Col className="text-center">
          <Button onClick={(e) => props.setSidebarVisible(true)}>
            Options
          </Button>
        </Col>

        <Col>
          <ToggleButtonGroup
            type="radio"
            name="measurement"
            value={options.measurement}
            onChange={val => dispatch({
              type: "TOGGLE_MEASUREMENT",
              payload: val,
            })}
          >
            <ToggleButton value='salt'>Salinity</ToggleButton>
            <ToggleButton value='temp'>Temperature</ToggleButton>
          </ToggleButtonGroup>
        </Col>

        <Col className="text-center">
          <ToggleButtonGroup
            type="radio"
            name="season"
            value={options.season}
            onChange={val => dispatch({
              type: "TOGGLE_SEASON",
              payload: val,
            })}
          >
            <ToggleButton value='summer'>Summer</ToggleButton>
            <ToggleButton value='winter'>Winter</ToggleButton>
          </ToggleButtonGroup>
        </Col>

        <Col className="text-center">
          <ToggleButtonGroup
            type="radio"
            name="tide"
            value={options.tide}
            onChange={val => dispatch({
              type: "TOGGLE_TIDE",
              payload: val,
            })}
          >
            <ToggleButton value='low'>Low Tide</ToggleButton>
            <ToggleButton value='high'>High Tide</ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
    </Container>
  );
}
