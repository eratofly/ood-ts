import {ModernGraphicsRenderer} from "./modern_graphics_lib"
import {ICanvas} from "./graphics_lib"
import {Point} from "./shape_drawing_lib"

export class ModernRendererAdapter extends ModernGraphicsRenderer implements ICanvas {
    private startPoint: Point = new Point(0, 0)

    constructor() {
        super()
        this.beginDraw()
    }

    moveTo(x: number, y: number): void {
        this.startPoint = new Point(x, y)
    }

    lineTo(x: number, y: number): void {
        this.drawLine(this.startPoint, {x, y})
        this.startPoint = {x, y}
    }
}