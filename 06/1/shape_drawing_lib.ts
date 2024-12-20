import {ICanvas} from "./graphics_lib"

//уметь понятно объяснить преднахначение адаптера
//интерфейс не может ничего агрегировать и композировать

export class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

export interface ICanvasDrawable {
    draw(canvas: ICanvas): void
}

export class Triangle implements ICanvasDrawable {
    private p1: Point
    private p2: Point
    private p3: Point

    constructor(p1: Point, p2: Point, p3: Point) {
        this.p1 = p1
        this.p2 = p2
        this.p3 = p3
    }

    draw(canvas: ICanvas): void {
        canvas.moveTo(this.p1.x, this.p1.y)
        canvas.lineTo(this.p2.x, this.p2.y)
        canvas.lineTo(this.p3.x, this.p3.y)
        canvas.lineTo(this.p1.x, this.p1.y)
    }
}

export class Rectangle implements ICanvasDrawable {
    private p1: Point
    private p2: Point
    private p3: Point
    private p4: Point

    constructor(p1: Point, p2: Point, p3: Point, p4: Point) {
        this.p1 = p1
        this.p2 = p2
        this.p3 = p3
        this.p4 = p4
    }

    draw(canvas: ICanvas): void {
        canvas.moveTo(this.p1.x, this.p1.y)
        canvas.lineTo(this.p2.x, this.p2.y)
        canvas.lineTo(this.p3.x, this.p3.y)
        canvas.lineTo(this.p4.x, this.p4.y)
        canvas.lineTo(this.p1.x, this.p1.y)
    }
}

export class CanvasPainter
{
    private canvas: ICanvas

    constructor(canvas: ICanvas) {
        this.canvas = canvas
    }
    
    draw(drawable: ICanvasDrawable): void {
        drawable.draw(this.canvas)
    }
}