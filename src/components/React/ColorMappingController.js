import React, { Component } from "react";
import ReactModal from "react-modal";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { connect } from "react-redux";
import {
  myChangeColorMapAction,
  mySaveColorMappingState,
} from "../../redux/AppActions";
// import { Button, Dropdown, Modal, SplitButton } from "react-bootstrap";
import { Dropdown, DropdownButton } from "react-bootstrap";

const path = "assets/images/colormaps";
const colorMaps = [
  { name: "Haline", src: `${path}/haline.png` },
  { name: "Thermal", src: `${path}/thermal.png` },
  { name: "Grayscale", src: `${path}/grayscale.png` },
  { name: "Natural", src: `${path}/natural.png` },
  { name: "Plasma", src: `${path}/plasma.png` },
  { name: "RGB", src: `${path}/rgb.png` },
  { name: "Viridis", src: `${path}/viridis.png` },
];

export default connect(null, {
  myChangeColorMapAction,
  mySaveColorMappingState,
})(
  class ControlMappingController extends Component {
    constructor(props) {
      super(props);

      this.state = {
        colorMap: colorMaps[0],
        colorMapModal: false,
      };

      this.showModal = this.showModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.handleClick = this.handleClick.bind(this);

      ReactModal.setAppElement("body");
    }

    componentWillUnmount() {
      this.props.mySaveColorMappingState(this.state.colorMap.src);
    }

    showModal = () => {
      this.setState({ colorMapModal: true });
    };

    handleCloseModal() {
      this.props.myChangeColorMapAction(this.state.colorMap.src);
      this.setState({ colorMapModal: false });
    }

    handleClick(color) {
      this.setState({
        colorMap: color,
      });
    }

    // DONT DELETE - MAY KEEP
    // datatable() {
    //   return (
    //     <DataTable
    //       style={{ width: "350px" }}
    //       value={data}
    //       selection={this.state.colorMapSelected}
    //       onSelectionChange={this.handleDataTableSelected}
    //     >
    //       <Column selectionMode="single" />
    //       <Column field="image" header="Color" />
    //       <Column field="name" header="Name" />
    //     </DataTable>
    //   );
    // }

    render() {
      return (
        <div>
          {/* DONT DELETE - MAY KEEP */}
          {/* <Button onClick={this.showModal}>Color Map</Button> */}
          <DropdownButton title="Color Map">
            {colorMaps.map((color, i) => {
              return (
                <Dropdown.Item
                  key={color.name}
                  as="button"
                  onClick={() => this.handleClick(color)}
                >
                  <div d-flex flex-row>
                    <div> {color.name} </div>
                    <img
                      src={color.src}
                      alt="selected color map"
                      height="15"
                      width="100%"
                    />
                  </div>
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
          <img
            src={this.state.colorMap.src}
            alt="color map"
            height="15"
            width="100%"
          />

          {/* DON'T DELETE - MAY KEEP */}
          {/* <Modal 
            centered
            show={this.state.colorMapModal} 
            onHide={this.handleCloseModal}
          >
            <Modal.Header closeButton className="pl-2"> 
              <Modal.Title> Color Map </Modal.Title> 
            </Modal.Header>
            <Modal.Body>
              {(this.BasicSelectable = this.datatable())}
            </Modal.Body>
          </Modal> */}
        </div>
      );
    }
  }
);
