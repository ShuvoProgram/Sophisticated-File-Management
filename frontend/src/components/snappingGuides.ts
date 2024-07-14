import { fabric } from "fabric";

const gridSize = 10;

export const enableSnapping = (canvas: fabric.Canvas) => {
  canvas.on("object:moving", (options) => {
    const object = options.target;
    if (!object) return;

    // Snap to grid
    object.set({
      left: Math.round((object.left ?? 0) / gridSize) * gridSize,
      top: Math.round((object.top ?? 0) / gridSize) * gridSize,
    });

    // Add alignment guides
    canvas.getObjects().forEach((obj) => {
      if (obj === object) return;

      const objLeft = obj.left ?? 0;
      const objTop = obj.top ?? 0;
      const objectLeft = object.left ?? 0;
      const objectTop = object.top ?? 0;

      if (Math.abs(objLeft - objectLeft) < gridSize) {
        object.set({ left: objLeft });
      }
      if (Math.abs(objTop - objectTop) < gridSize) {
        object.set({ top: objTop });
      }
    });
  });

  canvas.on("object:scaling", (options) => {
    const object = options.target;
    if (!object) return;

    // Snap to grid
    const newWidth =
      Math.round(((object.width ?? 0) * (object.scaleX ?? 1)) / gridSize) *
      gridSize;
    const newHeight =
      Math.round(((object.height ?? 0) * (object.scaleY ?? 1)) / gridSize) *
      gridSize;

    object.set({
      width: newWidth / (object.scaleX ?? 1),
      height: newHeight / (object.scaleY ?? 1),
    });
  });
};

export const disableSnapping = (canvas: fabric.Canvas) => {
  canvas.off("object:moving");
  canvas.off("object:scaling");
};