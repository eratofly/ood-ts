import {RGBAColor} from "./CommonTypes"

export interface IStyle {
    IsEnabled(): boolean
    Enable(): void
    getColor(): RGBAColor
    setColor(color: RGBAColor): void
}