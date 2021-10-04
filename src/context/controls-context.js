import { createContext, useContext, useReducer } from "react";
import { colorMaps, range } from "../assets/config.json";

const ControlsContext = createContext();

// Custom component to provide the Controls context
function ControlsProvider(props) {
  const [state, dispatch] = useReducer(volumeReducer, {
    allColorMaps: colorMaps,
    sliderRange: range,
    colorMap: colorMaps[0],
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
      }
    }
    case "CHANGE_X_SLIDER": {
      return {
        ...state,
        xLowerBound: action.payload,
        xUpperBound: action.payload2,
      }
    }
    case "CHANGE_Y_SLIDER": {
      return {
        ...state,
        yLowerBound: action.payload,
        yUpperBound: action.payload2,
      }
    }
    case "CHANGE_Z_SLIDER": {
      return {
        ...state,
        zLowerBound: action.payload,
        zUpperBound: action.payload2,
      }
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