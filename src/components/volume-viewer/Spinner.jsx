import React from "react";
import { Spinner } from "react-bootstrap";

export default function MySpinner(props) {
  return (
    // <div className="sweet-loading row justify-content-md-center">
    //   <div className="col-md-auto my-4">
        <Spinner animation="border" variant="primary" className="mx-auto">
          <span className="sr-only">Loading Volume</span>
        </Spinner>
      /* </div>
    </div> */
  );
}
