import {Point} from "./Point"
import {RGBAColor} from "./CommonTypes"

export interface ICanvas {
    drawLine(from: Point, to: Point): void
    fillPolygon(points: Array<Point>): void
    drawEllipse(left: number, top: number, width: number, height: number): void
    fillEllipse(left: number, top: number, width: number, height: number): void
    setLineColor(color: RGBAColor | null): void
    setFillColor(color: RGBAColor | null): void
    setLineWidth(width: number | null): void
}