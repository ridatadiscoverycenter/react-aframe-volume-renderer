# RIDDC Web Volume Rendering

This project is an effor to integrate data visualization on VR and web browser technologies.
This project was developed using react-js and Aframe (webvr - threejs -webgl2)

##### Table of Contents
* [Installation](#Installation)
* [About this project](#About)
* [Live demo](#Demo)
* [Enable Mozilla Firefox VR](#FireFoxVR)

<a name="Installation"/>
## Installation

For local deployment, clone - download the repository and in the project directory run

#### `npm install`

The package manager will install all the depencies. When it is done run:

##### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

<a name="About"/>
## About this project


WebVR Volume Rendering.

#### Introduction

A web based 3D volume visualizer application to support scientific 3D data built on top of webgl that will facilitate the access from any web browser, plus the benefits of VR.
This specific release showcases data from the Narragansett Bay in Rhode Island on different seasons and ocean conditions.

![Application_Arch](./imgs/archit.png)

<a name="Demo"/>

#### Live Demo

[Click here for live demo](https://bay-viewer.riddc.brown.edu/)



#### A-Frame Implementation

Following A-Frame’s philosophy, the application has a custom component that reads, loads and render 3D textures as volume data. To accomplish this, An 'aframe-react' entity is created and we attach our custom component:

    <Entity id="volumeCube" class="clickableMesh"   myloader={{'path_to_data'}}   position="0 0 0"/>

Althoug it can be attached to a generic aframe entity:

    <a-entity id="volumeCube"  myloader="path_to_data" position="0 0 0">

‘Id’ and ‘class’ are identifiers of the html element during the application’s life cycle. Events and dynamic properties query for these names to change their internal properties such as position and color.

‘myLoader’ is the name of the component responsible for the volume rendering. The attribute ‘volumeData’ is a string with the local file path of the data to be loaded. In the above case, it is loading from the path ./assets/models/nrrd/00.nrrd.

#### myLoader attributes:

|  Name         | Type          | Description  |
| ------------- | ------------- | ------------- |
| colorMap  | string  | path to the color map 1d texture   |
| position | vector3  | position of the volume in worl space |
| alphaXDataArray   | array  | Opacity values in the X coordinate. This represents the color the opacity is going to modify |
| alphaYDataArray   | array  | Opacity values in the Y coordinate. This represents the alpha value of the X color  |


Additional third party components used on this project are:

- React-js
- Aframe-React
- react-slider


#### myLoader implementation

This code is located on the file src/components/my-loader.js. It registers the A-Frame component:

    AFRAME.registerComponent('myloader', {

Every component on A-Frame has a series of methods to be extended to determine its behavior  in the application. In our case we implemented:

* schema:  Defines its attributes such as ‘volumeData’.
* Init: Sets the initial state of the entity. Also, It loads the shaders and transfer functions.
* Tick: check for events in the vr controllers to produce real time interaction with the data.

#### How the application works

Please refer to the [instructions](https://bay-viewer.riddc.brown.edu/#information) section in the web-page.
