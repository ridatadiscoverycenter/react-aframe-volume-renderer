import React from "react";
import { Modal, ModalBody, Navbar, Nav, Row } from "react-bootstrap";
import { Button } from "primereact/button";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function Howto(props) {
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

        <ModalBody className="mb-4">
          <h2 id="user-guide" className="mb-4">
            User Guide
          </h2>
          <Row class>
            <div className="text-center mb-4">
              <p>
                Welcome to the Narragansett Bay Volume viewer. This short guide is meant
                to help new users on how to navigate and analyze the 3D volume data.
              </p>
              <div className="text-center">
              <img
                src="assets/images/howto/ridc-intro-guide.png"
                alt="Example screenshot"
                width="80%"
              />
              </div>
              
            </div>

            <hr className="my-4" />
          </Row>
          <Row>
            <div className="text-center">
              <p>
                Multiple measurements of the data are available to analyze and
                have fun with. Toggle the buttons to switch between the
                different measurements.
              </p>
              <img
                src="assets/images/howto/ridc-volume-selection-guide.gif"
                alt="Instructional gif on displaying data"
                width="80%"
              />
            </div>
            <hr className="my-4" />
          </Row>
          <Row>
            <div className="text-center">
              <p>
                Scrolling controls zoom. Scroll up to zoom in and scroll down to zoom out. 
                Click and drag to rotate the data on three different axes.
              </p>
              <img
                src="assets/images/howto/ridc-camera-guide.gif"
                alt="Instructional gif on zooming in and out"
                width="80%"
              />
            </div>
            <hr className="my-4" />
          </Row>
          <Row >
            <p className="my-4">
                Click on the "Options" button to enable the color map editor.
                Swtich beween the different color maps to observe
                different properties of the data. Some regions will highlight
                more than others according to specific colors.
            </p>
            <div className="text-center">  
              <img
                src="assets/images/howto/ridc-color-map-guide.gif"
                alt="Instructional gif on applying a color texture"
                width="80%"
              ></img>
            </div>
            <hr className="my-4" />
          </Row>
          <Row>
            <p>
                Use the Transfer function graph to modify the transparency of
                pixels according to their mapped color. To add point double
                click on the place you want to put a new control point. Right
                click on an existing point to delete it.
            </p>
            <div className="text-center">
              
              <img
                src="assets/images/howto/ridc-opacity-map-guidie.gif"
                alt="Instructional gif on applying a color texture"
                width="80%"
              ></img>
            </div>
            <hr className="my-4" />
          </Row>
          <Row>
            <div className="text-center">
              <p>
                Lastly, to clip the data, use the ranged slices to cut through 
                the dataset on three different axes.
              </p>
              <img
                src="assets/images/howto/ridc-slices-guide.gif"
                alt="Instructional gif on cutting through the dataset on an axis"
                width="80%"
              />
            </div>
            <hr className="my-4" />
          </Row>

          <h2 id="enabling-vr" className="mb-4">
            Enable VR on Web Browser
          </h2>
          <Row>
          <p>To enable this feature you require: </p>
             
              <ul>
                <li>Winodws O.S</li>
                <li>Firefox definitely supported (others may or may not work, not tested))</li>
                <li>VR Headset (Oculus, Vive)</li>
                <li><a href="https://support.oculus.com/articles/headsets-and-accessories/oculus-rift-s/recommended-gpu/">Graphics Card compatible with VR </a></li>
                <li>Steam VR</li>
              </ul>
              
              <p>
                At this moment, VR on web browsers is only supported on Mozilla
                Firefox. In order to enable this option in your computer, please
                follow these steps:
              </p>
            <div >
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
                src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/webvrNvidia2.gif"
                alt="Instructional gif on enabling graphics accelerator on Mozilla Firefox"
                width="100%"
              />
            </div>
          </Row>
        </ModalBody>

        <Modal.Footer>
          <Button variant="primary" onClick={() => props.close()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
