import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";

import { useControlsContext } from "../../context/controls-context";

// Globals
let canvas, ctx;
const initialDraggingState = {
  dragging: false,
  selectedNodeIdx: null,
  selectedNode: null,
  startPos: null,
};

function overPoint(nodePos, mousePos) {
  const buffer = 15;
  const distance = Math.sqrt(
    Math.pow(mousePos.x - nodePos.x, 2) + Math.pow(mousePos.y - nodePos.y, 2)
  );
  return distance <= buffer;
}

export default function OpacityControls(props) {
  const {
    state: { colorMap, transferFunctionNodes },
    dispatch,
  } = useControlsContext();

  const canvasRef = useRef(null);
  const [draggingState, setDraggingState] = useState(initialDraggingState);

  const resetCanvas = useCallback(() => {
    dispatch({
      type: "CHANGE_TRANSFER_FUNCTION",
      payload: [
        { x: 0, y: canvas.height },
        { x: canvas.width * 0.11, y: canvas.height * 0.5 },
        { x: canvas.width * 0.32, y: canvas.height * 0.2 },
        { x: canvas.width * 0.92, y: 0 },
      ],
    });
  }, [dispatch]);

  // Reset local state
  function handleMouseUp(e) {
    console.log("MOUSE UP", e.screenX, e.screenY); // TEMP
    setDraggingState(initialDraggingState);
  }

  // Select node, if over one
  function handleMouseDown(e) {
    console.log("MOUSE DOWN", e.screenX, e.screenY); // TEMP

    const mousePos = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    transferFunctionNodes.forEach((node, i) => {
      if (overPoint(node, mousePos)) {
        setDraggingState({
          dragging: true,
          selectedNodeIdx: i,
          selectedNode: node,
          startPos: { x: e.screenX, y: e.screenY },
        });
      }
    });
  }

  // Add a node to the transfer function. Sort nodes by x coordinate
  function handleDoubleClick(e) {
    const newNode = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    const arr = transferFunctionNodes.concat(newNode);
    dispatch({
      type: "CHANGE_TRANSFER_FUNCTION",
      payload: arr.sort((a, b) => a.x - b.x),
    });
  }

  // Called on component mount
  useEffect(() => {
    // Initialize canvas
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");

    // Add Event Listeners
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", null);

    // canvas.addEventListener("mousemove", null);
    // canvas.addEventListener("mousedown", handleMouseDown); // onMouseDown
    // canvas.addEventListener("dblclick", null);
    // canvas.addEventListener("contextmenu", null);

    resetCanvas();

    return () => {
      // Remove event listeners
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", null);
    };
  }, [resetCanvas]);

  // Draw canvas - called whenever transferFunctionNodes changes
  useEffect(() => {
    if (transferFunctionNodes.length !== 0) {
      canvas.style.border = "1px solid";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();

      // Draw lines
      ctx.strokeStyle = "rgba(128, 128, 128, 0.8)";
      ctx.lineWidth = 2;
      for (let i = 0; i < transferFunctionNodes.length - 1; i++) {
        const { x, y } = transferFunctionNodes[i];
        const { x: nextX, y: nextY } = transferFunctionNodes[i + 1];
        ctx.moveTo(x, y);
        ctx.lineTo(nextX, nextY);
      }
      ctx.stroke();

      // Draw dots
      ctx.fillStyle = "#FFAA00";
      transferFunctionNodes.forEach((node) => {
        const { x, y } = node;
        ctx.moveTo(x, y);
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
      });
      ctx.fill();
    }
  }, [transferFunctionNodes]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="opacityControls"
        className="fullWidth"
        onMouseDown={handleMouseDown}
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
  );
}
