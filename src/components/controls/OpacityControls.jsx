import { useRef, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";

import { useControlsContext } from "../../context/controls-context";

// Globals
let canvas, ctx;

export default function OpacityControls(props) {
  const {
    state: { colorMap, transferFunctionNodes },
    dispatch,
  } = useControlsContext();
  const canvasRef = useRef(null)

  // drawCanvas gets called every time transferFunctionNodes changes
  const drawCanvas = useEffect(() => {
    console.log("DRAWING CANVAS")
    if(transferFunctionNodes.length !== 0) {
      ctx.beginPath();

      // Draw lines
      ctx.strokeStyle = "rgba(128, 128, 128, 0.8)";
      ctx.lineWidth = 2;
      for(let i = 0; i < transferFunctionNodes.length - 1; i++) {
        const {x, y} = transferFunctionNodes[i]
        const {x: nextX, y: nextY} = transferFunctionNodes[i+1]
        ctx.moveTo(x, y)
        ctx.lineTo(nextX, nextY)
      }
      ctx.stroke()

      // Draw dots
      ctx.fillStyle = "#FFAA00";
      transferFunctionNodes.forEach(node => {
        const {x, y} = node;
        ctx.moveTo(x, y)
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
      })
      ctx.fill()
    } 
  }, [transferFunctionNodes])

  const resetCanvas = useCallback(() => {
    console.log("RESETTING CANVAS")
    dispatch({
      type: "CHANGE_TRANSFER_FUNCTION",
      payload: [
        { x: 0, y: canvas.height },
        { x: canvas.width * 0.11, y: canvas.height * 0.5 },
        { x: canvas.width * 0.32, y: canvas.height * 0.2 },
        { x: canvas.width * 0.92, y: 0 },
      ]
    })
  }, [dispatch])


  useEffect(() => {
    // Add Event listeners

    // Initialize canvas
    canvas = canvasRef.current
    ctx = canvas.getContext('2d')
    canvas.style.border = "1px solid";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    resetCanvas();

    return () => {
      // Called on component unmount
    }
  }, [resetCanvas])

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
        width="100%"
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