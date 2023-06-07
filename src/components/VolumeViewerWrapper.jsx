import { Container } from "react-bootstrap";
import { VolumeViewer, COLOR_MAPS, Blending } from "react-volume-viewer";
import { MODEL_CONSTANTS, MODEL_DATA } from "../constants/constants";

export default function VolumeViewerWrapper({
  colorMap,
  selection,
  controlsVisible,
}) {
  const fileName = `${selection.season.value}-${selection.tide.value}-${selection.measurement.value}`;
  const modelData = MODEL_DATA[`${fileName}`];
  const dataColorMap =
    colorMap === "salt" ? COLOR_MAPS.Haline : COLOR_MAPS.Thermal;

  return (
    <Container fluid className="p-4">
      <VolumeViewer
        className="volumeViewer"
        controlsVisible={controlsVisible}
        blending={Blending.Max}
        models={[
          {
            name: `${fileName}`,
            colorMap: dataColorMap,
            path: `./assets/models/${fileName}.png`,
            range: { ...modelData, mid: (modelData.min + modelData.max) / 2 },
          },
        ]}
        {...MODEL_CONSTANTS}
      />
    </Container>
  );
}
