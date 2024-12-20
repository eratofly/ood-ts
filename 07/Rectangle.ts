import {Point} from "./Point"
import {RectD} from "./CommonTypes"
import {ICanvas} from "./ICanvas"
import {SimpleShape} from "./SimpleShape"
import {IGroupShape} from "./IGroupShape"

export class Rectangle extends SimpleShape {
    private leftTop: Point
    private rightBottom: Point

    constructor(x1: number, y1: number, x2: number, y2: number) {
        super()
        this.leftTop = { x: x1, y: y1 }
        this.rightBottom = { x: x2, y: y2 }
    }

    getFrame(): RectD {
        return {
            left: this.leftTop.x,
            top: this.leftTop.y,
            width: this.rightBottom.x - this.leftTop.x,
            height: this.rightBottom.y - this.leftTop.y,
        }
    }

    setFrame(rect: RectD): void {
        this.leftTop.x = rect.left
        this.leftTop.y = rect.top
        this.rightBottom.x = rect.left + rect.width
        this.rightBottom.y = rect.top + rect.height
    }

    draw(canvas: ICanvas): void {
        super.draw(canvas)
        canvas.drawLine(this.leftTop, { x: this.rightBottom.x, y: this.leftTop.y })
        canvas.drawLine(this.leftTop, { x: this.leftTop.x, y: this.rightBottom.y })
        canvas.drawLine(this.rightBottom, { x: this.leftTop.x, y: this.rightBottom.y })
        canvas.drawLine(this.rightBottom, { x: this.rightBottom.x, y: this.leftTop.y })

        canvas.fillPolygon([
            this.leftTop,
            { x: this.rightBottom.x, y: this.leftTop.y },
            this.rightBottom,
            { x: this.leftTop.x, y: this.rightBottom.y },
        ])
    }
}
