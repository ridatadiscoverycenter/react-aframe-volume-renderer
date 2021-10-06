import Controls from "../controls/Controls";
import VolumeViewer from "./VolumeViewer.js";
import NewVolumeViewer from "./VolumeViewer.jsx"

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

        <VolumeViewer />

        {/* New - function based */}
        <NewVolumeViewer 
          volume={state}
        />
      </ControlsProvider>
    </div>
  );
}
