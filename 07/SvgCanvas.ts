import {ICanvas} from "./ICanvas"
import {RGBAColor} from "./CommonTypes"
import {Point} from "./Point"
import * as fs from 'node:fs'

export class SvgCanvas implements ICanvas {
    private out: string[] = []
    private lineColor: RGBAColor | null = null
    private fillColor: RGBAColor | null = null
    private lineWidth: number = 1

    constructor(width: number, height: number) {
        this.out.push(`<svg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg'>`)
    }

    private close(): void {
        this.out.push(`</svg>`)
    }

    drawLine(from: Point, to: Point): void {
        this.out.push(
            `<line x1='${from.x}' y1='${from.y}' x2='${to.x}' y2='${to.y}' ` +
            `fill='${this.fillColor}' ` +
            `stroke='${this.lineColor}' ` +
            `stroke-width='${this.lineWidth}' />`
        )
    }

    drawEllipse(left: number, top: number, width: number, height: number): void {
        const rx = width / 2
        const ry = height / 2
        const cx = left + rx
        const cy = top + ry

        this.out.push(
            `<ellipse cx='${cx}' cy='${cy}' rx='${rx}' ry='${ry}' ` +
            `fill-opacity='0' ` +
            `stroke='${this.lineColor}' ` +
            `stroke-width='${this.lineWidth}' />`
        )
    }

    fillEllipse(left: number, top: number, width: number, height: number): void {
        const rx = width / 2
        const ry = height / 2
        const cx = left + rx
        const cy = top + ry

        this.out.push(
            `<ellipse cx='${cx}' cy='${cy}' rx='${rx}' ry='${ry}' ` +
            `fill='${this.fillColor}' ` +
            `stroke-opacity='0' />`
        )
    }

    fillPolygon(points: Point[]): void {
        const pointsAttr = points.map(point => `${point.x},${point.y}`).join(' ')
        this.out.push(
            `<polyline points='${pointsAttr}' fill='${this.fillColor}' stroke='none' />`
        )
    }

    setLineColor(color: RGBAColor | null): void {
        this.lineColor = color
    }

    setFillColor(color: RGBAColor | null): void {
        this.fillColor = color
    }

    setLineWidth(width: number | null): void {
        this.lineWidth = width ?? 1
    }

    print(path: string) {
        this.close()
        fs.writeFileSync(path, this.out.join('\n'))
    }
}