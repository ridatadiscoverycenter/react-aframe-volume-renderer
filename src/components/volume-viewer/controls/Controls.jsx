import { Stack } from "react-bootstrap";

import OpacityControls from "./OpacityControl";
import ColorMapControls from "./ColorMapControls";
import ClipControls from "./ClipControls";

export default function Controls(props) {
  return (
    <Stack gap={4} className="mt-3">
      <ColorMapControls />
      <OpacityControls />
      <ClipControls />
    </Stack>
  );
}
