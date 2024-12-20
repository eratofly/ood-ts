import {Shape} from "./Shape"
import {ICanvas} from "./ICanvas"
import {Point} from "./Point"
import {Color} from "./Color"

export class Triangle extends Shape {
    private x1: number
    private y1: number
    private x2: number
    private y2: number
    private x3: number
    private y3: number

    constructor(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color?: Color) {
        super(color)
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.x3 = x3
        this.y3 = y3
    }

    GetVertex1(): Point {
        return new Point(this.x1, this.y1)
    }

    GetVertex2(): Point {
        return new Point(this.x2, this.y2)
    }

    GetVertex3(): Point {
        return new Point(this.x3, this.y3)
    }

    Draw(canvas: ICanvas): void {
        canvas.SetColor(this.GetColor())
        canvas.DrawLine(this.GetVertex1().x, this.GetVertex1().y, this.GetVertex2().x, this.GetVertex2().y)
        canvas.DrawLine(this.GetVertex2().x, this.GetVertex2().y, this.GetVertex3().x, this.GetVertex3().y)
        canvas.DrawLine(this.GetVertex3().x, this.GetVertex3().y, this.GetVertex1().x, this.GetVertex1().y)
    }
}