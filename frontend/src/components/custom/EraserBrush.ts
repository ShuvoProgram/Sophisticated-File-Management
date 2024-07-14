import { fabric } from "fabric";

class EraserBrush extends fabric.BaseBrush {
  canvas: fabric.Canvas;
  points: fabric.Point[];
  width: number;
  strokeMiterLimit: number | undefined;

  constructor(canvas: fabric.Canvas) {
    super();
    this.canvas = canvas;
    this.points = [];
    this.width = 10;
  }

  onMouseDown(pointer: fabric.Point) {
    this.points = [pointer];
    const ctx = this.canvas.getContext();
    ctx.beginPath();
    ctx.moveTo(pointer.x, pointer.y);
    ctx.strokeStyle = "rgba(0,0,0,0)";
  }

  onMouseMove(pointer: fabric.Point) {
    this.points.push(pointer);
    const ctx = this.canvas.getContext();
    this._drawSegment(ctx, this.points[this.points.length - 2], pointer);
  }

  onMouseUp() {
    this._finalizeAndAddPath();
  }

  _drawSegment(
    ctx: CanvasRenderingContext2D,
    p1: fabric.Point,
    p2: fabric.Point
  ) {
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineWidth = this.width;
    ctx.stroke();
    ctx.restore();
  }

  _render(ctx: CanvasRenderingContext2D) {
    const len = this.points.length;
    let p1 = this.points[0];
    let p2 = this.points[1];

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);

    for (let i = 1; i < len; i++) {
      p1 = this.points[i];
      p2 = this.points[i + 1];
      ctx.lineTo(p1.x, p1.y);
    }

    ctx.lineTo(p1.x, p1.y);
    ctx.lineWidth = this.width;
    ctx.stroke();
    ctx.restore();
  }

  _finalizeAndAddPath() {
    const ctx = this.canvas.getContext();
    ctx.closePath();

    const pathData = this.convertPointsToSVGPath(this.points).join("");

    if (pathData === "M 0 0 Q 0 0 0 0 L 0 0") {
      this.canvas.requestRenderAll();
      return;
    }

    const path = this.createPath(pathData);
    path.globalCompositeOperation = "destination-out";

    this.canvas.add(path);

    this.canvas
      .getContext()
      .clearRect(0, 0, this.canvas.width || 0, this.canvas.height || 0);

    this.canvas.requestRenderAll();
    this.points = [];
    this.canvas.fire("path:created", { path: path });
  }

  createPath(pathData: string) {
    const path = new fabric.Path(pathData, {
      fill: undefined,
      stroke: this.color,
      strokeWidth: this.width,
      strokeDashArray: this.strokeDashArray,
      strokeLineCap: this.strokeLineCap,
      strokeLineJoin: this.strokeLineJoin,
      strokeMiterLimit: this.strokeMiterLimit,
      originX: "center",
      originY: "center",
    });
    return path;
  }

  convertPointsToSVGPath(points: fabric.Point[]): string[] {
    if (points.length === 0) return [];

    let pathString = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathString += ` L ${points[i].x} ${points[i].y}`;
    }

    return [pathString];
  }
}

export { EraserBrush };
