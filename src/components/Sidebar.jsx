import { Sidebar } from "primereact/sidebar";

import Controls from "./controls/Controls";

export default function MySidebar(props) {
  const { sidebarVisible, setSidebarVisible } = props;
  return (
    <Sidebar
      modal={false}
      position="left"
      visible={sidebarVisible}
      onHide={(e) => setSidebarVisible(false)}
    >
      <Controls />
    </Sidebar>
  );
}
