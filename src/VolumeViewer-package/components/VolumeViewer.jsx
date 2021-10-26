import { Entity, Scene } from "aframe-react";
import { Container } from "react-bootstrap";

import "../../VolumeViewer-package/Aframe/arcball-camera";

import { useControlsContext } from "../context/controls-context";

function getCoordinates(transferFunctionNodes, plane) {
  let coordinates = [];
  if (plane === "x" || plane === "y") {
    transferFunctionNodes.forEach((node) => {
      coordinates.push(node[plane]);
    });
  } else console.error("Invalid Plane", plane);

  return coordinates;
}

export default function VolumeViewer(props) {
  const { volume } = props;
  const { state: controlsState } = useControlsContext();

  return (
    <Container fluid className="aframe-container p-0" id="visualizer">
      <Scene id="volumeViewerScene" background="color: black" embedded>
        <Entity
          id="rhand"
          laser-controls="hand: right"
          raycaster="objects: .clickableMesh"
          buttons-check={{ clipPlane: false, grabObject: false }}
          collider-check={{ intersecting: false }}
        />

        <Entity
          id="clipplane2DListener"
          render-2d-clipplane={{
            activateClipPlane: true,
            xBounds: controlsState.xSliderBounds,
            yBounds: controlsState.ySliderBounds,
            zBounds: controlsState.zSliderBounds,
            currentAxisAngle: "0 0 0",
            rotateAngle: "0 0 0",
            clipX: "0 0",
          }}
        />
        <a-plane
          class="clickable"
          id="clipplane2D"
          visible="false"
          height="1"
          width="1"
          material="color: red ; side:double; transparent:true;opacity:0.3"
          cursor-listener
        />

        <Entity
          id="volumeCube"
          class="clickableMesh"
          loader={{
            useTransferFunction: controlsState.useTransferFunction,
            colorMap: controlsState.colorMap.src,
            alphaXDataArray: getCoordinates(
              controlsState.transferFunctionNodes,
              "x"
            ),
            alphaYDataArray: getCoordinates(
              controlsState.transferFunctionNodes,
              "y"
            ),
            path: `./assets/models/${volume.selection.season.value}-${volume.selection.tide.value}-${volume.selection.measurement.value}.png`,
            slices: volume.slices,
            x_spacing: volume.x_spacing,
            y_spacing: volume.y_spacing,
            z_spacing: volume.z_spacing,
          }}
          position={volume.position}
          rotation={volume.rotation}
          scale={volume.scale}
        />

        <a-entity cursor="rayOrigin:mouse" raycaster="objects: .clickable" />
        <Entity
          id="camera"
          camera="active: true"
          look-controls
          arcball-camera="initialPosition:0 0 1"
        />
      </Scene>
    </Container>
  );
}
