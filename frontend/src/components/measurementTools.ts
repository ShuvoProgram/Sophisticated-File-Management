import { fabric } from "fabric";

export const showMeasurements = (canvas: fabric.Canvas) => {
  const measureText = new fabric.Text("", {
    left: 10,
    top: 10,
    fontSize: 16,
    fill: "#000",
    selectable: false,
  });

  canvas.add(measureText);

  const updateMeasurements = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      const boundingRect = activeObject.getBoundingRect();
      const width = boundingRect.width ?? 0;
      const height = boundingRect.height ?? 0;
      const left = activeObject.left ?? 0;
      const top = activeObject.top ?? 0;

      measureText.set({
        text: `W: ${Math.round(width)} H: ${Math.round(height)}`,
        left: left + width / 2,
        top: top + height + 10,
      });
    } else {
      measureText.set({ text: "" });
    }
    canvas.renderAll();
  };

  canvas.on("object:modified", updateMeasurements);
  canvas.on("object:scaling", updateMeasurements);
  canvas.on("object:moving", updateMeasurements);
  canvas.on("selection:cleared", () => measureText.set({ text: "" }));
};

export const hideMeasurements = (canvas: fabric.Canvas) => {
  canvas.off("object:modified");
  canvas.off("object:scaling");
  canvas.off("object:moving");
  canvas.off("selection:cleared");
};