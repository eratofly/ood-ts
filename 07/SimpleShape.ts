import {IShape} from "./IShape"
import {RectD} from "./CommonTypes"
import {IGroupShape} from "./IGroupShape"
import {ILineStyle} from "./ILineStyle"
import {IFillStyle} from "./IFillStyle"
import {LineStyle} from "./LineStyle"
import {FillStyle} from "./FillStyle"
import {ICanvas} from "./ICanvas"

//переименовать класс на SimpleShape от IShape. а группа будет реализовывать IShape. классы фигур наследуются от SimpleShape
export abstract class SimpleShape implements IShape {
    private lineStyle: ILineStyle = new LineStyle()
    private fillStyle: IFillStyle = new FillStyle()

    getFillStyle(): IFillStyle {
        return this.fillStyle
    }

    abstract getFrame(): RectD

    getGroup(): IGroupShape | null {
        return null
    }

    getOutlineStyle(): ILineStyle {
        return this.lineStyle
    }

    abstract setFrame(rect: RectD): void

    draw(canvas: ICanvas): void {
        canvas.setFillColor(this.getFillStyle().getColor())
        canvas.setLineColor(this.getOutlineStyle().getColor())
        canvas.setLineWidth(this.getOutlineStyle().getLineWidth())
    }
}