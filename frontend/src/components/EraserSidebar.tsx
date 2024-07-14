import React from "react";
import { Editor } from "@/lib/types";

interface EraserSidebarProps {
  editor: Editor | undefined;
  activeTool: string;
  onChangeActiveTool: (tool: string) => void;
}

const EraserSidebar: React.FC<EraserSidebarProps> = ({ editor, activeTool, onChangeActiveTool }) => {
  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(event.target.value, 10);
    if (editor) {
      editor.canvas.freeDrawingBrush.width = width;
    }
  };

  return (
    <div className="sidebar">
      <h2>Eraser Tool</h2>
      <div className="sidebar-section">
        <label htmlFor="eraser-width">Width:</label>
        <input
          type="range"
          id="eraser-width"
          min="1"
          max="100"
          defaultValue="10"
          onChange={handleWidthChange}
        />
      </div>
    </div>
  );
};

export default EraserSidebar;