import {IDrawable} from "./IDrawable"
import {IShape} from "./IShape"

export interface ISlide extends IDrawable{
    getWidth(): number
    getHeight(): number
    //не нужно отдавать никакие массивы, можно у слайда вернуть интерфейс IShapes
    getShapes(): IShape[]
}