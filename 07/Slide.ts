import {ISlide} from "./ISlide"
import {RGBAColor} from "./CommonTypes"
import {IShape} from "./IShape"
import {ICanvas} from "./ICanvas"
import {Rectangle} from "./Rectangle"

export class Slide implements ISlide {
    private width: number
    private height: number
    private background: RGBAColor
    private shapes: IShape[] = []

    constructor(width: number, height: number, background: RGBAColor = '#FFFFFFFF') {
        this.width = width
        this.height = height
        this.background = background
    }

    getWidth(): number {
        return this.width
    }

    getHeight(): number {
        return this.height
    }

    getBackgroundColor(): RGBAColor {
        return this.background
    }

    setBackgroundColor(color: RGBAColor): void {
        this.background = color
    }

    draw(canvas: ICanvas): void {
        const background = new Rectangle(0, 0, this.width, this.height)
        background.getFillStyle().setColor(this.background)
        background.draw(canvas)

        for (const shape of this.shapes) {
            shape.draw(canvas)
        }
    }

    getShapesCount(): number {
        return this.shapes.length
    }

    getShapeAtIndex(index: number): IShape {
        if (index < 0 || index >= this.shapes.length) {
            throw new Error("Index out of bounds.")
        }
        return this.shapes[index]
    }

    insertShape(shape: IShape, position: number): void {
        if (position < 0 || position > this.shapes.length) {
            this.shapes.push(shape)
        } else {
            this.shapes.splice(position, 0, shape)
        }
    }

    removeShapeAtIndex(index: number): void {
        if (index < 0 || index >= this.shapes.length) {
            throw new Error("Index out of bounds.")
        }
        this.shapes.splice(index, 1)
    }

    getShapes(): IShape[] {
        return this.shapes
    }
}
