import { Container } from "react-bootstrap";
import { VolumeViewer } from "react-volume-viewer";
import config from "../assets/config.json";
import configMinMax from "../assets/volume-min-max.json";

export default function VolumeViewerWrapper(props) {
  const { ALL_COLOR_MAPS, colorMap, selection, controlsVisible } = props;

  const model = {
    path: `./assets/models/${selection.season.value}-${selection.tide.value}-${selection.measurement.value}.png`,
    range:
      configMinMax[
        `${selection.season.value}-${selection.tide.value}-${selection.measurement.value}`
      ],
    position: config.volumePosition,
    rotation: config.volumeRotation,
    scale: config.volumeScale,
    slices: config.slices,
    spacing: {
      x: config.x_spacing,
      y: config.y_spacing,
      z: config.z_spacing,
    },
  };

  return (
    <Container fluid className="p-4">
      <VolumeViewer
        className="volumeViewer"
        colorMaps={ALL_COLOR_MAPS}
        controlsVisible={controlsVisible}
        model={model}
        colorMap={colorMap}
      />
    </Container>
  );
}
