import React, { useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';

import VolumeRenderer from './volume-renderer/VolumeRenderer';
import ControlsPanel from './control-panel/ControlsPanel';
import Howto from './Howto'
import Footer from './Footer'

import { VolumeProvider } from '../../context/volume-context';
import Header from './Header';

export default function Layout(props) {
  const [showHowto, setShowHowto] = useState(false);

  return (
    <div id="visualizer">
      <Header />

      <Container fluid id="visualizer" className="mb-3">
        <VolumeProvider>
          <ControlsPanel />
          <VolumeRenderer />
        </VolumeProvider>
      </Container>

      <Container fluid id="information" className="bg-secondary text-light">
        <Row className="justify-content-md-center py-5">
          <Col xs={8}>
            <div className="d-flex flex-column">
              <h1 className="my-4">
                Narragansett Bay Volume Renderer
              </h1>

              <p className="my-4">
                The main goal of the project is to provide an easily accessible and interactive
                environment to explore and showcase volumetric Naragansett Bay data with the added
                benefits of Virtual Reality If VR-capable hardware is available.<br/>
              </p>

              <h2 className="mt-4 text-center">
                Learn How To Use the Volume Renderer
              </h2>
              <Button variant="primary" onClick={() => setShowHowto(true)}  className="mb-4">Launch Instructions</Button>

              <Howto
                show={showHowto}
                close={() => setShowHowto(false)}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}
