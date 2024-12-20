import {RectD} from "./CommonTypes"
import {IStyle} from "./IStyle"
import {IGroupShape} from "./IGroupShape"
import {ILineStyle} from "./ILineStyle"
import {IFillStyle} from "./IFillStyle"
import {IDrawable} from "./IDrawable"

export interface IShape extends IDrawable {
    getFrame(): RectD
    setFrame(rect: RectD): void
    getOutlineStyle(): ILineStyle
    getFillStyle(): IFillStyle
    getGroup(): IGroupShape | null
}