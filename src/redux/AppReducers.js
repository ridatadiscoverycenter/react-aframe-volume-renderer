import { colorMaps, range } from "../assets/config.json";

const initialState = {
  checkBoxValue: false,
  xSlideValueMin: range.min,
  xSlideValueMax: range.max,
  ySlideValueMin: range.min,
  ySlideValueMax: range.max,
  zSlideValueMin: range.min,
  zSlideValueMax: range.max,
  transferFunction: false,
  colorMap: colorMaps[0],
  alphaXDataArray: [0, 0.11739130434782609, 0.34782608695652173, 1],
  alphaYDataArray: [0, 0.11739130434782609, 0.34782608695652173, 1],
};

export const myReducer = function readCheckBox(state = initialState, action) {
  switch (action.type) {
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
    case "COLOR_MAP_CHANGED": {
      return {
        ...state,
        colorMap: action.payload,
        transferFunction: action.payload !== "" ? true : false,
      };
    }
    case "UPDATED_APLHA_DATA": {
      return {
        ...state,
        alphaXDataArray: action.payload,
        alphaYDataArray: action.payload2,
      };
    }
    default: {
      return { ...state };
    }
  }
};
