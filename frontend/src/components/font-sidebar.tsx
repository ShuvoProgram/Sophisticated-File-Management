import React from 'react';
import { cn } from "@/lib/utils";
import { Box, Button, Drawer, Typography, IconButton } from '@mui/material';
import Scrollbar from 'react-perfect-scrollbar';
import { ActiveTool, Editor, fonts } from "../lib/types";
import { ToolSidebarHeader } from './Sidebar/tool-sidebar-header';
import { ToolSidebarClose } from './Sidebar/tool-sidebar-close';

interface FontSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FontSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FontSidebarProps) => {
  const value = editor?.getActiveFontFamily();
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "font" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Font" description="Change the text font" />
      <Scrollbar>
        <Box p={2} borderBottom={1} borderColor="divider">
          {fonts.map((font) => (
            <Button
              key={font}
              variant="outlined"
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                height: 64,
                fontFamily: font,
                fontSize: 16,
                p: 2,
                borderColor: value === font ? 'blue' : 'grey',
                '&:hover': {
                  opacity: 0.7,
                },
              }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </Box>
      </Scrollbar>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};