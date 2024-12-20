import {Shape} from "./Shape"

export class PictureDraft {
    private shapes: Shape[] = []

    IsEmpty(): boolean {
        return this.shapes.length === 0
    }

    AddShape(shape: Shape): void {
        this.shapes.push(shape)
    }

    GetShape(index: number): Shape {
        return this.shapes[index]
    }

    GetShapeCount(): number {
        return this.shapes.length
    }
}