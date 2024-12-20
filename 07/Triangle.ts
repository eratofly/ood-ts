import {Point} from "./Point"
import {RectD} from "./CommonTypes"
import {SimpleShape} from "./SimpleShape"
import {ICanvas} from "./ICanvas"

export class Triangle extends SimpleShape {
    private point1: Point
    private point2: Point
    private point3: Point

    constructor(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        super()
        this.point1 = { x: x1, y: y1 }
        this.point2 = { x: x2, y: y2 }
        this.point3 = { x: x3, y: y3 }
    }

    getFrame(): RectD {
        const left = Math.min(this.point1.x, this.point2.x, this.point3.x)
        const top = Math.min(this.point1.y, this.point2.y, this.point3.y)
        const right = Math.max(this.point1.x, this.point2.x, this.point3.x)
        const bottom = Math.max(this.point1.y, this.point2.y, this.point3.y)

        return {
            left: left,
            top: top,
            width: right - left,
            height: bottom - top,
        }
    }

    setFrame(rect: RectD): void {
        const currentFrame = this.getFrame()

        const zoomX = rect.width / currentFrame.width
        const zoomY = rect.height / currentFrame.height

        this.point1.x = rect.left + (this.point1.x - currentFrame.left) * zoomX
        this.point2.x = rect.left + (this.point2.x - currentFrame.left) * zoomX
        this.point3.x = rect.left + (this.point3.x - currentFrame.left) * zoomX

        this.point1.y = rect.top + (this.point1.y - currentFrame.top) * zoomY
        this.point2.y = rect.top + (this.point2.y - currentFrame.top) * zoomY
        this.point3.y = rect.top + (this.point3.y - currentFrame.top) * zoomY
    }

    draw(canvas: ICanvas): void {
        super.draw(canvas)
        canvas.fillPolygon([this.point1, this.point2, this.point3])
    }
}
