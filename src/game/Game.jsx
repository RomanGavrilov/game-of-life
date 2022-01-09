import React, { useState, useRef, useEffect } from "react";
import Board from "./board";
import GameOfLife from "./gameOfLife";
import Controls from "./Controls"
import { toBoard, toCanvas } from "./projections";

export default function Game() {
  const step = 25
  const notSupported = 'canvas not supported'
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const boardRef = useRef(null)
  const gameRef = useRef(null)
  const clientSizeRef = useRef({ x: 0, y: 0 })
  const [isDrawing, setIsDrawing] = useState(false)
  const [isClearing, setIsClearing] = useState(false)

  useEffect(() => {
    const gameConfig = setupCanvas()
    const projector = { toBoard: toBoard(gameConfig.step), toCanvas: toCanvas(gameConfig.step), step: gameConfig.step }
    boardRef.current = new Board({ ctx: contextRef.current, clientSize: clientSizeRef.current, projector })
  }, [])

  const setupCanvas = () => {
    const canvas = canvasRef.current
    var dpr = window.devicePixelRatio || 1
    const box = document.getElementById('game-container')
    const w = Math.floor(box.clientWidth) - 70
    const h = Math.floor(box.clientHeight) - 70
    canvas.width = w
    canvas.height = h
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    clientSizeRef.current = { x: w, y: h }

    const context = canvas.getContext('2d')
    if (!context) {
      alert(notSupported)
      return
    }
    context.scale(dpr, dpr)
    contextRef.current = context

    return {
      step: Math.floor(w / 50)
    }
  }

  const startDrawing = ({ nativeEvent }) => {
    setIsDrawing(true)
    const { x, y } = getMousePos(canvasRef.current, nativeEvent)
    const projector = boardRef.current.getProjector()
    boardRef.current.awake(projector.toBoard(x), projector.toBoard(y))
  }

  const startClearing = ({ nativeEvent }) => {
    setIsClearing(true)
    const { x, y } = getMousePos(canvasRef.current, nativeEvent)
    const projector = boardRef.current.getProjector()
    boardRef.current.clearCell(projector.toBoard(x), projector.toBoard(y))
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { x, y } = getMousePos(canvasRef.current, nativeEvent)
    const projector = boardRef.current.getProjector()
    boardRef.current.awake(projector.toBoard(x), projector.toBoard(y))
  }

  const clear = ({ nativeEvent }) => {
    if (!isClearing) {
      return
    }
    const { x, y } = getMousePos(canvasRef.current, nativeEvent)
    const projector = boardRef.current.getProjector()
    boardRef.current.clearCell(projector.toBoard(x), projector.toBoard(y))
  }

  function getMousePos(canvas, nativeEvent) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: nativeEvent.x - rect.left,
      y: nativeEvent.y - rect.top
    }
  }

  function mouseDown({ nativeEvent }) {
    console.log(nativeEvent)
    switch (nativeEvent.which) {
      case 1: startDrawing({ nativeEvent }); break;
      case 2: break;
      case 3: startClearing({ nativeEvent }); break;
      default: break;
    }
  }

  function touchStart({ nativeEvent }) {

  }

  function mouseMove({ nativeEvent }) {
    switch (nativeEvent.which) {
      case 1: draw({ nativeEvent }); break;
      case 2: break;
      case 3: clear({ nativeEvent }); break;
      default: break;
    }
  }

  function touchMove({ nativeEvent }) {

  }

  function touchEnd({ nativeEvent }) {
    
  }

  function mouseUp() {
    setIsDrawing(false)
    setIsClearing(false)
  }

  function onStart() {
    gameRef.current = new GameOfLife({
      board: boardRef.current
    }).run()
  }

  function onStop() {
    if (!gameRef.current) return
    gameRef.current.stop()
  }

  return (
    <React.Fragment>
      <canvas
        style={{ cursor: 'crosshair', border: '1px solid #87a8cd54' }}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
        onTouchStart={mouseDown}
        onTouchMove={mouseMove}
        onTouchEnd={mouseUp}
        ref={canvasRef}
      />

      <Controls
        start={onStart}
        stop={onStop}
      />
    </React.Fragment>
  );
}

