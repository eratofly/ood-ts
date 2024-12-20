import {Color} from "./Color"
import {Shape} from "./Shape"
import {ICanvas} from "./ICanvas"
import {Point} from "./Point"

export class Rectangle extends Shape {
    private leftX: number
    private topY: number
    private width: number
    private height: number
    
    constructor(x: number, y: number, w: number, h: number, color?: Color) {
        // @ts-ignore
        super(color)
        this.leftX = x
        this.topY = y
        this.width = w
        this.height = h
    }

    GetLeftTop(): Point {
        return { x: this.leftX, y: this.topY }
    }

    GetRightBottom(): Point {
        return { x: this.leftX + this.width, y: this.topY + this.height }
    }

    Draw(canvas: ICanvas): void {
        canvas.SetColor(this.GetColor())
        canvas.DrawLine(this.leftX, this.topY, this.leftX + this.width, this.topY)
        canvas.DrawLine(this.leftX, this.topY, this.leftX, this.topY + this.height)
        canvas.DrawLine(this.leftX + this.width, this.topY + this.height, this.leftX + this.width, this.topY)
        canvas.DrawLine(this.leftX + this.width, this.topY + this.height, this.leftX, this.topY + this.height)
    }
}





