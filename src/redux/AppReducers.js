import config from "../assets/config.json"

const initialState = {
  checkBoxValue: false,
  xSlideValueMin: 0,
  xSlideValueMax: 0,
  ySlideValueMin: 0,
  ySlideValueMax: 0,
  zSlideValueMin: 0,
  zSlideValueMax: 0,
  transferFunction: false,
  colorMap: config.colorMaps[0],
  opacity1: 0,
  opacity2: 1,
  lowNode: 0,
  highNode: 1,
  alphaXDataArray: null,
  alphaYDataArray: null,
  channel: 6,
};

export const myReducer = function readCheckBox(
  state = initialState,
  action
) {
  console.log("Initial State", state)
  switch (action.type) {
    case "CHECKBOX_CHANGED": {
      return {
        ...state,
        checkBoxValue: action.payload,
      };
    }
    case "XSLIDE_CHANGED": {
      return {
        ...state,
        xSlideValueMin: action.payload,
        xSlideValueMax: action.payload2,
      };
    }
    case "YSLIDE_CHANGED": {
      return {
        ...state,
        ySlideValueMin: action.payload,
        ySlideValueMax: action.payload2,
      };
    }
    case "ZSLIDE_CHANGED": {
      return {
        ...state,
        zSlideValueMin: action.payload,
        zSlideValueMax: action.payload2,
      };
    }
    case "VOLUME_CHANGED": {
      return {
        ...state,
        transferFunction: action.payload2,
      };
    }
    case "COLOR_MAP_CHANGED": {
      // console.log("COLOR_MAP_CHANGED", action.payload)
      return {
        ...state,
        colorMap: action.payload,
        transferFunction: action.payload !== "" ? true : false,
      };
    }
    case "OPACITY1_CHANGED": {
      return {
        ...state,
        opacity1: action.payload,
      };
    }
    case "OPACITY2_CHANGED": {
      return {
        ...state,
        opacity2: action.payload,
      };
    }
    case "LOW_NODE_CHANGED": {
      return {
        ...state,
        lowNode: action.payload,
      };
    }
    case "HIGH_NODE_CHANGED": {
      return {
        ...state,
        highNode: action.payload,
      };
    }
    case "UPDATED_APLHA_DATA": {
      return {
        ...state,
        alphaXDataArray: action.payload,
        alphaYDataArray: action.payload2,
      };
    }
    case "SAVE_COLOR_DATA": {
      return {
        ...state,
        currentColorMap: action.payload,
      };
    }
    case "CHANNEL_CHANGED": {
      return {
        ...state,
        channel: action.payload,
      };
    }
    default: {
      return {
        ...state,
        checkBoxValue: false,
        transferFunction: false,
      };
    }
  }
};
