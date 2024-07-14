// components/CustomButton.tsx
import { Button, ButtonProps } from '@mui/material';
import React from 'react';

interface CustomButtonProps extends ButtonProps {
  onClick: () => void;
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, label, ...props }) => {
  return (
    <Button onClick={onClick} {...props}>
      {label}
    </Button>
  );
};

export default CustomButton;