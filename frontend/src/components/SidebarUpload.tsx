// SidebarUpload.tsx
import React from 'react';
import { Editor } from "@/lib/types";

interface SidebarUploadProps {
  editor: Editor | undefined;
  activeTool: string;
  onChangeActiveTool: (tool: string) => void;
  onUpload: (file: File) => void;
}

const SidebarUpload: React.FC<SidebarUploadProps> = ({ editor, activeTool, onChangeActiveTool, onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default SidebarUpload;
