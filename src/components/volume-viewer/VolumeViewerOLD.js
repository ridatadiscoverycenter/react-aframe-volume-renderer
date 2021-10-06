import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Entity, Scene } from "aframe-react";
import { connect } from "react-redux";

import "../../Aframe/arcball-camera";

import { SelectorConsumer } from "../../context/selector-context";
import Spinner from "./Spinner";
import {
  volumePosition,
  volumeRotation,
  volumeScale,
} from "../../assets/config.json";

const mapStateToProps = (state) => {
  return {
    colorMapping: state.checkBoxValue,
    xSlideValueMin: state.xSlideValueMin,
    xSlideValueMax: state.xSlideValueMax,
    ySlideValueMin: state.ySlideValueMin,
    ySlideValueMax: state.ySlideValueMax,
    zSlideValueMin: state.zSlideValueMin,
    zSlideValueMax: state.zSlideValueMax,
    transferFunction: state.transferFunction,
    colorMap: state.colorMap,
    opacity1: state.opacity1,
    opacity2: state.opacity2,
    lowNode: state.lowNode,
    highNode: state.highNode,
    alphaXDataArray: state.alphaXDataArray,
    alphaYDataArray: state.alphaYDataArray,
    channel: state.channel,
    cameraState: state.cameraState,
  };
};

export default connect(mapStateToProps)(
  class VolumeViewerOLD extends Component {
    render() {
      return (
        <Container fluid className="aframe-container mb-3" id="visualizer">
          <div id="modelLoaded" style={{ display: "none" }}>
            <Spinner />
          </div>
          <Scene id="myScene" background="color: black" embedded>
            <Entity
              id="rhand"
              laser-controls="hand: right"
              raycaster="objects: .clickableMesh"
              my-buttons-check={{ clipPlane: false, grabObject: false }}
              collider-check={{ intersecting: false }}
            />

            <Entity
              id="my2DclipplaneListener"
              render-2d-clipplane={{
                activateClipPlane: true,
                xCLipPlaneMin: this.props.xSlideValueMin,
                xCLipPlaneMax: this.props.xSlideValueMax,
                yCLipPlaneMin: this.props.ySlideValueMin,
                yCLipPlaneMax: this.props.ySlideValueMax,
                zCLipPlaneMin: this.props.zSlideValueMin,
                zCLipPlaneMax: this.props.zSlideValueMax,
                currenAxisAngle: "0 0 0",
                rotateAngle: "0 0 0",
                clipX: "0 0",
              }}
            />
            <a-plane
              class="clickable"
              id="my2Dclipplane"
              visible="false"
              height="1"
              width="1"
              material="color: red ; side:double; transparent:true;opacity:0.3"
              cursor-listener
            />

            <SelectorConsumer>
              {({ state }) => (
                <Entity
                  id="volumeCube"
                  class="clickableMesh"
                  myloader={{
                    rayCollided: false,
                    transferFunction: this.props.transferFunction,
                    colorMap: this.props.colorMap.src,
                    opacity1: this.props.opacity1,
                    opacity2: this.props.opacity2,
                    lowNode: this.props.lowNode,
                    highNode: this.props.highNode,
                    alphaXDataArray: this.props.alphaXDataArray,
                    alphaYDataArray: this.props.alphaYDataArray,
                    colorMapping: this.props.colorMapping,
                    channel: this.props.channel,
                    cameraState: this.props.cameraState,
                    path: `./assets/models/${state.selection.season.value}-${state.selection.tide.value}-${state.selection.measurement.value}.png`,
                    slices: state.slices,
                    x_spacing: state.x_spacing,
                    y_spacing: state.y_spacing,
                    z_spacing: state.z_spacing,
                  }}
                  position={volumePosition}
                  rotation={volumeRotation}
                  scale={volumeScale}
                />
              )}
            </SelectorConsumer>

            <a-entity
              cursor="rayOrigin:mouse"
              raycaster="objects: .clickable"
            />
            <Entity
              id="myCamera"
              camera="active: true"
              look-controls
              arcball-camera="initialPosition:0 0 1"
            />
          </Scene>
        </Container>
      );
    }
  }
);