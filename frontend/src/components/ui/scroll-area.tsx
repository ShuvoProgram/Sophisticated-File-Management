"use client"

import * as React from "react"
import { styled } from '@mui/system';
import { ScrollArea as RadixScrollArea, ScrollAreaProps as RadixScrollAreaProps, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaCorner } from '@radix-ui/react-scroll-area';
import clsx from 'clsx';

const StyledScrollArea = styled(RadixScrollArea)`
  position: relative;
  overflow: hidden;
`;

const StyledViewport = styled(ScrollAreaViewport)`
  height: 100%;
  width: 100%;
  border-radius: inherit;
`;

const StyledScrollbar = styled(ScrollAreaScrollbar)`
  display: flex;
  touch-action: none;
  user-select: none;
  transition: background-color 160ms ease-out;
  ${({ orientation }) =>
    orientation === 'vertical' &&
    `
    height: 100%;
    width: 2.5rem;
    border-left: 1px solid transparent;
    padding: 1px;
  `}
  ${({ orientation }) =>
    orientation === 'horizontal' &&
    `
    height: 2.5rem;
    flex-direction: column;
    border-top: 1px solid transparent;
    padding: 1px;
  `}
`;

const StyledThumb = styled(ScrollAreaThumb)`
  flex: 1;
  background-color: var(--border);
  border-radius: 9999px;
  position: relative;
`;

const StyledCorner = styled(ScrollAreaCorner)``;

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof RadixScrollArea>,
  RadixScrollAreaProps
>(({ className, children, ...props }, ref) => (
  <StyledScrollArea
    ref={ref}
    className={clsx("relative overflow-hidden", className)}
    {...props}
  >
    <StyledViewport>
      {children}
    </StyledViewport>
    <ScrollBar />
    <StyledCorner />
  </StyledScrollArea>
));
ScrollArea.displayName = RadixScrollArea.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <StyledScrollbar
    ref={ref}
    orientation={orientation}
    className={clsx(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <StyledThumb />
  </StyledScrollbar>
));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };