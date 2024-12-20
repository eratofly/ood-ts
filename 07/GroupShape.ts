import {IGroupShape} from "./IGroupShape"
import {IStyle} from "./IStyle"
import {RectD} from "./CommonTypes"
import {IShape} from "./IShape"
import {ILineStyle} from "./ILineStyle"
import {IFillStyle} from "./IFillStyle"
import {ICanvas} from "./ICanvas"
import {CompositeLineStyle} from "./CompositeLineStyle"
import {CompositeFillStyle} from "./CompositeFillStyle"
import {IStyleEnumerator} from "./IStyleEnumerator"

export class GroupShape implements IGroupShape, IStyleEnumerator<'line', ILineStyle>, IStyleEnumerator<'fill', IFillStyle> {
    private shapes: IShape[] = []
    private lineStyle: ILineStyle = new CompositeLineStyle(this)
    private fillStyle: IFillStyle = new CompositeFillStyle(this)

    //исправить проблему для пустых групп. 1) для пустых групп возвращать нулевую ссылку 2) запретить создать группу, когда 0 фигур
    getFrame(): RectD {
        if (this.getShapesCount() === 0) {
            return {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            }
        }

        let minX = Number.MAX_VALUE
        let maxX = Number.MIN_VALUE
        let minY = Number.MAX_VALUE
        let maxY = Number.MIN_VALUE

        for (const shape of this.shapes) {
            const shapeFrame = shape.getFrame()
            if (!shapeFrame) {
                continue
            }

            minX = Math.min(minX, shapeFrame.left)
            minY = Math.min(minY, shapeFrame.top)
            maxX = Math.max(maxX, shapeFrame.left + shapeFrame.width)
            maxY = Math.max(maxY, shapeFrame.top + shapeFrame.height)
        }

        return {
            left: minX,
            top: minY,
            width: maxX - minX,
            height: maxY - minY,
        }
    }

    setFrame(newFrame: RectD): void {
        //делать проверку на пустую группу
        if (this.getShapesCount() === 0) {
            throw new Error("Cannot resize an empty group of shapes.")
        }

        const currentFrame = this.getFrame()
        if (!currentFrame) {
            //может проигнорировать
            throw new Error("Current frame is undefined.")
        }

        const zoomX = newFrame.width / currentFrame.width
        const zoomY = newFrame.height / currentFrame.height

        for (const shape of this.shapes) {
            const shapeFrame = shape.getFrame()
            if (!shapeFrame) {
                continue
            }

            shape.setFrame({
                left: newFrame.left + (shapeFrame.left - currentFrame.left) * zoomX,
                top: newFrame.top + (shapeFrame.top - currentFrame.top) * zoomY,
                width: shapeFrame.width * zoomX,
                height: shapeFrame.height * zoomY,
            })
        }
    }

    getOutlineStyle(): ILineStyle {
        return this.lineStyle
    }

    getFillStyle(): IFillStyle {
        return this.fillStyle
    }

    getGroup(): IGroupShape {
        return this
    }

    getShapesCount(): number {
        return this.shapes.length
    }

    getShapeAtIndex(index: number): IShape {
        if (index >= this.getShapesCount()) {
            throw new RangeError("Index out of range.")
        }
        return this.shapes[index]
    }

    insertShape(shape: IShape, position: number): void {
        if (position >= this.getShapesCount()) {
            this.shapes.push(shape)
        } else {
            this.shapes.splice(position, 0, shape)
        }
    }

    removeShapeAtIndex(index: number): void {
        if (index >= this.getShapesCount()) {
            throw new RangeError("Index out of range.")
        }
        this.shapes.splice(index, 1)
    }

    draw(canvas: ICanvas): void {
        for (const shape of this.shapes) {
            shape.draw(canvas)
        }
    }

    enumerateAllFillStyles(callback: (fillStyle: IFillStyle) => void): void {
        for (const shape of this.shapes) {
            callback(shape.getFillStyle())
        }
    }

    enumerateAllOutlineStyles(callback: (lineStyle: ILineStyle) => void): void {
        for (const shape of this.shapes) {
            callback(shape.getOutlineStyle())
        }
    }

    enumerateAll(args: { type: 'line', callback: (style: ILineStyle) => void }): void
    enumerateAll(args: { type: 'fill', callback: (style: IFillStyle) => void }): void
    enumerateAll(args: { type: 'line', callback: (style: ILineStyle) => void } | { type: 'fill', callback: (style: IFillStyle) => void }): void {
        const {
            type,
            callback,
        } = args
        if (type === 'line') {
            for (const shape of this.shapes) {
                callback(shape.getOutlineStyle())
            }
        }
        else if (type === 'fill') {
            for (const shape of this.shapes) {
                callback(shape.getFillStyle())
            }
        }
    }
}
