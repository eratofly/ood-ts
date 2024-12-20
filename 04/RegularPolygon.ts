import {Color} from "./Color"
import {ICanvas} from "./ICanvas"
import {Shape} from "./Shape"
import {Point} from "./Point"

const M_PI = Math.PI

export class RegularPolygon extends Shape {
    private x: number
    private y: number
    private r: number
    private n: number

    constructor(x: number, y: number, r: number, n: number, color?: Color) {
        super(color)
        this.x = x
        this.y = y
        this.r = Math.abs(r)
        this.n = n

        if (n < 3) {
            throw new Error("n must be greater than 3")
        }
    }

    GetVertexCount(): number {
        return this.n
    }

    GetCenter(): Point {
        return new Point(this.x, this.y)
    }

    GetRadius(): number {
        return this.r
    }

    Draw(canvas: ICanvas): void {
        canvas.SetColor(this.GetColor())
        let x1 = this.x
        let y1 = this.y + this.r

        for (let i = 0 i < this.n ++i) {
            const currAngle = (M_PI * 2 * i) / this.n
            const x2 = this.x + this.r * Math.sin(currAngle)
            const y2 = this.y + this.r * Math.cos(currAngle)
            canvas.DrawLine(x1, y1, x2, y2)
            x1 = x2
            y1 = y2
        }
        canvas.DrawLine(x1, y1, this.x, this.y + this.r)
    }
}
