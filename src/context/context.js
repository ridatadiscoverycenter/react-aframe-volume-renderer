import { createContext, useContext, useReducer } from "react";
import config from "../assets/config.json";
import configMinMax from "../assets/volume-min-max.json";

import haline from "../assets/colormaps/haline.png";
import thermal from "../assets/colormaps/thermal.png";

const Context = createContext();

// Custom component to provide the Selector context
function Provider(props) {
  const [state, dispatch] = useReducer(reducer, {
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
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

// Custom hook to get the current Context
function UseContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useContext must be used within a ContextProvider");
  }
  return context;
}

// Custom reducer to update the SelectorContext
function reducer(state, action) {
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
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Custom component to get the current SelectorContext (class based components)
function Consumer(props) {
  return (
    <Context.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error("Consumer must be used within a Provider");
        }
        return props.children(context);
      }}
    </Context.Consumer>
  );
}

export { UseContext, Provider, Consumer };
