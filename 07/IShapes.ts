import {IShape} from "./IShape"

export interface IShapes {
    getShapesCount(): number
    insertShape(shape: IShape, position: number): void
    getShapeAtIndex(index: number): void
    removeShapeAtIndex(index: number): void
}