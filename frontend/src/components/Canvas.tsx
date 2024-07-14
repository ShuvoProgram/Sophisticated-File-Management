import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Button, Box, MenuItem, Select, Grid, Typography, TextField } from '@mui/material';
import io from 'socket.io-client';

const socket = io();

const Canvas = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [text, setText] = useState('');
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  useEffect(() => {
    const canvas = initializeCanvas();

    // Set canvas reference
    canvasRef.current = canvas;

    // Set up event listeners for canvas state synchronization
    setUpCanvasEventListeners(canvas);

    // Set up socket listeners for real-time collaboration
    setUpSocketListeners(canvas);

    return () => {
      // Clean up socket listeners
      socket.off('canvasState');
    };
  }, []);

  const initializeCanvas = (): fabric.Canvas => {
    const canvas = new fabric.Canvas('canvas', {
      height: 500,
      width: 800,
      backgroundColor: '#fff',
    });

    // Enable snapping
    canvas.on('object:moving', (options: any) => {
      const target = options.target;
      target.set({
        left: Math.round(target.left / 10) * 10,
        top: Math.round(target.top / 10) * 10,
      });
    });

    // Update selected object
    canvas.on('selection:created', (options: any) => {
      setSelectedObject(options.target);
    });

    canvas.on('selection:updated', (options: any) => {
      setSelectedObject(options.target);
    });

    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    return canvas;
  };

  const setUpCanvasEventListeners = (canvas: fabric.Canvas) => {
    const saveState = () => {
      const state = canvas.getObjects().map((object) => object.toObject());
      socket.emit('canvasState', state);
    };

    canvas.on('object:added', saveState);
    canvas.on('object:removed', saveState);
    canvas.on('object:modified', saveState);
  };

  const setUpSocketListeners = (canvas: fabric.Canvas) => {
    socket.on('canvasState', (state) => {
      canvas.loadFromJSON({ objects: state }, canvas.renderAll.bind(canvas));
    });
  };

  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 60,
      height: 70,
    });
    canvasRef.current?.add(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 200,
      top: 100,
      fill: 'green',
      radius: 50,
    });
    canvasRef.current?.add(circle);
  };

  const addLine = () => {
    const line = new fabric.Line([50, 100, 200, 200], {
      left: 300,
      top: 100,
      stroke: 'blue',
      strokeWidth: 5,
    });
    canvasRef.current?.add(line);
  };

  const addText = () => {
    const textObject = new fabric.Textbox(text, {
      left: 100,
      top: 100,
      width: 200,
    });
    canvasRef.current?.add(textObject);
  };

  const toggleFreeDrawing = () => {
    const newDrawingMode = !isDrawingMode;
    setIsDrawingMode(newDrawingMode);
    if (canvasRef.current) {
      canvasRef.current.isDrawingMode = newDrawingMode;
    }
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (canvasRef.current) {
      canvasRef.current.freeDrawingBrush.color = event.target.value;
    }
  };

  // const handleLineWidthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   if (canvasRef.current) {
  //     canvasRef.current.freeDrawingBrush.width = parseInt(event.target.value as string, 10) || 1;
  //   }
  // };

  const clearCanvas = () => {
    canvasRef.current?.clear();
    socket.emit('canvasState', []);
  };

  const deleteObject = () => {
    if (selectedObject) {
      canvasRef.current?.remove(selectedObject);
      setSelectedObject(null);
    }
  };

  return (
    <Box>
      <Grid container spacing={2} mb={2}>
        <Grid item>
          <Button variant="contained" onClick={addRectangle}>Add Rectangle</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={addCircle}>Add Circle</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={addLine}>Add Line</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={toggleFreeDrawing}>Free Drawing</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={clearCanvas}>Clear Canvas</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={deleteObject} disabled={!selectedObject}>Delete Selected</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={2}>
        <Grid item>
          <Typography>Color</Typography>
          <input type="color" onChange={handleColorChange} />
        </Grid>
        {/* <Grid item>
          <Typography>Line Width</Typography>
          <Select defaultValue={1} onChange={handleLineWidthChange}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </Grid> */}
        <Grid item>
          <TextField
            label="Text"
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant="contained" onClick={addText}>Add Text</Button>
        </Grid>
      </Grid>
      <canvas id="canvas" />
    </Box>
  );
};

export default Canvas;