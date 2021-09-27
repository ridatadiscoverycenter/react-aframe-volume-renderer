import React, { Component } from "react";
import ReactModal from "react-modal";
import { Dropdown } from "react-bootstrap";

import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { connect } from "react-redux";
import {
  myChangeColorMapAction as changeColorMap,
  mySaveColorMappingState as saveColorMapState,
} from "../../redux/AppActions";

import { colorMaps } from "../../assets/config.json"

export default connect(null, {
  changeColorMap,
  saveColorMapState,
})(
  class ControlMappingController extends Component {
    constructor(props) {
      super(props);

      this.state = {
        colorMap: colorMaps[0],
      };

      this.handleClick = this.handleClick.bind(this);

      ReactModal.setAppElement("body");
    }

    componentWillMount() {
      console.log("Mounting")
      this.props.changeColorMap(colorMaps[0].src)
    }

    componentWillUnmount() {
      this.props.saveColorMapState(this.state.colorMap.src);
    }

    handleClick(color) {
      this.setState({
        colorMap: color,
      });
      this.props.changeColorMap(color.src);
    }

    render() {
      return (
        <div className="fullWidth">
          <h4>Color Map</h4>

          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" className="fullWidth">
              <img
                src={this.state.colorMap.src}
                alt="selected color map"
                height="15"
                width="65%"
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
                    <img
                      src={color.src}
                      alt="selected color map"
                      height="15"
                      width="50%"
                      className="mr-2"
                    />
                    {color.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <img
            src={this.state.colorMap.src}
            alt="color map"
            height="15"
            width="250px"
            className="border border-dark mb-1 mt-3"
          />
        </div>
      );
    }
  }
);
