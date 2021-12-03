import { Container } from "react-bootstrap";
import { VolumeViewer } from "react-volume-viewer";
import config from "../assets/config.json";

export default function VolumeViewerWrapper(props) {
  const {
    ALL_COLOR_MAPS,
    CONFIG_MIN_MAX,
    colorMap,
    selection,
    controlsVisible,
  } = props;

  const model = {
    path: `./assets/models/${selection.season.value}-${selection.tide.value}-${selection.measurement.value}.png`,
    range:
      CONFIG_MIN_MAX[
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

  console.log("PATH", model.path);

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