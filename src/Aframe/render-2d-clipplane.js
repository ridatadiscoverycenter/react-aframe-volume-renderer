/* globals AFRAME  */

let KEYS = [
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "KeyQ",
  "KeyP",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
  "ArrowDown",
];

AFRAME.registerComponent("render-2d-clipplane", {
  schema: {
    activateClipPlane: { type: "boolean", default: false },
    xBounds: { type: "array", default: [0, 1] },
    yBounds: { type: "array", default: [0, 1] },
    zBounds: { type: "array", default: [0, 1] },
    currentAxisAngle: { type: "vec3" },
    rotateAngle: { type: "vec3" },
    clipX: { type: "vec2" },
    clipY: { type: "vec2" },
    clipZ: { type: "vec2" },
  },

  init: function () {
    this.tempVec = { x: 0, y: 0, z: 0 };
    this.active = false;
    this.rendererPlane = false;
    this.keys = {};

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.activate2DClipPlane = this.activate2DClipPlane.bind(this);

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  },

  update: function () {},

  tick: function (time, timeDelta) {
    this.tempVec.x = this.data.xCLipPlaneRotation;
    this.tempVec.y = this.data.yCLipPlaneRotation;
    this.tempVec.z = this.data.zCLipPlaneRotation;

    this.data.clipX = {
      x: this.data.xBounds[0],
      y: this.data.xBounds[1],
    };
    this.data.clipY = {
      x: this.data.yBounds[0],
      y: this.data.yBounds[1],
    };
    this.data.clipZ = {
      x: this.data.zBounds[0],
      y: this.data.zBounds[1],
    };

    // I dont know why I have to save the current angle axis using a temporal variable. Maybe Aframe updates
    // data on a asynchronous call
    this.data.currentAxisAngle.x = this.tempVec.x;
    this.data.currentAxisAngle.y = this.tempVec.y;
    this.data.currentAxisAngle.z = this.tempVec.z;

    if (this.keys.KeyQ && !this.active) {
      this.active = true;
    }
    if (this.keys.KeyS && this.active) {
      this.active = false;
    }

    if (this.active && !this.rendererPlane) {
      this.data.activateClipPlane = true;
      this.rendererPlane = true;
    }

    if (!this.active && this.rendererPlane) {
      this.data.activateClipPlane = false;
      this.rendererPlane = false;
    }
  },

  remove: function () {
    this.removeEventListeners();
  },

  onKeyDown: function (event) {
    let code = event.code;
    if (this.isVrModeOn) {
      return;
    }
    if (KEYS.indexOf(code) !== -1) {
      this.keys[code] = true;
    }
  },

  onKeyUp: function (event) {
    let code = event.code;
    delete this.keys[code];
  },

  activate2DClipPlane: function (event) {
    this.data.isActive = false;
  },

  removeEventListeners: function () {
    window.removeEventListener("keydown", this.onKeydown);
    window.removeEventListener("keyup", this.onKeyUp);
  },
});
