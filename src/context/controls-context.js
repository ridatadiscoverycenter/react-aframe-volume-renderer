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
    xLowerBound: range.min,
    xUpperBound: range.max,
    yLowerBound: range.min,
    yUpperBound: range.max,
    zLowerBound: range.min,
    zUpperBound: range.max,
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
        xLowerBound: action.payload,
        xUpperBound: action.payload2,
      };
    }
    case "CHANGE_Y_SLIDER": {
      return {
        ...state,
        yLowerBound: action.payload,
        yUpperBound: action.payload2,
      };
    }
    case "CHANGE_Z_SLIDER": {
      return {
        ...state,
        zLowerBound: action.payload,
        zUpperBound: action.payload2,
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
