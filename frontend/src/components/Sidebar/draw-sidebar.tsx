import React from 'react';
import { Box, Typography, Slider } from '@mui/material';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ActiveTool, Editor, STROKE_COLOR, STROKE_WIDTH } from "@/lib/types";
import { ToolSidebarClose } from './tool-sidebar-close';
import { HexColorPicker } from 'react-colorful';
import { ColorPicker } from '../color/color-picker';

interface DrawSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

function DrawSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: DrawSidebarProps) {
  const colorValue = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onClose = () => {
    editor?.disableDrawingMode()
    onChangeActiveTool("select");
  };

  const onColorChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  const onWidthChange = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      editor?.changeStrokeWidth(value[0]);
    } else {
      editor?.changeStrokeWidth(value);
    }
  };

  return (
    <aside
      className={cn(
        "relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "draw" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Tool"
        description="Adjust your drawing settings"
      />
      <ScrollArea>
        <Box className="p-4">
          <Typography gutterBottom>Brush Width</Typography>
          <Slider
            value={widthValue}
            onChange={onWidthChange}
            aria-labelledby="brush-size-slider"
            valueLabelDisplay="auto"
            min={1}
            max={100}
            className="mb-4"
          />

          <Typography gutterBottom>Color</Typography>
           <ColorPicker value={colorValue} onChange={onColorChange} />
        </Box>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}

export default DrawSidebar;
