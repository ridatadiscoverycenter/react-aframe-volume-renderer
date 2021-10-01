/* globals AFRAME THREE */
import "../shaders/ccvLibVolumeShader.js";
var bind = AFRAME.utils.bind;

AFRAME.registerComponent("collider-check", {
  dependencies: ["raycaster", "my-buttons-check"],

  schema: {
    intersecting: { type: "boolean", default: false },
  },

  init: function () {
    this.onCollide = this.onCollide.bind(this);
    this.el.addEventListener("raycaster-intersection", this.onCollide);
  },

  onCollide: function (event) {
    this.data.intersecting = true;
  },
});

AFRAME.registerComponent("entity-collider-check", {
  schema: {
    intersected: { type: "boolean", default: false },
  },

  init: function () {
    this.onCollide = this.onCollide.bind(this);
    this.el.addEventListener("raycaster-intersected", this.onCollide);
  },

  onCollide: function (event) {
    this.data.intersected = true;
    console.log("entity-intesercted");
  },
});

AFRAME.registerComponent("myloader", {
  schema: {
    rayCollided: { type: "boolean", default: false },
    modelLoaded: { type: "boolean", default: false },
    transferFunction: { type: "string", default: "false" },
    colorMap: {
      type: "string",
      default: "./assets/images/colormaps/haline.png",
    },
    opacity1: { type: "number", default: 0 },
    opacity2: { type: "number", default: 0 },
    lowNode: { type: "number", default: 0 },
    highNode: { type: "number", default: 0 },
    alphaXDataArray: { type: "array" },
    alphaYDataArray: { type: "array" },
    colorMapping: { type: "boolean", default: false },
    channel: { type: "number", default: 6 },
    cameraState: { type: "string", default: "" },
    myMeshPosition: { type: "vec3", default: "" },
    path: { type: "string", default: "" },
    slices: { type: "number", default: 55 },
    x_spacing: { type: "number", default: 2.0 },
    y_spacing: { type: "number", default: 2.0 },
    z_spacing: { type: "number", default: 1.0 },
  },

  init: function () {
    this.objectPose = new THREE.Matrix4();
    this.controllerPose = new THREE.Matrix4();
    this.tempMatrix = new THREE.Matrix4();
    this.onCollide = this.onCollide.bind(this);
    this.grabbed = false;
    this.onSelectStart = this.onSelectStart.bind(this);
    this.onClearCollide = this.onClearCollide.bind(this);
    this.loadModel = this.loadModel.bind(this);
    this.updateTransferTexture = this.updateTransferTexture.bind(this);
    this.updateColorMapping = this.updateColorMapping.bind(this);
    this.debugScene = this.debugScene.bind(this);

    this.updateOpacityData = this.updateOpacityData.bind(this);
    this.colorMapNeedsUpdate = false;
    this.currentColorMap = this.data.colorMap;

    this.el.addEventListener("raycaster-intersected", this.onCollide);
    this.el.addEventListener(
      "raycaster-intersected-cleared",
      this.onClearCollide
    );

    this.colorTransferMap = new Map();

    this.group = new THREE.Group();

    this.isVrModeOn = false;
    this.mySpeed = 0.1;

    this.sceneHandler = this.el.sceneEl;
    this.group = new THREE.Group();

    this.controllerHandler = document.getElementById("rhand").object3D;
    this.controllerHandler.el.addEventListener(
      "selectstart",
      this.onSelectStart
    );

    this.clipPlaneListenerHandler = document.getElementById(
      "my2DclipplaneListener"
    ).object3D;
    this.clip2DPlaneRendered = false;

    this.clipPlaneHandler = document.getElementById("my2Dclipplane").object3D;

    this.controllerHandler.matrixAutoUpdate = false;
    this.grabState =
      this.controllerHandler.el.getAttribute("my-buttons-check").grabObject;
    var my2DclipPlane = document.getElementById("my2Dclipplane");
    if (my2DclipPlane !== undefined) {
      this.my2DclipPlaneHandler = my2DclipPlane.object3D;
    }

    // save mesh vr position and rotation on swich between desktop and vr
    this.vrPosition = new THREE.Vector3(0, 0, 0);
    this.vrRotation = new THREE.Vector3(0, 0, 0);
    this.debugVRPos = false;
    // bind onenterVR and onexitVR
    this.bindMethods();
    this.el.sceneEl.addEventListener("enter-vr", this.onEnterVR);
    this.el.sceneEl.addEventListener("exit-vr", this.onExitVR);

    this.opacityControlPoints = [0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

    var jet_values = [
      [0, 0, 0.5],
      [0, 0, 1],
      [0, 0.5, 1],
      [0, 1, 1],
      [0.5, 1, 0.5],
      [1, 1, 0],
      [1, 0.5, 0],
      [1, 0, 0],
      [0.5, 0, 0],
    ];

    var pData = [];
    this.alphaData = [];
    this.newAlphaData = [];
    var indices = [];
    var zeroArray = [0, 0, 0, 0];
    this.colorMapEnabled = this.data.colorMapping;

    //setting up control points
    for (var i = 0; i < 9; i++) {
      var index = i * 28;
      while (pData.length < index) {
        pData.push(zeroArray);
      }

      pData.push([
        jet_values[i][0] * 255,
        jet_values[i][1] * 255,
        jet_values[i][2] * 255,
        this.opacityControlPoints[i] * 255,
      ]);
      indices.push(index);
    }

    //interpolation between opacity control points
    for (let j = 0; j < 9 - 1; j++) {
      let dDataA = pData[indices[j + 1]][3] - pData[indices[j]][3];
      let dIndex = indices[j + 1] - indices[j];
      let dDataIncA = dDataA / dIndex;
      for (let idx = indices[j] + 1; idx < indices[j + 1]; idx++) {
        var myAlpha = pData[idx - 1][3] + dDataIncA;
        this.alphaData[idx] = myAlpha;
      }
    }

    // interpolation between colors control points
    for (let j = 0; j < 9 - 1; j++) {
      let dDataR = pData[indices[j + 1]][0] - pData[indices[j]][0];
      let dDataG = pData[indices[j + 1]][1] - pData[indices[j]][1];
      let dDataB = pData[indices[j + 1]][2] - pData[indices[j]][2];
      let dDataA = pData[indices[j + 1]][3] - pData[indices[j]][3];
      let dIndex = indices[j + 1] - indices[j];

      let dDataIncR = dDataR / dIndex;
      let dDataIncG = dDataG / dIndex;
      let dDataIncB = dDataB / dIndex;
      let dDataIncA = dDataA / dIndex;

      for (let idx = indices[j] + 1; idx < indices[j + 1]; idx++) {
        let myAlpha = pData[idx - 1][3] + dDataIncA;
        let myvector = [
          pData[idx - 1][0] + dDataIncR,
          pData[idx - 1][1] + dDataIncG,
          pData[idx - 1][2] + dDataIncB,
          myAlpha,
        ];
        this.alphaData[idx] = myAlpha;
        pData[idx] = myvector;
      }
    }

    this.myCanvas = this.el.sceneEl.canvas;

    this.printedLog = false;

    var cameraEl = document.querySelector("#myCamera");
    cameraEl.setAttribute("camera", "active", true);

    this.hiddenLabel = document.getElementById("modelLoaded");
  },

  debugScene: function (evt) {},

  updateTransferTexture: function () {
    if (this.colorTransferMap.has(this.currentColorMap)) {
      var colorTransfer = this.colorTransferMap.get(this.currentColorMap).data;
      var imageTransferData = new Uint8Array(4 * 256);
      for (var i = 0; i < 256; i++) {
        imageTransferData[i * 4 + 0] = colorTransfer[i * 3 + 0];
        imageTransferData[i * 4 + 1] = colorTransfer[i * 3 + 1];
        imageTransferData[i * 4 + 2] = colorTransfer[i * 3 + 2];
        imageTransferData[i * 4 + 3] = this.newAlphaData[i];
      }

      var transferTexture = new THREE.DataTexture(
        imageTransferData,
        256,
        1,
        THREE.RGBAFormat
      );
      transferTexture.needsUpdate = true;

      if (this.el.getObject3D("mesh") !== undefined) {
        var material = this.el.getObject3D("mesh").material;
        material.uniforms.u_lut.value = transferTexture;
        material.uniforms.useLut.value = true;
        material.needsUpdate = true;
      }
    }
  },

  bindMethods: function () {
    this.onEnterVR = bind(this.onEnterVR, this);
    this.onExitVR = bind(this.onExitVR, this);
  },

  onEnterVR: function () {},

  onExitVR: function () {
    if (this.el.getObject3D("mesh") !== undefined) {
      console.log("my-loader onExitVR 1: ");
      console.log(this.el.getObject3D("mesh").position);

      this.data.myMeshPosition.x = this.el.getObject3D("mesh").position.x;
      this.data.myMeshPosition.y = this.el.getObject3D("mesh").position.y;
      this.data.myMeshPosition.z = this.el.getObject3D("mesh").position.z;

      console.log("my-loader onExitVR this.data.myMeshPosition 1 : ");
      console.log(this.data.myMeshPosition);

      this.vrRotation = this.el.getObject3D("mesh").rotation;
      this.el.getObject3D("mesh").position.copy(new THREE.Vector3());
      console.log("my-loader onExitVR this.data.myMeshPosition 2 : ");
      console.log(this.data.myMeshPosition);

      this.el.getObject3D("mesh").rotation.set(0, 0, 0);

      console.log("my-loader onExitVR 2: ");
      console.log(this.el.getObject3D("mesh").position);
      this.debugVRPos = true;
    }
  },

  loadModel: function () {
    var currentVolume = this.el.getObject3D("mesh");
    const { x_spacing, y_spacing, z_spacing, slices, path } = this.data;
    if (currentVolume !== undefined) {
      //clear mesh
      currentVolume.geometry.dispose();
      currentVolume.material.dispose();
      this.el.removeObject3D("mesh");
      this.el.sceneEl.object3D.dispose();
      currentVolume = undefined;
    }

    if (path !== "") {
      this.hiddenLabel.style.display = "";
      var el = this.el;
      var data = this.data;
      var canvasWidth = this.myCanvas.width;
      var canvasHeight = this.myCanvas.height;

      const useTransferFunction =
        this.data.transferFunction === "false" ? false : true;
      var hiddenLabel = this.hiddenLabel;

      const updateColorMapping = this.updateColorMapping;

      //load as 2D texture
      new THREE.TextureLoader().load(
        path,
        function (texture) {
          var dim = Math.ceil(Math.sqrt(slices));
          var spacing = [x_spacing, y_spacing, z_spacing];

          var volumeScale = [
            1.0 / ((texture.image.width / dim) * spacing[0]),
            1.0 / ((texture.image.height / dim) * spacing[1]),
            1.0 / (slices * spacing[2]),
          ];

          var zScale = volumeScale[0] / volumeScale[2];

          texture.minFilter = texture.magFilter = THREE.LinearFilter;
          texture.unpackAlignment = 1;
          texture.needsUpdate = true;

          // Material
          var shader = THREE.ShaderLib["ccvLibVolumeRenderShader"];
          var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
          uniforms["u_data"].value = texture;
          uniforms["u_lut"].value = null;
          uniforms["clipPlane"].value = new THREE.Matrix4();
          uniforms["clipping"].value = false;
          uniforms["threshold"].value = 1;
          uniforms["multiplier"].value = 1;
          uniforms["slice"].value = slices;
          uniforms["dim"].value = dim;

          if (!useTransferFunction) {
            console.log("NOT USING LUT");
            uniforms["channel"].value = 6;
            uniforms["useLut"].value = false;
          } else {
            console.log("USING LUT");
            uniforms["useLut"].value = false;
          }
          uniforms["step_size"].value = new THREE.Vector3(
            1 / 100,
            1 / 100,
            1 / 100
          );

          uniforms["viewPort"].value = new THREE.Vector2(
            canvasWidth,
            canvasHeight
          );
          uniforms["P_inv"].value = new THREE.Matrix4();
          uniforms["depth"].value = null;
          uniforms["zScale"].value = zScale;
          uniforms["controllerPoseMatrix"].value = new THREE.Matrix4();
          uniforms["grabMesh"].value = false;
          uniforms["box_min"].value = new THREE.Vector3(0, 0, 0);
          uniforms["box_max"].value = new THREE.Vector3(1, 1, 1);

          var material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            transparent: true,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
            side: THREE.BackSide, // The volume shader uses the backface as its "reference point"
          });

          // Mesh
          var geometry = new THREE.BoxGeometry(1, 1, 1);

          el.setObject3D("mesh", new THREE.Mesh(geometry, material));
          data.modelLoaded = true;
          material.needsUpdate = true;

          hiddenLabel.style.display = "none";
          console.log("MODEL LOADED:", path);

          updateColorMapping();
        },
        function () {},
        function () {
          console.log("Could not load the data, Data not found");
        }
      );
    }
  },

  onCollide: function (event) {
    this.data.rayCollided = true;
  },

  onClearCollide: function (event) {
    this.data.rayCollided = false;
  },
  onSelectStart: function (event) {
    console.log("onSelectStart");
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  updateColorMapping: function () {
    if (!this.colorTransferMap.has(this.currentColorMap)) {
      var colorCanvas = document.createElement("canvas");

      const imgWidth = 255;
      const imgHeight = 15;
      const newColorMap = {
        img: document.createElement("img"),
        width: imgWidth,
        height: imgHeight,
        data: null,
      };

      newColorMap.img.src = this.currentColorMap;
      this.colorTransferMap.set(this.currentColorMap, newColorMap);
      const mappedColorMap = newColorMap;

      const updateTransferTexture = this.updateTransferTexture;

      newColorMap.img.onload = function (data) {
        colorCanvas.height = imgHeight;
        colorCanvas.width = imgWidth;
        var colorContext = colorCanvas.getContext("2d");
        colorContext.drawImage(newColorMap.img, 0, 0);
        var colorData = colorContext.getImageData(0, 0, imgWidth, 1).data;
        var colorTransfer = new Uint8Array(3 * 256);
        for (var i = 0; i < 256; i++) {
          colorTransfer[i * 3] = colorData[i * 4];
          colorTransfer[i * 3 + 1] = colorData[i * 4 + 1];
          colorTransfer[i * 3 + 2] = colorData[i * 4 + 2];
        }
        mappedColorMap.data = colorTransfer;
        updateTransferTexture();
      };
    } else {
      this.updateTransferTexture();
    }
  },

  update: function (oldData) {
    if (oldData === undefined) {
      return;
    }

    // this part updates the opacity control points
    if (
      (this.data.alphaXDataArray !== undefined &&
        oldData.alphaXDataArray !== this.data.alphaXDataArray) ||
      (this.data.alphaYDataArray !== undefined &&
        oldData.alphaYDataArray !== this.data.alphaYDataArray)
    ) {
      this.updateOpacityData(
        this.data.alphaXDataArray,
        this.data.alphaYDataArray
      );
      this.updateTransferTexture();
    }

    if (oldData.colorMap !== this.data.colorMap) {
      this.currentColorMap = this.data.colorMap;
      this.updateColorMapping();
    }

    if (oldData.path !== this.data.path) {
      this.loadModel();
    }
  },

  updateOpacityData: function (arrayX, arrayY) {
    this.newAlphaData = [];

    for (var i = 0; i <= arrayX.length - 2; i++) {
      var scaledColorInit = arrayX[i] * 255;
      var scaledColorEnd = arrayX[i + 1] * 255;

      var scaledAplhaInit = arrayY[i] * 255;
      var scaledAlphaEnd = arrayY[i + 1] * 255;

      var deltaX = scaledColorEnd - scaledColorInit;

      for (var j = 1 / deltaX; j < 1; j += 1 / deltaX) {
        // linear interpolation
        this.newAlphaData.push(scaledAplhaInit * (1 - j) + scaledAlphaEnd * j);
      }
    }
  },

  getMesh: function () {
    return this.el.getObject3D("mesh");
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
    if (this.debugVRPos) {
      this.debugVRPos = false;
    }

    var isVrModeActive = this.sceneHandler.is("vr-mode");
    if (this.data.modelLoaded) {
      if (this.clipPlaneListenerHandler !== undefined && !isVrModeActive) {
        if (
          this.clipPlaneListenerHandler.el.getAttribute("render-2d-clipplane")
            .activateClipPlane &&
          !this.clip2DPlaneRendered
        ) {
          this.clip2DPlaneRendered = true;
        } else if (
          !this.clipPlaneListenerHandler.el.getAttribute("render-2d-clipplane")
            .activateClipPlane &&
          this.clip2DPlaneRendered
        ) {
          this.clip2DPlaneRendered = false;

          if (this.el.getObject3D("mesh") !== undefined) {
            let material = this.el.getObject3D("mesh").material;
            material.uniforms.box_min.value = new THREE.Vector3(0, 0, 0);
            material.uniforms.box_max.value = new THREE.Vector3(1, 1, 1);
          }
        }

        if (this.clip2DPlaneRendered) {
          if (this.el.getObject3D("mesh") !== undefined) {
            let material = this.el.getObject3D("mesh").material;

            if (material !== undefined) {
              var sliceX = this.clipPlaneListenerHandler.el.getAttribute(
                "render-2d-clipplane"
              ).clipX;
              var sliceY = this.clipPlaneListenerHandler.el.getAttribute(
                "render-2d-clipplane"
              ).clipY;
              var sliceZ = this.clipPlaneListenerHandler.el.getAttribute(
                "render-2d-clipplane"
              ).clipZ;

              material.uniforms.box_min.value = new THREE.Vector3(
                sliceX.x,
                sliceY.x,
                sliceZ.x
              );
              material.uniforms.box_max.value = new THREE.Vector3(
                sliceX.y,
                sliceY.y,
                sliceZ.y
              );
            }
          }
        }
      } else if (this.controllerHandler !== undefined && isVrModeActive) {
        if (
          !this.controllerHandler.el.getAttribute("my-buttons-check")
            .grabObject &&
          this.grabbed
        ) {
          this.el
            .getObject3D("mesh")
            .matrix.premultiply(this.controllerHandler.matrixWorld);
          this.el
            .getObject3D("mesh")
            .matrix.decompose(
              this.el.getObject3D("mesh").position,
              this.el.getObject3D("mesh").quaternion,
              this.el.getObject3D("mesh").scale
            );
          this.el.object3D.add(this.el.getObject3D("mesh"));

          this.grabbed = false;
        }

        // grab mesh
        if (
          this.controllerHandler.el.getAttribute("my-buttons-check")
            .grabObject &&
          this.data.rayCollided &&
          !this.grabbed
        ) {
          var inversControllerPos = new THREE.Matrix4();
          inversControllerPos.getInverse(this.controllerHandler.matrixWorld);
          this.el.getObject3D("mesh").matrix.premultiply(inversControllerPos);
          this.el
            .getObject3D("mesh")
            .matrix.decompose(
              this.el.getObject3D("mesh").position,
              this.el.getObject3D("mesh").quaternion,
              this.el.getObject3D("mesh").scale
            );
          this.controllerHandler.add(this.el.getObject3D("mesh"));

          this.grabbed = true;
        }

        this.updateMeshClipMatrix(this.controllerHandler.matrixWorld);
      }
    }

    if (this.el.getObject3D("mesh") !== undefined) {
      this.data.myMeshPosition = this.el.getObject3D("mesh").position;
    }
  },

  updateMeshClipMatrix: function (currentSpaceClipMatrix) {
    var volumeMatrix = this.el.getObject3D("mesh").matrixWorld;
    //material for setting the clipPlane and clipping value
    var material = this.el.getObject3D("mesh").material;

    //scalematrix for zscaling
    var scaleMatrix = new THREE.Matrix4();
    scaleMatrix.makeScale(1, 1, material.uniforms.zScale.value);

    //translationmatrix to cube-coordinates ranging from 0 -1
    var translationMatrix = new THREE.Matrix4();
    translationMatrix.makeTranslation(-0.5, -0.5, -0.5);

    //inverse of the clipMatrix
    var currentSpaceClipMatrix_inverse = new THREE.Matrix4();
    currentSpaceClipMatrix_inverse.getInverse(currentSpaceClipMatrix);

    //outputmatrix - controller_inverse * volume * scale * translation
    var clipMatrix = new THREE.Matrix4();
    clipMatrix.multiplyMatrices(currentSpaceClipMatrix_inverse, volumeMatrix);
    clipMatrix.multiplyMatrices(clipMatrix, scaleMatrix);
    clipMatrix.multiplyMatrices(clipMatrix, translationMatrix);

    //set uniforms of shader
    var isVrModeActive = this.sceneHandler.is("vr-mode");
    var doClip =
      isVrModeActive &&
      this.controllerHandler.el.getAttribute("my-buttons-check").clipPlane &&
      !this.grabbed;
    material.uniforms.clipPlane.value = clipMatrix;
    material.uniforms.clipping.value = doClip;
  },
});