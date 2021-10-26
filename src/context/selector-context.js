import { createContext, useContext, useReducer } from "react";
import config from "../assets/config.json";
import configMinMax from "../assets/volume-min-max.json";

const SelectorContext = createContext();

// Custom component to provide the Selector context
function SelectorProvider(props) {
  const [state, dispatch] = useReducer(volumeReducer, {
    selection: {
      season: config.season[0],
      tide: config.tide[0],
      measurement: config.measurement[0],
    },
    volumeData: {
      value:
        configMinMax[
          `${config.season[0].value}-${config.tide[0].value}-${config.measurement[0].value}`
        ],
    },
    slices: config.slices,
    x_spacing: config.x_spacing,
    y_spacing: config.y_spacing,
    z_spacing: config.z_spacing,
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

function myFunction(selection) {
  console.log(selection);
}

// Custom reducer to update the SelectorContext
function volumeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_MEASUREMENT": {
      return {
        selection: {
          ...state.selection,
          measurement: action.payload,
        },
        volumeData: {
          value:
            configMinMax[
              `${state.selection.season.value}-${state.selection.tide.value}-${action.payload.value}`
            ],
        },
      };
    }
    case "TOGGLE_SEASON": {
      return {
        selection: {
          ...state.selection,
          season: action.payload,
        },
        volumeData: {
          value:
            configMinMax[
              `${action.payload.value}-${state.selection.tide.value}-${state.selection.measurement.value}`
            ],
        },
      };
    }
    case "TOGGLE_TIDE": {
      return {
        selection: {
          ...state.selection,
          tide: action.payload,
        },
        volumeData: {
          value:
            configMinMax[
              `${state.selection.season.value}-${action.payload.value}-${state.selection.measurement.value}`
            ],
        },
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
