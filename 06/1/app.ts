import {CanvasPainter, Rectangle, Triangle} from "./shape_drawing_lib"
import {Canvas} from "./graphics_lib"
import {ModernGraphicsRenderer} from "./modern_graphics_lib"
import * as readline from 'readline'
import {ModernRendererAdapter} from "./ModernRendererAdapter"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Функция рисования на холсте
function paintPicture(painter: CanvasPainter): void {
    const triangle = new Triangle({x: 30, y: 40}, {x: 30, y: 100}, {x: 60, y: 60})
    const rectangle = new Rectangle({x: 30, y: 40}, {x: 30, y: 100}, {x: 100, y: 100}, {x: 100, y: 40})

    painter.draw(triangle)
    painter.draw(rectangle)
}

// Функция для создания холста и рисования
export function paintPictureOnCanvas(): void {
    const simpleCanvas = new Canvas()
    const painter = new CanvasPainter(simpleCanvas)
    paintPicture(painter)
}

export function paintPictureOnModernGraphicsRenderer(): void {
    let renderer = new ModernGraphicsRenderer()
    let adaptedRenderer = new ModernRendererAdapter(renderer)
    const painter = new CanvasPainter(adaptedRenderer)
    paintPicture(painter)
    adaptedRenderer.endDraw()
}

rl.question('we use new API (y)? ', (answer) => {
    switch (answer.toLowerCase()) {
        case 'y':
        case 'Y':
            paintPictureOnModernGraphicsRenderer()
            break
        default:
            paintPictureOnCanvas()
    }
    rl.close()
})

