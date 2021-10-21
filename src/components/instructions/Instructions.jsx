import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

import HowTo from "./HowTo";

export default function Instructions(props) {
  const [howToVisible, setHowToVisible] = useState(false);

  return (
    <Container fluid id="information" className="bg-secondary text-light p-4">
      <Row className="justify-content-md-center py-5">
        <Col xs={8}>
          <div className="d-flex flex-column">
            <h1 className="my-4">Narragansett Bay Volume Viewer</h1>

            <p className="my-4">
              The main goal of the project is to provide an easily accessible
              and interactive environment to explore and showcase volumetric
              Narragansett Bay data from the{" "}
              <a
                href="https://riddc-jupyter-book.web.app/notebooks/fox-kemper/osom_intro.html#"
                target="_blank"
                rel="noreferrer"
              >
                Ocean State Ocean Model
              </a>{" "}
              with the added benefits of Virtual Reality, if VR-capable hardware
              is available.
              <br />
            </p>

            <h2 className="mt-4 text-center">
              Learn How To Use the Volume Viewer
            </h2>
            <Button
              variant="primary"
              onClick={() => setHowToVisible(true)}
              className="mb-4"
            >
              Launch Instructions
            </Button>
            <HowTo show={howToVisible} close={() => setHowToVisible(false)} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
