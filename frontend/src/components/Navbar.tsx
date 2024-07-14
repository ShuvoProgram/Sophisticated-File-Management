"use client";
import React, { useState } from 'react';
import { CiFileOn } from "react-icons/ci";
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
} from "lucide-react";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BsCloudCheck } from "react-icons/bs";
import { ActiveTool, Editor } from '@/lib/types';
import { Logo } from './logo';
import { useFilePicker } from "use-file-picker";
import { cn } from "@/lib/utils";

interface NavbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Navbar = ({ editor, activeTool, onChangeActiveTool }: NavbarProps) => {
  const [anchorElFile, setAnchorElFile] = useState<null | HTMLElement>(null);
  const [anchorElExport, setAnchorElExport] = useState<null | HTMLElement>(null);

  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadJson(reader.result as string);
        };
      }
    },
  });

  const handleFileMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElFile(event.currentTarget);
  };

  const handleExportMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElExport(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElFile(null);
    setAnchorElExport(null);
  };

  return (
    <Box display="flex" alignItems="center" width="100%" padding={2} height={68} gap={2} borderBottom={1}>
      <Logo />
      <Box display="flex" alignItems="center" gap={1} flex={1}>
        <Button variant="text" onClick={handleFileMenuClick} endIcon={<ChevronDown />}>
          File
        </Button>
        <Menu
          anchorEl={anchorElFile}
          open={Boolean(anchorElFile)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { handleMenuClose(); openFilePicker(); }}>
            <CiFileOn />
            <Box ml={2}>
              <Typography>Open</Typography>
              <Typography variant="caption" color="textSecondary">
                Open a JSON file
              </Typography>
            </Box>
          </MenuItem>
        </Menu>

        <Divider orientation="vertical" flexItem />

        <Tooltip title="Select" placement="bottom" arrow>
          <IconButton
            color={activeTool === "select" ? "primary" : "default"}
            onClick={() => onChangeActiveTool("select")}
          >
            <MousePointerClick />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Undo" placement="bottom" arrow>
          <IconButton
            color="default"
            onClick={() => editor?.onUndo()}
            disabled={!editor?.canUndo()}
          >
            <Undo2 />
          </IconButton>
        </Tooltip>

        <Tooltip title="Redo" placement="bottom" arrow>
          <IconButton
            color="default"
            onClick={() => editor?.onRedo()}
            disabled={!editor?.canRedo()}
          >
            <Redo2 />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        <Box display="flex" alignItems="center" gap={1}>
          <BsCloudCheck />
          <Typography variant="caption" color="textSecondary">Saved</Typography>
        </Box>

        <Box ml="auto" display="flex" alignItems="center" gap={2}>
          <Button variant="text" onClick={handleExportMenuClick} endIcon={<Download />}>
            Export
          </Button>
          <Menu
            anchorEl={anchorElExport}
            open={Boolean(anchorElExport)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { handleMenuClose(); editor?.saveJson(); }}>
              <CiFileOn />
              <Box ml={2}>
                <Typography>JSON</Typography>
                <Typography variant="caption" color="textSecondary">
                  Save for later editing
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); editor?.savePng(); }}>
              <CiFileOn />
              <Box ml={2}>
                <Typography>PNG</Typography>
                <Typography variant="caption" color="textSecondary">
                  Best for sharing on the web
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); editor?.saveJpg(); }}>
              <CiFileOn />
              <Box ml={2}>
                <Typography>JPG</Typography>
                <Typography variant="caption" color="textSecondary">
                  Best for printing
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); editor?.saveSvg(); }}>
              <CiFileOn />
              <Box ml={2}>
                <Typography>SVG</Typography>
                <Typography variant="caption" color="textSecondary">
                  Best for editing vector software
                </Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};