import {RGBAColor} from "./CommonTypes"

export interface ILineStyle {
    getLineWidth(): number | null
    getColor(): RGBAColor | null
    setLineWidth(lineWidth: number): void
    setColor(color: RGBAColor): void
}