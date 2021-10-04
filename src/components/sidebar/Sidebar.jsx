import { Sidebar } from "primereact/sidebar";

import Controls from "./Controls.jsx";

export default function MySidebar({ sidebarVisible, setSidebarVisible }) {
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
