import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ActiveTool,
  Editor,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "@/lib/types";
import { ToolSidebarHeader } from './Sidebar/tool-sidebar-header';
import { ToolSidebarClose } from './Sidebar/tool-sidebar-close';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

interface StrokeWidthSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const StrokeWidthSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthSidebarProps) => {
  const widthValue = editor?.getActiveStrokeWidth() ?? STROKE_WIDTH;
  const typeValue = editor?.getActiveStrokeDashArray() ?? STROKE_DASH_ARRAY;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChangeStrokeWidth = (value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    editor?.changeStrokeWidth(newValue);
  };

  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <aside 
     className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "stroke-width" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke Options"
        description="Modify the stroke of your object"
      />
      <ScrollArea>
        <Box p={2} borderBottom={1} borderColor="divider">
          {/* <Label className="text-sm">Stroke width</Label> */}
          <Slider
            value={widthValue}
            onChange={(_, value) => onChangeStrokeWidth(value as number)}
            max={10}
            min={1}
            step={1}
            aria-labelledby="stroke-width-slider"
          />
        </Box>
        <Box p={2} borderBottom={1} borderColor="divider">
          {/* <Label className="text-sm">Stroke type</Label> */}
          <Button
            onClick={() => onChangeStrokeType([])}
            variant="outlined"
            size="large"
            className={typeValue.length === 0 ? "border-2 border-blue-500" : ""}
            style={{ padding: "8px 16px", width: '100%', justifyContent: 'flex-start', textAlign: 'left', height: '64px' }}
          >
            <Box className="w-full border-black rounded-full border-4" />
          </Button>
          <Button
            onClick={() => onChangeStrokeType([5, 5])}
            variant="outlined"
            size="large"
            className={JSON.stringify(typeValue) === JSON.stringify([5, 5]) ? "border-2 border-blue-500" : ""}
            style={{ padding: "8px 16px", width: '100%', justifyContent: 'flex-start', textAlign: 'left', height: '64px' }}
          >
            <Box className="w-full border-black rounded-full border-4 border-dashed" />
          </Button>
        </Box>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export { StrokeWidthSidebar };