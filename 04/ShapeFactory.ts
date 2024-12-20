import {IShapeFactory} from "./IShapeFactory"
import {Color} from "./Color"
import {Shape} from "./Shape"
import {Ellipse} from "./Ellipse"
import {Rectangle} from "./Rectangle"
import {Triangle} from "./Triangle"
import {RegularPolygon} from "./RegularPolygon"

export class ShapeFactory implements IShapeFactory {
    CreateShape(description: string): Shape {
        const descriptionStream = description.split(" ")
        const shapeName = descriptionStream[0]
        if (shapeName === "rectangle") {
            return this.GetRectangle(descriptionStream.slice(1))
        } else if (shapeName === "triangle") {
            return this.GetTriangle(descriptionStream.slice(1))
        } else if (shapeName === "ellipse") {
            return this.GetEllipse(descriptionStream.slice(1))
        } else if (shapeName === "regular_polygon") {
            return this.GetRegularPolygon(descriptionStream.slice(1))
        } else {
            throw new Error("Unknown shape name: " + shapeName)
        }
    }

    private GetColor(descriptionStream: string[]): Color | null {
        const color = descriptionStream[0]

        if (!color) {
            return null
        }

        switch (color) {
            case "black":
                return Color.Black
            case "blue":
                return Color.Blue
            case "green":
                return Color.Green
            case "pink":
                return Color.Pink
            case "red":
                return Color.Red
            case "yellow":
                return Color.Yellow
            default:
                throw new Error("Unknown color: " + color)
        }
    }

    private GetRectangle(descriptionStream: string[]): Rectangle {
        const x = parseFloat(descriptionStream[0])
        const y = parseFloat(descriptionStream[1])
        const w = parseFloat(descriptionStream[2])
        const h = parseFloat(descriptionStream[3])

        const color = this.GetColor(descriptionStream.slice(4))
        if (color) {
            return new Rectangle(x, y, w, h, color)
        } else {
            return new Rectangle(x, y, w, h)
        }
    }

    private GetTriangle(descriptionStream: string[]): Triangle {
        const x1 = parseFloat(descriptionStream[0])
        const y1 = parseFloat(descriptionStream[1])
        const x2 = parseFloat(descriptionStream[2])
        const y2 = parseFloat(descriptionStream[3])
        const x3 = parseFloat(descriptionStream[4])
        const y3 = parseFloat(descriptionStream[5])

        const color = this.GetColor(descriptionStream.slice(6))
        if (color) {
            return new Triangle(x1, y1, x2, y2, x3, y3, color)
        } else {
            return new Triangle(x1, y1, x2, y2, x3, y3)
        }
    }

    private GetEllipse(descriptionStream: string[]): Ellipse {
        const x = parseFloat(descriptionStream[0])
        const y = parseFloat(descriptionStream[1])
        const rx = parseFloat(descriptionStream[2])
        const ry = parseFloat(descriptionStream[3])

        const color = this.GetColor(descriptionStream.slice(4))
        if (color) {
            return new Ellipse(x, y, rx, ry, color)
        } else {
            return new Ellipse(x, y, rx, ry)
        }
    }

    private GetRegularPolygon(descriptionStream: string[]): RegularPolygon {
        const x = parseFloat(descriptionStream[0])
        const y = parseFloat(descriptionStream[1])
        const r = parseFloat(descriptionStream[2])
        const n = parseFloat(descriptionStream[3])

        const color = this.GetColor(descriptionStream.slice(4))
        if (color) {
            return new RegularPolygon(x, y, r, n, color)
        } else {
            return new RegularPolygon(x, y, r, n)
        }
    }
}