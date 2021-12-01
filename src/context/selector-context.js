import { createContext, useContext, useReducer } from "react";
import config from "../assets/config.json";
import configMinMax from "../assets/volume-min-max.json";

import haline from "../assets/colormaps/haline.png";
import thermal from "../assets/colormaps/thermal.png";

const SelectorContext = createContext();

// Custom component to provide the Selector context
function SelectorProvider(props) {
  const [state, dispatch] = useReducer(volumeReducer, {
    configMinMax: configMinMax,
    allColorMaps: {
      Haline: haline,
      Thermal: thermal,
    },
    buttons: {
      season: config.season,
      tide: config.tide,
      measurement: config.measurement,
    },
    selection: {
      season: config.season[0],
      tide: config.tide[0],
      measurement: config.measurement[0],
    },
    colorMap: haline,

    model: {
      position: config.volumePosition,
      rotation: config.volumeRotation,
      scale: config.volumeScale,
      slices: config.slices,
      spacing: {
        x: config.x_spacing,
        y: config.y_spacing,
        z: config.z_spacing,
      },
    },
  });

  const value = { state, dispatch };
  return (
    <SelectorContext.Provider value={value}>
      {props.children}
    </SelectorContext.Provider>
  );
}

// Custom hook to get the current SelectorContext
function useSelectorContext() {
  const context = useContext(SelectorContext);
  if (context === undefined) {
    throw new Error("useSelector must be used within a SelectorProvider");
  }
  return context;
}

// Custom reducer to update the SelectorContext
function volumeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_MEASUREMENT": {
      return {
        ...state,
        selection: {
          ...state.selection,
          measurement: action.payload,
        },
        colorMap: action.colorMap,
      };
    }
    case "TOGGLE_SEASON": {
      return {
        ...state,
        selection: {
          ...state.selection,
          season: action.payload,
        },
      };
    }
    case "TOGGLE_TIDE": {
      return {
        ...state,
        selection: {
          ...state.selection,
          tide: action.payload,
        },
      };
    }
    case "CHANGE_COLOR_MAP": {
      return {
        ...state,
        colorMap: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Custom component to get the current SelectorContext (class based components)
function SelectorConsumer(props) {
  return (
    <SelectorContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error(
            "SelectorConsumer must be used within a SelectorProvider"
          );
        }
        return props.children(context);
      }}
    </SelectorContext.Consumer>
  );
}

export { useSelectorContext, SelectorProvider, SelectorConsumer };
