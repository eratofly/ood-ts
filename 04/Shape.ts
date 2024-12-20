import {Color} from "./Color"
import {ICanvas} from "./ICanvas"

export abstract class Shape {
    private color: Color

    constructor(color: Color) {
        this.color = color
    }

    abstract Draw(canvas: ICanvas): void

    GetColor(): Color {
        return this.color
    }
}