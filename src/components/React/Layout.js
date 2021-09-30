import { Navbar, Nav} from "react-bootstrap";

import VolumeViewer from "./VolumeViewer";
import Instructions from "./Instructions";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <div id="visualizer">
      <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Brand href="https://ridatadiscovery.org">
          <img
            src="/assets/images/ricaim-logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Rhode Island Data Discovery Center"
          />
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="#visualizer">Visualizer</Nav.Link>
          <Nav.Link href="#information">Info</Nav.Link>
        </Nav>
      </Navbar>

      <VolumeViewer />
      <Instructions />
      <Footer />
    </div>
  );
}
