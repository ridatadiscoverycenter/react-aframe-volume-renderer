import Controls from "../controls/Controls";
import VolumeViewer from "./VolumeViewer.js";
import { ControlsProvider } from "../../context/controls-context.js";

export default function VVWrapper(props) {
  return (
    <div>
      <ControlsProvider>
        <Controls
          sidebarVisible={props.sidebarVisible}
          setSidebarVisible={props.setSidebarVisible}
        />
        <VolumeViewer />
      </ControlsProvider>
    </div>
  );
}
