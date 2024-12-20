import {Color} from "./Color"
import {ICanvas} from "./ICanvas"
import {Shape} from "./Shape"
import {Point} from "./Point"

export class Ellipse extends Shape {
    private x: number
    private y: number
    private rx: number
    private ry: number
    
    constructor(x: number, y: number, rx: number, ry: number, color: Color) {
        super(color)
        this.x = x
        this.y = y
        this.rx = Math.abs(rx)
        this.ry = Math.abs(ry)
    }

    GetCenter(): Point {
        return { x: this.x, y: this.y }
    }

    Draw(canvas: ICanvas): void {
        canvas.SetColor(this.GetColor())
        canvas.DrawEllipse(this.x, this.y, this.rx, this.ry)
    }

    GetHorizontalRadius(): number {
        return this.rx
    }

    GetVerticalRadius(): number {
        return this.ry
    }
}





