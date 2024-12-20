import {RGBAColor} from "./CommonTypes"

//добавить возможность включать и выключать обводку
export interface IFillStyle {
    getColor(): RGBAColor | null
    setColor(color: RGBAColor): void
}