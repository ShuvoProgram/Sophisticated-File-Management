import { useEffect, useMemo, useState } from "react";
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActiveTool, Editor } from "@/lib/types";
import { ToolSidebarHeader } from "./Sidebar/tool-sidebar-header";
import { ToolSidebarClose } from "./Sidebar/tool-sidebar-close";
import { cn } from "@/lib/utils";

interface OpacitySidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const OpacitySidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: OpacitySidebarProps) => {
  const initialValue = editor?.getActiveOpacity() ?? 1;

  const selectedObject = useMemo(() => editor?.selectedObjects[0], [editor]);

  const [opacity, setOpacity] = useState(initialValue);

  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.get("opacity") || 1);
    }
  }, [selectedObject, editor]);

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    editor?.changeOpacity(newValue);
    setOpacity(newValue);
  };

  return (
    <aside
    className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "opacity" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Opacity"
        description="Change the opacity of the selected object"
      />
      <ScrollArea>
        <Box p={2} borderBottom={1} borderColor="divider">
          <Slider
            value={opacity}
            onChange={(_, value) => onChange(value as number)}
            max={1}
            min={0}
            step={0.1}
            aria-labelledby="opacity-slider"
          />
        </Box>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};