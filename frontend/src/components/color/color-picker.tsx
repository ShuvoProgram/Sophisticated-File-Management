import { ChromePicker, CirclePicker } from "react-color";
import { rgbaObjectToString } from "./utils";
import { colors } from "@/lib/types";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
        className="!w-full border rounded-lg"
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
        className="!w-full"
      />
    </div>
  );
};