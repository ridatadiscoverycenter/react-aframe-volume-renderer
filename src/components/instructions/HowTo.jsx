import React from "react";
import { Modal, ModalBody, Navbar, Nav, Button, Row } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function HowTo(props) {
  return (
    <div>
      <Modal size="xl" backdrop="static" scrollable={true} show={props.show}>
        <ModalHeader>
          <Modal.Title>
            Web VR Volume Visualizer
            <span role="img" aria-label="waving emoji">
              👋
            </span>
          </Modal.Title>
          <Navbar sticky="top" expand="md">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#user-guide">User Guide</Nav.Link>
                <Nav.Link href="#enabling-vr">Enabling VR</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </ModalHeader>

        <ModalBody className="px-4">
          <h2 id="user-guide" className="mb-4">
            User Guide
          </h2>
          <Row className="my-4">
            <p>
              Welcome to the Narragansett Bay Volume Viewer. This short guide is
              meant to help new users on how to navigate and analyze the 3D
              volume data.
            </p>
          </Row>
          <Row className="my-4">
            <p>
              Multiple measurements of the data are available to analyze and
              have fun with. Toggle the buttons to switch between the different
              measurements.
            </p>
            <img
              src="assets/images/howto/riddc-volume-selection-guide.gif"
              alt="Instructional gif on displaying data"
              width="100%"
            />
          </Row>
          <Row className="my-4">
            <p>
              Scrolling controls zoom. Scroll up to zoom in and scroll down to
              zoom out. Click and drag to rotate the data on three different
              axes.
            </p>
            <img
              src="assets/images/howto/riddc-camera-guide.gif"
              alt="Instructional gif on zooming in and out"
              width="100%"
            />
          </Row>
          <Row className="my-4">
            <p>
              Click on the "Options" button to enable the color map editor.
              Switch between the different color maps to observe different
              properties of the data. Some regions will highlight more than
              others according to specific colors.
            </p>
            <img
              src="assets/images/howto/riddc-color-map-guide.gif"
              alt="Instructional gif on applying a color texture"
              width="100%"
            />
          </Row>
          <Row className="my-4">
            <p>
              Use the Transfer function graph to modify the transparency of
              pixels according to their mapped color. This allows you to
              highlight/obscure specific ranges of data. To add a point double
              click on the place you want to put a new control point. Right
              click on an existing point to delete it.
            </p>
            <img
              src="assets/images/howto/riddc-opacity-map-guide.gif"
              alt="Instructional gif on applying a color texture"
              width="100%"
            />
          </Row>
          <Row className="my-4">
            <p>
              Lastly, to clip the data, use the ranged slices to cut through the
              dataset on three different axes.
            </p>
            <img
              src="assets/images/howto/riddc-slices-guide.gif"
              alt="Instructional gif on cutting through the dataset on an axis"
              width="100%"
            />
          </Row>
          <hr className="my-4" />

          <h2 id="enabling-vr">Enable VR Headset on Web Browser</h2>
          <Row>
            <p>Prerequisites:</p>
          </Row>
          <Row>
            <ol>
              <li className="mx-3">Windows operating system</li>
              <li className="mx-3">
                Firefox browser (others browsers may work, but have not tested)
              </li>
              <li className="mx-3">VR Headset (e.g. Oculus, Vive)</li>
              <li className="mx-3">
                <a href="https://support.oculus.com/articles/headsets-and-accessories/oculus-rift-s/recommended-gpu/">
                  Graphics Card compatible with VR{" "}
                </a>
              </li>
              <li className="mx-3">Steam VR</li>
            </ol>
          </Row>
          <Row>
            <p>
              In order to enable this option in your computer, please follow
              these steps:
            </p>
            <ol>
              <li className="mx-3">
                Right Click onn your Desktop and select Nvidia Control Panel
              </li>
              <li className="mx-3">
                In the NVIDIA panel window, select the "Program Settings" Tab
              </li>
              <li className="mx-3">
                In the 'Select a program' drop list select the Mozilla Firefox
                (If you dont find it, you will have to click on the 'add'
                button, look for firefox.exe). In the 'Select the preferred
                graphics processor for this program' drop list select 'High-
                Performance NVIDIA processor'
              </li>
            </ol>
            <img
              src="assets/images/howto/webvrNvidia2.gif"
              alt="Instructional gif on enabling graphics accelerator on Mozilla Firefox"
              width="100%"
            />
          </Row>
        </ModalBody>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.close()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
