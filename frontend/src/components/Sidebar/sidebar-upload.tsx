import { ActiveTool, Editor } from '@/lib/types';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ScrollArea } from '../ui/scroll-area';
import FileUpload from '../FileUpload';
import FileViewer from '../FileViewer';
import { ToolSidebarClose } from './tool-sidebar-close';

interface SidebarUploadProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

function SidebarUpload(
  {
  editor,
  activeTool,
  onChangeActiveTool,
  }: SidebarUploadProps
) {
    const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
    className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "images" ? "visible" : "hidden"
      )}
    >
        <ToolSidebarHeader
        title="upload"
        description="Add shapes to your canvas"
      />
      <ScrollArea>
        <FileUpload />
        <FileViewer editor={editor} />
      </ScrollArea>
       <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}

export default SidebarUpload;