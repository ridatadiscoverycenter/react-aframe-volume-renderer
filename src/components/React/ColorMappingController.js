import React, { Component } from "react";
import ReactModal from "react-modal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { connect } from "react-redux";
import {
  myChangeColorMapAction,
  mySaveColorMappingState,
} from "../../redux/AppActions";
import { Button, Modal } from "react-bootstrap";

const customStyles = {
  // content: {
  //   top: "50%",
  //   left: "50%",
  //   right: "auto",
  //   bottom: "auto",
  //   marginRight: "-50%",
  //   transform: "translate(-50%, -50%)",
  // },

  // top: "50%",
  // left: "50%",
  // right: "auto",
  // bottom: "auto",
  // marginRight: "-50%",
  // transform: "translate(-50%, -50%)",
};

const data = [
  {
    name: "Viridis",
    image: (
      <img height="15x" width="100px" src="./colormaps/viridis.png" alt="" />
    ),
  },
  {
    name: "Natural",
    image: (
      <img height="15x" width="100px" src="./colormaps/natural.png" alt="" />
    ),
  },
  {
    name: "RGB",
    image: (
      <img height="15x" width="100px" src="./colormaps/colors.png" alt="" />
    ),
  },
  {
    name: "Grayscale",
    image: (
      <img height="15x" width="100px" src="./colormaps/whiteblack.png" alt="" />
    ),
  },
];

export default connect(null, {
  myChangeColorMapAction,
  mySaveColorMappingState,
})(
  class ControlMappingController extends Component {
    constructor(props) {
      super(props);

      this.state = {
        colorMapSelected: "",
        colorMapModal: false,
        currentMapColor: "./colormaps/viridis.png",
      };

      this.showModal = this.showModal.bind(this);
      this.datatable = this.datatable.bind(this);
      this.handleDataTableSelected = this.handleDataTableSelected.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);

      ReactModal.setAppElement("body");
    }

    componentWillUnmount() {
      this.props.mySaveColorMappingState(this.state.currentMapColor);
    }

    showModal = () => {
      this.setState({ colorMapModal: true });
    };

    handleCloseModal() {
      this.props.myChangeColorMapAction(
        this.state.currentMapColor,
      );
      this.setState({ colorMapModal: false });
    }

    datatable() {
      return (
        <DataTable
          style={{ width: "100%" }}
          value={data}
          selection={this.state.colorMapSelected}
          onSelectionChange={this.handleDataTableSelected}
        >
          <Column selectionMode="single" />
          <Column field="image" header="Color" />
          <Column field="name" header="Name" />
        </DataTable>
      );
    }

    handleDataTableSelected = (state) => {
      this.setState({
        colorMapSelected: state.value,
        currentMapColor: state.value.image.props.src,
      });
    };

    render() {
      return (
        <div>
          <Button onClick={this.showModal}>Color Map</Button>
          <img
            className="colorMapImg"
            src={this.state.currentMapColor}
            alt="color map"
            height="15"
            width="100%"
          />

          <Modal 
            centered
            show={this.state.colorMapModal} 
            style={customStyles} 
            onHide={this.handleCloseModal}
          >
            <Modal.Header closeButton className="pl-2"> 
              <Modal.Title> Color Map </Modal.Title> 
            </Modal.Header>
            <Modal.Body>
              {(this.BasicSelectable = this.datatable())}
            </Modal.Body>
          </Modal>
        </div>
      );
    }
  }
);
