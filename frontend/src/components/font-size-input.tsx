import React from 'react';
import { Add, Remove } from '@mui/icons-material';
import { Button, TextField, IconButton } from '@mui/material';

interface FontSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const FontSizeInput = ({ value, onChange }: FontSizeInputProps) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onChange(value);
  };

  return (
    <div className="flex items-center">
      <IconButton
        onClick={decrement}
        size="small"
        edge="start"
        sx={{ borderRadius: '0', borderRight: '1px solid rgba(0, 0, 0, 0.23)' }}
      >
        <Remove />
      </IconButton>
      <TextField
        onChange={handleChange}
        value={value}
        size="small"
        variant="outlined"
        inputProps={{ style: { textAlign: 'center', padding: '8px' } }}
        sx={{ width: '50px', '& fieldset': { borderRadius: '0' } }}
      />
      <IconButton
        onClick={increment}
        size="small"
        edge="end"
        sx={{ borderRadius: '0', borderLeft: '1px solid rgba(0, 0, 0, 0.23)' }}
      >
        <Add />
      </IconButton>
    </div>
  );
};
