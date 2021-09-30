import { Navbar, Nav, Container } from "react-bootstrap";

import VolumeRenderer from "./VolumeRenderer";
import ControlsPanel from "./ControlsPanel";
import Footer from "./Footer";
import Instructions from "./Instructions";

import { VolumeProvider } from "../../context/volume-context";


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

      <Container fluid id="visualizer" className="mb-3">
        <VolumeProvider>
          <ControlsPanel />
          <VolumeRenderer />
        </VolumeProvider>
      </Container>

      <Instructions />
      <Footer />
    </div>
  );
}
