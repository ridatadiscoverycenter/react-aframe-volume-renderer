import React, { Component } from "react";
import { Container, Form, Row } from "react-bootstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { connect } from "react-redux";
import {
  myXSlideAction,
  myYSlideAction,
  myZSlideAction,
} from "../../redux/AppActions";

import { range } from "../../assets/config.json";
import OpacityControl from "./OpacityControl";
import ColorMapControl from "./ColorMapControl";

const Range = Slider.Range;

export default connect(null, {
  myXSlideAction,
  myYSlideAction,
  myZSlideAction,
})(
  class Controls extends Component {
    constructor(props) {
      super(props);

      this.xSlideHandleChange = this.xSlideHandleChange.bind(this);
      this.ySlideHandleChange = this.ySlideHandleChange.bind(this);
      this.zSlideHandleChange = this.zSlideHandleChange.bind(this);
    }

    xSlideHandleChange = (value) => {
      this.props.myXSlideAction(value[0], value[1]);
    };

    ySlideHandleChange = (value) => {
      this.props.myYSlideAction(value[0], value[1]);
    };

    zSlideHandleChange = (value) => {
      this.props.myZSlideAction(value[0], value[1]);
    };

    render() {
        
    }
  }
);
