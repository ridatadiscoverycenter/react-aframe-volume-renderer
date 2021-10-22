import Controls from "../controls/Controls";
import VolumeViewer from "./VolumeViewer";

import { useSelectorContext } from "../../context/selector-context";

export default function VolumeViewerWrapper(props) {
  const { state } = useSelectorContext();
  return (
    <div>
      <Controls
        sidebarVisible={props.sidebarVisible}
        setSidebarVisible={props.setSidebarVisible}
        volume={state}
      />
      <VolumeViewer volume={state} />
    </div>
  );
}
