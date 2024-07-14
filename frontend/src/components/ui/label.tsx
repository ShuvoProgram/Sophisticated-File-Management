"use client"

import * as React from "react";
import { styled } from '@mui/system';
import FormControlLabel from '@mui/material/FormControlLabel';
import { cva, type VariantProps } from "class-variance-authority";
import clsx from 'clsx';

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const StyledLabel = styled(FormControlLabel)<{
  className?: string;
}>(({ theme }: { theme: any }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: theme.typography.pxToRem(20),
  '&.peer-disabled': {
    cursor: 'not-allowed',
    opacity: 0.7,
  },
}));

export const Label = React.forwardRef<
  React.ElementRef<typeof FormControlLabel>,
  React.ComponentPropsWithoutRef<typeof FormControlLabel> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <StyledLabel
    ref={ref}
    className={clsx(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = 'Label';