import React, { Component } from "react";
import ReactModal from "react-modal";

import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { connect } from "react-redux";
import {
  myChangeColorMapAction as changeColorMap,
  mySaveColorMappingState as saveColorMapState,
} from "../../redux/AppActions";

import {
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Container,
  Row, Col
} from "react-bootstrap";

const path = "assets/images/colormaps";
const colorMaps = [
  { name: "Haline", src: `${path}/haline.png` },
  { name: "Thermal", src: `${path}/thermal.png` },
  { name: "Grayscale", src: `${path}/grayscale.png` },
  { name: "Natural", src: `${path}/natural.png` },
  { name: "Plasma", src: `${path}/plasma.png` },
  { name: "RGB", src: `${path}/rgb.png` },
  { name: "Viridis", src: `${path}/viridis.png` },
];

export default connect(null, {
  changeColorMap,
  saveColorMapState,
})(
  class ControlMappingController extends Component {
    constructor(props) {
      super(props);

      this.state = {
        colorMap: colorMaps[0],
        colorMapModal: false,
      };

      this.showModal = this.showModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.handleClick = this.handleClick.bind(this);

      ReactModal.setAppElement("body");
    }

    componentWillUnmount() {
      this.props.saveColorMapState(this.state.colorMap.src);
    }

    showModal = () => {
      this.setState({ colorMapModal: true });
    };

    handleCloseModal() {
      this.props.changeColorMap(this.state.colorMap.src);
      this.setState({ colorMapModal: false });
    }

    handleClick(color) {
      this.setState({
        colorMap: color,
      });
    }

    getMapWidth() {
      const controlsContainer = document.getElementById("controls");
      console.log(controlsContainer)

      this.opCanvas.width = controlsContainer.clientWidth - 2 * this.padding - 2;
    }

    render() {
      return (
        <Container>
          <Row noGutters>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary">
                <img
                  src={this.state.colorMap.src}
                  alt="selected color map"
                  height="15"
                  width="50%"
                  className="mr-2"
                />
                {this.state.colorMap.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {colorMaps.map((color, i) => {
                  return (
                    <Dropdown.Item
                      key={color.name}
                      active={this.state.colorMap === color}
                      onClick={() => this.handleClick(color)}
                    >
                      <div> {color.name} </div>
                      <img
                        src={color.src}
                        alt="selected color map"
                        height="15"
                        width="100%"
                      />
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            
            {/* <DropdownButton title="Color map" as={ButtonGroup} variant="outlined primary">
              {colorMaps.map((color, i) => {
                return (
                  <Dropdown.Item
                    key={color.name}
                    active={this.state.colorMap === color}
                    onClick={() => this.handleClick(color)}
                  >
                    <div> {color.name} </div>
                    <img
                      src={color.src}
                      alt="selected color map"
                      height="15"
                      width="100%"
                    />
                  </Dropdown.Item>
                );
              })}
            </DropdownButton> */}
          </Row>

          <Row className="mt-1">
            <img
              src={this.state.colorMap.src}
              alt="color map"
              height="15"
              // width={this.getMapWidth()}
              width="100%"
              className="border border-dark"
            />
          </Row>
        </Container>
      );
    }
  }
);
