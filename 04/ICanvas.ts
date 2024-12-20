import {Color} from "./Color"

export interface ICanvas
{
    SetColor(color: Color): void
    DrawLine(x1: number, y1: number, x2: number, y2: number): void
    DrawEllipse(cx: number, cy: number, rx: number, ry: number): void
}