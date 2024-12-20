import {Shape} from "./Shape"

//почему интерфейс никот не использует
export interface IShapeFactory {
    CreateShape(description: string): Shape
}
