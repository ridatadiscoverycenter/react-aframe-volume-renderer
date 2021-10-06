import { Dropdown } from "react-bootstrap";

import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { useControlsContext } from "../../context/controls-context";

export default function ColorMapControl(props) {
  const {
    state: { allColorMaps, colorMap },
    dispatch,
  } = useControlsContext();

  return (
    <div className="fullWidth">
      <h4>Color Map</h4>
      <Dropdown>
        <Dropdown.Toggle variant="outline-primary" className="fullWidth">
          <img
            src={colorMap.src}
            alt="Selected color map"
            height="15"
            width="65%"
            className="mr-2"
          />
          {colorMap.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {allColorMaps.map((color) => {
            return (
              <Dropdown.Item
                key={color.name}
                active={colorMap === color}
                onClick={() =>
                  dispatch({
                    type: "CHANGE_COLOR_MAP",
                    payload: color,
                  })
                }
              >
                <img
                  src={color.src}
                  alt={color.name}
                  height="15"
                  width="65%"
                  className="mr-2"
                />
                {color.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
