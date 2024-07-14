import { ButtonBase, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { LucideIcon } from "lucide-react";

interface IButton {
    theme?: any;
    isActive: Boolean
}

const CustomButton = styled(ButtonBase)(({ theme, isActive }: IButton) => ({
  width: "100%",
  height: "100%",
  aspectRatio: "16/9",
  padding: theme.spacing(1),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  borderRadius: 0,
  backgroundColor: isActive ? theme.palette.action.selected : "transparent",
  // color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
}));

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive = false,
  onClick,
}: SidebarItemProps) => {
  return (
    <CustomButton onClick={onClick} isActive={isActive}>
      <Icon style={{ fontSize: 20, strokeWidth: 2, flexShrink: 0 }} />
      <Typography variant="caption" style={{ marginTop: 8 }}>
        {label}
      </Typography>
    </CustomButton>
  );
};
