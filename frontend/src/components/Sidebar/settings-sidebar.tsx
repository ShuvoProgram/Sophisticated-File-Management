import { useState, useEffect, useMemo } from "react";
import { Button, TextField, Drawer, IconButton, Typography, Box } from "@mui/material";
import { ScrollArea } from "@/components/ui/scroll-area";
import CloseIcon from '@mui/icons-material/Close';
import { ActiveTool, Editor } from "@/lib/types";
import { ColorPicker } from "../color/color-picker";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";

interface SettingsSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const SettingsSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: SettingsSidebarProps) => {
  const workspace = editor?.getWorkSpace(); // Correct method call

  const initialWidth = useMemo(() => `${workspace?.width}` ?? 0, [workspace]);
  const initialHeight = useMemo(() => `${workspace?.height}` ?? 0, [workspace]);
  const initialBackground = useMemo(() => workspace?.fill ?? "#ffffff", [workspace]);

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    setWidth(initialWidth);
    setHeight(initialHeight);
    setBackground(initialBackground);
  }, [initialWidth, initialHeight, initialBackground]);

  const changeWidth = (value: string) => setWidth(value);
  const changeHeight = (value: string) => setHeight(value);
  const changeBackground = (value: string) => {
    setBackground(value);
    editor?.changeBackground(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editor?.changeSize({
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    });
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "settings" ? "visible" : "hidden"
      )}
    >
       <ToolSidebarHeader
        title="Settings"
        description="Change the look of your workspace"
      />
      <ScrollArea>
        <form className="space-y-4 p-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Typography>Height</Typography>
            <TextField
              fullWidth
              placeholder="Height"
              value={height}
              type="number"
              onChange={(e) => changeHeight(e.target.value)}
              variant="outlined"
              size="small"
            />
          </div>
          <div className="space-y-2">
            <Typography>Width</Typography>
            <TextField
              fullWidth
              placeholder="Width"
              value={width}
              type="number"
              onChange={(e) => changeWidth(e.target.value)}
              variant="outlined"
              size="small"
            />
          </div>
          <Button type="submit" fullWidth variant="contained">
            Resize
          </Button>
        </form>
        <div className="p-4">
          <ColorPicker value={background as string} onChange={changeBackground} />
        </div>
      </ScrollArea>
       <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};