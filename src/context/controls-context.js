import { createContext, useContext, useReducer } from "react";
import {
  colorMaps,
  range,
  initialTransferFunction,
} from "../assets/config.json";

const ControlsContext = createContext();

// Custom component to provide the Controls context
function ControlsProvider(props) {
  const [state, dispatch] = useReducer(volumeReducer, {
    // Constants
    // TODO: MAKE_CAPITAL_CASE
    allColorMaps: colorMaps,
    sliderRange: range,
    USE_TRANSFER_FUNCTION: true,

    // Color Map and Opacity
    colorMap: colorMaps[0],
    transferFunctionNodes: initialTransferFunction,

    // Sliders
    xSliderBounds: [range.min, range.max],
    ySliderBounds: [range.min, range.max],
    zSliderBounds: [range.min, range.max],
  });

  const value = { state, dispatch };
  return (
    <ControlsContext.Provider value={value}>
      {props.children}
    </ControlsContext.Provider>
  );
}

// Custom hook to get the current ControlsContext
function useControlsContext() {
  const context = useContext(ControlsContext);
  if (context === undefined) {
    throw new Error("useControls must be used within a ControlsProvider");
  }
  return context;
}

// Custom reducer to update the ControlsContext
function volumeReducer(state, action) {
  switch (action.type) {
    case "CHANGE_COLOR_MAP": {
      return {
        ...state,
        colorMap: action.payload,
      };
    }
    case "CHANGE_TRANSFER_FUNCTION": {
      return {
        ...state,
        transferFunctionNodes: action.payload,
      };
    }
    case "CHANGE_X_SLIDER": {
      return {
        ...state,
        xSliderBounds: action.bounds
      };
    }
    case "CHANGE_Y_SLIDER": {
      return {
        ...state,
        ySliderBounds: action.bounds
      };
    }
    case "CHANGE_Z_SLIDER": {
      return {
        ...state,
        zSliderBounds: action.bounds
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Custom component to get the current ControlsContext (class based components)
function ControlsConsumer(props) {
  return (
    <ControlsContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error(
            "ControlsConsumer must be used within a ControlsProvider"
          );
        }
        return props.children(context);
      }}
    </ControlsContext.Consumer>
  );
}

export { useControlsContext, ControlsProvider, ControlsConsumer };

// TEMP - only for OpacityControls while it's class based
export { ControlsContext };
