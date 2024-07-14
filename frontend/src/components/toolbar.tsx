/* eslint-disable react/jsx-no-undef */
import { cn } from "@/lib/utils";
import { isTextType } from "@/utils/utils";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline, FaEraser } from "react-icons/fa"; // Import FaEraser
import { BsBorderWidth } from "react-icons/bs";
import { Button, Tooltip } from "@mui/material";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Copy,
  SquareSplitHorizontal,
  Trash,
} from "lucide-react";
import { RxTransparencyGrid } from "react-icons/rx";
import {
  ActiveTool,
  Editor,
  FILL_COLOR,
  FONT_SIZE,
  FONT_STYLE,
  FONT_WEIGHT,
} from "../lib/types";
import { useState } from "react";
import { FontSizeInput } from "./font-size-input";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) => {
  const [properties, setProperties] = useState({
    fillColor: editor?.getActiveFillColor(),
    strokeColor: editor?.getActiveStrokeColor(),
    fontFamily: editor?.getActiveFontFamily(),
    fontWeight: editor?.getActiveFontWeight() || FONT_WEIGHT,
    fontStyle: editor?.getActiveFontStyle() || FONT_STYLE,
    linethrough: editor?.getActiveFontLinethrough(),
    underline: editor?.getActiveFontUnderline(),
    textAlign: editor?.getActiveTextAlign(),
    fontSize: editor?.getActiveFontSize() || FONT_SIZE,
  });

  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) {
      return;
    }

    editor?.changeFontSize(value);
    setProperties((current) => ({
      ...current,
      fontSize: value,
    }));
  };

  const onChangeTextAlign = (value: string) => {
    if (!selectedObject) {
      return;
    }

    editor?.changeTextAlign(value);
    setProperties((current) => ({
      ...current,
      textAlign: value,
    }));
  };

  const toggleBold = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = properties.fontWeight > 500 ? 500 : 700;
    editor?.changeFontWeight(newValue);
    setProperties((current) => ({
      ...current,
      fontWeight: newValue,
    }));
  };

  const toggleItalic = () => {
    if (!selectedObject) {
      return;
    }

    const isItalic = properties.fontStyle === "italic";
    const newValue = isItalic ? "normal" : "italic";
    editor?.changeFontStyle(newValue);
    setProperties((current) => ({
      ...current,
      fontStyle: newValue,
    }));
  };

  const toggleLinethrough = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = properties.linethrough ? false : true;
    editor?.changeFontLinethrough(newValue);
    setProperties((current) => ({
      ...current,
      linethrough: newValue,
    }));
  };

  const toggleUnderline = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = properties.underline ? false : true;
    editor?.changeFontUnderline(newValue);
    setProperties((current) => ({
      ...current,
      underline: newValue,
    }));
  };

  if (editor?.selectedObjects.length === 0) {
    return <div className="shrink-0 h-[56px] border-b w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2"></div>;
  }

  return (
    <div className="shrink-0 h-[56px] border-b w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      {!isImage && (
        <div className="flex items-center h-full justify-center">
          <Tooltip title="Fill Color" placement="bottom">
            <Button
              onClick={() => onChangeActiveTool("fill")}
              size="small"
              variant="outlined"
              className={cn(activeTool === "fill" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border"
                style={{ backgroundColor: properties.fillColor }}
              />
            </Button>
          </Tooltip>
        </div>
      )}
      {!isText && (
        <>
          <div className="flex items-center h-full justify-center">
            <Tooltip title="Stroke Color" placement="bottom">
              <Button
                onClick={() => onChangeActiveTool("stroke-color")}
                size="small"
                variant="outlined"
                className={cn(activeTool === "stroke-color" && "bg-gray-100")}
              >
                <div
                  className="rounded-sm size-4 border-2 bg-white"
                  style={{ borderColor: properties.strokeColor }}
                />
              </Button>
            </Tooltip>
          </div>
          <div className="flex items-center h-full justify-center">
            <Tooltip title="Stroke Width" placement="bottom">
              <Button
                onClick={() => onChangeActiveTool("stroke-width")}
                size="small"
                variant="outlined"
                className={cn(activeTool === "stroke-width" && "bg-gray-100")}
              >
                <BsBorderWidth className="size-4" />
              </Button>
            </Tooltip>
          </div>
        </>
      )}

      {isText && (
        <>
          <div className="flex items-center h-full justify-center">
            <Tooltip title="Font Family" placement="bottom">
              <Button
                onClick={() => onChangeActiveTool("font")}
                size="small"
                variant="outlined"
                className={cn(
                  "w-auto px-2 text-sm",
                  activeTool === "font" && "bg-gray-100"
                )}
              >
                <div className="max-w-[100px] truncate">
                  {properties.fontFamily}
                </div>
                <ChevronDown className="size-4 ml-2 shrink-0" />
              </Button>
            </Tooltip>
          </div>
          <div className="flex items-center h-full justify-center">
            <Tooltip title="Bold" placement="bottom">
              <Button
                onClick={toggleBold}
                size="small"
                variant="outlined"
                className={cn(properties.fontWeight > 500 && "bg-gray-100")}
              >
                <FaBold className="size-4" />
              </Button>
            </Tooltip>
          </div>
          <div className="flex items-center h-full justify-center">
            <Tooltip title="Italic" placement="bottom">
              <Button
                onClick={toggleItalic}
                size="small"
                variant="outlined"
                className={cn(
                  properties.fontStyle === "italic" && "bg-gray-100"
                )}
              >
                <FaItalic className="size-4" />
              </Button>
            </Tooltip>
          </div>
          <div className="flex items-center h-full justify-center">
            <Tooltip title="Underline" placement="bottom">
              <Button
                onClick={toggleUnderline}
                size="small"
                variant="outlined"
                className={cn(properties.underline && "bg-gray-100")}
              >
                <FaUnderline className="size-4" />
              </Button>
            </Tooltip>
          </div>
          <div className="flex items-center h-full justify-center">
            <Tooltip title="Strikethrough" placement="bottom">
              <Button
                onClick={toggleLinethrough}
                size="small"
                variant="outlined"
                className={cn(properties.linethrough && "bg-gray-100")}
              >
                <FaStrikethrough className="size-4" />
              </Button>
            </Tooltip>
          </div>
          <div className="flex items-center h-full justify-center">
            <Tooltip title="Align Left" placement="bottom">
              <Button
                onClick={() => onChangeTextAlign("left")}
                size="small"
                variant="outlined"
                className={cn(properties.textAlign === "left" && "bg-gray-100")}
              >
                <AlignLeft className="size-4" />
              </Button>
            </Tooltip>
          </div>
          <div className="flex items-center h-full justify-center">
            <Tooltip title="Align Center" placement="bottom">
              <Button
                onClick={() => onChangeTextAlign("center")}
                size="small"
                variant="outlined"
                className={cn(properties.textAlign === "center" && "bg-gray-100")}
              >
                <AlignCenter className="size-4" />
              </Button>
            </Tooltip>
          </div>
          <div className="flex items-center h-full justify-center">
            <Tooltip title="Align Right" placement="bottom">
              <Button
                onClick={() => onChangeTextAlign("right")}
                size="small"
                variant="outlined"
                className={cn(properties.textAlign === "right" && "bg-gray-100")}
              >
                <AlignRight className="size-4" />
              </Button>
            </Tooltip>
          </div>
          <div className="flex items-center h-full justify-center">
            <Tooltip title="Font Size" placement="bottom">
              <FontSizeInput value={properties.fontSize} onChange={onChangeFontSize} />
            </Tooltip>
          </div>
        </>
      )}

      {isImage && (
        <div className="flex items-center h-full justify-center">
          <Tooltip title="Filter" placement="bottom">
            <Button
              onClick={() => onChangeActiveTool("filters")}
              size="small"
              variant="outlined"
              className={cn(activeTool === "filters" && "bg-gray-100")}
            >
              {/* <TbColorFilter className="size-4" /> */}
            </Button>
          </Tooltip>
        </div>
      )}

      {isImage && (
        <div className="flex items-center h-full justify-center">
          <Tooltip title="Remove Background" placement="bottom">
            <Button
              onClick={() => onChangeActiveTool("remove-bg")}
              size="small"
              variant="outlined"
              className={cn(activeTool === "remove-bg" && "bg-gray-100")}
            >
              <SquareSplitHorizontal className="size-4" />
            </Button>
          </Tooltip>
        </div>
      )}

      <div className="flex items-center h-full justify-center">
        <Tooltip title="Bring Forward" placement="bottom">
          <Button
            onClick={() => editor?.bringForward()}
            size="small"
            variant="outlined"
          >
            <ArrowUp className="size-4" />
          </Button>
        </Tooltip>
      </div>
      <div className="flex items-center h-full justify-center">
        <Tooltip title="Send Backwards" placement="bottom">
          <Button
            onClick={() => editor?.sendBackwards()}
            size="small"
            variant="outlined"
          >
            <ArrowDown className="size-4" />
          </Button>
        </Tooltip>
      </div>
      <div className="flex items-center h-full justify-center">
        <Tooltip title="Opacity" placement="bottom">
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="small"
            variant="outlined"
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Tooltip>
      </div>
      <div className="flex items-center h-full justify-center">
        <Tooltip title="Duplicate" placement="bottom">
          <Button
            onClick={() => {
              editor?.onCopy();
              editor?.onPaste();
            }}
            size="small"
            variant="outlined"
          >
            <Copy className="size-4" />
          </Button>
        </Tooltip>
      </div>
      <div className="flex items-center h-full justify-center">
        <Tooltip title="Delete" placement="bottom">
          <Button
            onClick={() => editor?.delete()}
            size="small"
            variant="outlined"
          >
            <Trash className="size-4" />
          </Button>
        </Tooltip>
      </div>
     <div className="flex items-center h-full justify-center">
        <Tooltip title="Eraser" placement="bottom">
          <Button
            onClick={() => onChangeActiveTool("eraser")}
            size="small"
            variant="outlined"
            className={activeTool === "eraser" ? "bg-gray-100" : ""}
          >
            <FaEraser className="size-4" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};