import Controls from "../controls/Controls";
import VolumeViewer from "./VolumeViewer";

import { ControlsProvider } from "../../context/controls-context.js";
import { useSelectorContext } from "../../context/selector-context";

export default function VVWrapper(props) {
  const { state } = useSelectorContext();
  return (
    <div>
      <ControlsProvider>
        <Controls
          sidebarVisible={props.sidebarVisible}
          setSidebarVisible={props.setSidebarVisible}
        />

        {/* <VolumeViewerOLD /> */}

        {/* New - function based */}
        <VolumeViewer volume={state} />
      </ControlsProvider>
    </div>
  );
}
