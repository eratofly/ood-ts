import {ICanvas} from "./ICanvas"

export interface IDrawable {
    draw(canvas: ICanvas): void
}