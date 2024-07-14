/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useEditor } from "@/hooks/use-editor";
import { ActiveTool, selectionDependentTools } from "@/lib/types";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar/sidebar";
import { ShapeSidebar } from "../Sidebar/shape-sidebar";
import { FillColorSidebar } from "../color/fill-color-sidebar";
import { StrokeColorSidebar } from "../stroke-color-sidebar";
import { StrokeWidthSidebar } from "../stroke-width-sidebar";
import { OpacitySidebar } from "../opacity-sidebar";
import { TextSidebar } from "../text-sidebar";
import { FontSidebar } from "../font-sidebar";
import { Toolbar } from "../toolbar";
import { Footer } from "../footer";
import DrawSidebar from "../Sidebar/draw-sidebar";
import SidebarUpload from "../Sidebar/sidebar-upload";
import { SettingsSidebar } from "../Sidebar/settings-sidebar";


const Editor = () => {
   const [activeTool, setActiveTool] = useState<ActiveTool>("select");

   const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

   const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection,
  });

   const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === "draw") {
        editor?.enableDrawingMode();
      } else if (tool === "eraser") {
        editor?.enableEraserMode();
      } else {
        editor?.disableDrawingMode();
        editor?.disableEraserMode();
      }

      if (tool === activeTool) {
        return setActiveTool("select");
      }

      setActiveTool(tool);
    },
    [activeTool, editor]
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current!, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });
  
    return () => {
      canvas.dispose();
    };
  }, [init]);


  return (
    <div className="h-full flex flex-col">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} editor={editor} />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <ShapeSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <FillColorSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <StrokeColorSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <SidebarUpload editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool}/>
        <StrokeWidthSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <OpacitySidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <TextSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        {activeTool === "draw" && (
          <DrawSidebar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
          />
        )}
        {activeTool === "eraser" && (
          <DrawSidebar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
          />
        )}
        <FontSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
         <SettingsSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            key={JSON.stringify(editor?.canvas?.getActiveObject())}
          />
           <div className="flex-1 h-[calc(100%-124px)] bg-muted" ref={containerRef}>
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Editor;
