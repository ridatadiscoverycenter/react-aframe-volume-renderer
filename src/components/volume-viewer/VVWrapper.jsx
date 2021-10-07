import Controls from "../controls/Controls";
import VolumeViewer from "./VolumeViewer";

import { useSelectorContext } from "../../context/selector-context";

export default function VVWrapper(props) {
  const { state } = useSelectorContext();
  return (
    <div>
      <Controls
        sidebarVisible={props.sidebarVisible}
        setSidebarVisible={props.setSidebarVisible}
      />
      <VolumeViewer volume={state} />
    </div>
  );
}
