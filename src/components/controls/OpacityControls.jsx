import { useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import { useControlsContext } from "../../context/controls-context";

// GLOBALS
const canvasHeight = 70
const canvasWidth = 250
let startingNodes = [];

export default function OpacityControls(props) {
  const {
    state: {colorMap},
    dispatch,
  } = useControlsContext();
  console.log(startingNodes)

  // Get the canvas
  const canvasRef = useRef(null)
  // React Hooks
  const [nodes, setNodes] = useState(startingNodes)

  function updateCanvas() {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
  }

  function resetCanvas() {
    setNodes(startingNodes)
    updateCanvas();
  }

  useEffect(() => {
    // Initialize nodes
    const canvas = canvasRef.current;
    startingNodes = [
      { x: 0, y: 0 },
      { x: canvas.width * 0.11, y: canvas.height / 4 },
      { x: canvas.width * 0.32, y: canvas.height / 2 },
      { x: canvas.width * 0.92, y: canvas.height },
    ]

    // Add event listeners

    updateCanvas();

    // Called on component unmount
    return () => {
    }
  }, [])

  return (
    <div>
      <canvas 
        ref={canvasRef}
        id="opacityControls"
        className="fullWidth"
      >
        Canvas for building a custom transfer function
      </canvas>
      <img
        src={colorMap.src}
        alt="Selected color map"
        height="15"
        width="250px"
        className="border border-dark"
      />
      <p>
        Double-click to add a point to the transfer function. Drag points to
        change the function.
      </p>
      <Button onClick={resetCanvas}> Reset </Button>
    </div>
  )
}