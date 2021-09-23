import React from 'react'
import 'aframe'
import 'aframe-event-set-component'
import 'aframe-orbit-controls'

import './components/Aframe/my-loader.js'
import './components/Aframe/my-buttons-check.js'
import './components/Aframe/render-2d-clipplane'
import './components/Aframe/cursor-listener'

import './styles/main.scss'

import Header from './components/React/Header';
import Visualizer from './components/React/Visualizer';
import Footer from './components/React/Footer'
import Information from "./components/React/Information";


export default function App() {
  return (
    <div id="visualizer">
      <Header />
      <Visualizer />
      <Information />
      <Footer />
    </div>
  );
}
