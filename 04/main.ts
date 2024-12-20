import {ShapeFactory} from "./ShapeFactory"
import {Designer} from "./Designer"
import {Canvas} from "./Canvas"
import {Painter} from "./Painter"
import * as fs from "node:fs"

async function main() {
    const factory = new ShapeFactory()
    const designer = new Designer(factory)

    const draft = await designer.CreateDraft()

    const canvas = new Canvas()
    const painter = new Painter()
    painter.DrawPicture(draft, canvas)

    canvas.Print("C:/study/ood ts/04/shapes.svg")
}

main().catch(err => console.error(err))