"use client"
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, InputLabel } from '@mui/material';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [color, setColor] = useState<string>('#000000');
  const [brushSize, setBrushSize] = useState<number>(5);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current!);
    setCanvas(fabricCanvas);

    const updateHistory = () => {
      if (!fabricCanvas) return;
      const json = JSON.stringify(fabricCanvas.toJSON());
      setHistory((prevHistory) => {
        if (prevHistory.length === 0 || prevHistory[prevHistory.length - 1] !== json) {
          const newHistory = [...prevHistory, json];
        
          return newHistory;
        }
        return prevHistory;
      });
      setRedoStack([]);
   
    };

    fabricCanvas.on('object:added', updateHistory);
    fabricCanvas.on('object:modified', updateHistory);
    fabricCanvas.on('object:removed', updateHistory);

    return () => {
      fabricCanvas.off('object:added', updateHistory);
      fabricCanvas.off('object:modified', updateHistory);
      fabricCanvas.off('object:removed', updateHistory);
      fabricCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = brushSize;
    }
  }, [color, brushSize, canvas]);

  const handleUndo = () => {
    if (history.length < 2) return;
    const newHistory = [...history];
    const lastState = newHistory.pop();
    setRedoStack((prevRedoStack) => [...prevRedoStack, JSON.stringify(canvas!.toJSON())]);
    setHistory(newHistory);
    canvas!.loadFromJSON(newHistory[newHistory.length - 1], () => canvas!.renderAll());
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const newRedoStack = [...redoStack];
    const redoState = newRedoStack.pop();
    setRedoStack(newRedoStack);
    setHistory((prevHistory) => [...prevHistory, redoState!]);
    canvas!.loadFromJSON(redoState!, () => canvas!.renderAll());
  };

  const handleToolChange = (event: SelectChangeEvent<string>) => {
    const tool = event.target.value as string;
    setSelectedTool(tool);
    if (canvas) {
      if (tool === 'select') {
        canvas.isDrawingMode = false;
      } else if (tool === 'draw') {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color = color;
      } else if (tool === 'erase') {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color = '#FFFFFF'; // Assuming white background for eraser
      }
    }
  };

  const handleColorChange = (event: SelectChangeEvent<string>) => {
    const newColor = event.target.value as string;
    setColor(newColor);
    if (canvas) {
      canvas.freeDrawingBrush.color = newColor;
    }
  };

  const handleBrushSizeChange = (event: SelectChangeEvent<string>) => {
    const size = parseInt(event.target.value);
    setBrushSize(size);
    if (canvas) {
      canvas.freeDrawingBrush.width = size;
    }
  };

  const addRect = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: color,
      width: 60,
      height: 70,
    });
    canvas?.add(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      fill: color,
      radius: 50,
    });
    canvas?.add(circle);
  };

  const addText = () => {
    const text = new fabric.IText('Double-click to edit', {
      left: 100,
      top: 100,
      fill: color,
    });
    canvas?.add(text);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (typeof data === 'string' && canvas) {
        fabric.Image.fromURL(data, (img) => {
          img.set({ left: 100, top: 100 });
          canvas.add(img);
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex space-x-2">
        <FormControl variant="outlined" className="w-32">
          <InputLabel id="tool-select-label">Tool</InputLabel>
          <Select
            labelId="tool-select-label"
            id="tool-select"
            value={selectedTool}
            onChange={handleToolChange}
            label="Tool"
          >
            <MenuItem value="select">Select</MenuItem>
            <MenuItem value="draw">Draw</MenuItem>
            <MenuItem value="erase">Erase</MenuItem>
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="image">Image</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="w-32">
          <InputLabel id="color-select-label">Color</InputLabel>
          <Select
            labelId="color-select-label"
            id="color-select"
            value={color}
            onChange={handleColorChange}
            label="Color"
          >
            <MenuItem value="#000000">Black</MenuItem>
            <MenuItem value="#FF0000">Red</MenuItem>
            <MenuItem value="#00FF00">Green</MenuItem>
            <MenuItem value="#0000FF">Blue</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="w-32">
          <InputLabel id="brush-size-select-label">Brush Size</InputLabel>
          <Select
            labelId="brush-size-select-label"
            id="brush-size-select"
            value={brushSize.toString()}
            onChange={handleBrushSizeChange}
            label="Brush Size"
          >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={addRect}>Add Rectangle</Button>
        <Button variant="contained" color="primary" onClick={addCircle}>Add Circle</Button>
        {selectedTool === 'text' && (
          <Button variant="contained" color="primary" onClick={addText}>Add Text</Button>
        )}
        {selectedTool === 'image' && (
          <Button variant="contained" color="primary" component="label">
            Add Image
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        )}
      </div>
      <canvas ref={canvasRef} width={800} height={600} className="border border-gray-300"></canvas>
      <div className="mt-4 flex space-x-2">
        <Button variant="contained" color="primary" onClick={handleUndo}>Undo</Button>
        <Button variant="contained" color="primary" onClick={handleRedo}>Redo</Button>
      </div>
    </div>
  );
};

export default Canvas;
