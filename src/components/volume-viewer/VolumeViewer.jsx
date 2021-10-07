import { Entity, Scene } from "aframe-react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import "../../Aframe/arcball-camera";

import {
  volumePosition,
  volumeRotation,
  volumeScale,
} from "../../assets/config.json";
import Spinner from "./Spinner";

import { useControlsContext } from "../../context/controls-context";

function getCoordinates(transferFunctionNodes, plane) {
  let coordinates = []
  
  if(plane === "x" || plane === "y") {
    transferFunctionNodes.forEach(node => {
      coordinates.push(node[plane])
    })
  } else console.error("Invalid Plane", plane)

  return coordinates
}

export default function VolumeViewer(props) {
  const { volume } = props;
  const { state: controlsState } = useControlsContext();
  const reduxState = useSelector((state) => state);

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
            xCLipPlaneMin: controlsState.xLowerBound,
            xCLipPlaneMax: controlsState.xUpperBound,
            yCLipPlaneMin: controlsState.yLowerBound,
            yCLipPlaneMax: controlsState.yUpperBound,
            zCLipPlaneMin: controlsState.zLowerBound,
            zCLipPlaneMax: controlsState.zUpperBound,
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

        <Entity
          id="volumeCube"
          class="clickableMesh"
          myloader={{
            useTransferFunction: controlsState.USE_TRANSFER_FUNCTION,
            colorMap: controlsState.colorMap.src,
            // alphaXDataArray: reduxState.alphaXDataArray,
            // alphaYDataArray: reduxState.alphaYDataArray,
            alphaXDataArray: getCoordinates(controlsState.transferFunctionNodes, "x"),
            alphaYDataArray: getCoordinates(controlsState.transferFunctionNodes, "y"),
            channel: reduxState.channel,
            path: `./assets/models/${volume.selection.season.value}-${volume.selection.tide.value}-${volume.selection.measurement.value}.png`,
            slices: volume.slices,
            x_spacing: volume.x_spacing,
            y_spacing: volume.y_spacing,
            z_spacing: volume.z_spacing,
          }}
          position={volumePosition}
          rotation={volumeRotation}
          scale={volumeScale}
        />

        <a-entity cursor="rayOrigin:mouse" raycaster="objects: .clickable" />
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
