import {ICanvas} from "./graphics_lib"
import {ModernGraphicsRenderer} from "./modern_graphics_lib"
import {Point} from "./shape_drawing_lib"

export class ModernRendererAdapter implements ICanvas {
    private modernRenderer: ModernGraphicsRenderer
    private startPoint: Point = new Point(0, 0)

    //почему бы не вызвать внутри конструтоктора метод beginDraw()?
    constructor(modernRenderer: ModernGraphicsRenderer) {
        //адаптеру объекта не стоит использовать begonDraw, так как он может быть вызван в до этого и буде ошибка. обработка этой ошибки - это костыль.
        modernRenderer.beginDraw()
        this.modernRenderer = modernRenderer
    }

    moveTo(x: number, y: number) {
        this.startPoint = new Point(x, y)
    }

    lineTo(x: number, y: number) {
        this.modernRenderer.drawLine(this.startPoint, {x, y})
        this.startPoint = {x, y}
    }

    endDraw() {
        this.modernRenderer.endDraw()
    }
}