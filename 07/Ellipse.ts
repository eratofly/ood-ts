import {Point} from "./Point"
import {RectD} from "./CommonTypes"
import {SimpleShape} from "./SimpleShape"
import {ICanvas} from "./ICanvas"

export class Ellipse extends SimpleShape {
    private center: Point
    private rx: number
    private ry: number

    constructor(cx: number, cy: number, rx: number, ry: number) {
        super()
        this.center = { x: cx, y: cy }
        this.rx = rx
        this.ry = ry
    }

    getFrame(): RectD {
        return {
            left: this.center.x - this.rx,
            top: this.center.y - this.ry,
            width: this.rx * 2,
            height: this.ry * 2,
        }
    }

    setFrame(rect: RectD): void {
        this.center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        }
        this.rx = rect.width / 2
        this.ry = rect.height / 2
    }

    draw(canvas: ICanvas): void {
        super.draw(canvas)
        canvas.fillEllipse(
            this.center.x - this.rx,
            this.center.y - this.ry,
            this.rx * 2,
            this.ry * 2
        )

        canvas.drawEllipse(
            this.center.x - this.rx,
            this.center.y - this.ry,
            this.rx * 2,
            this.ry * 2
        )
    }
}
