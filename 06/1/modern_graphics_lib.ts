// Класс для современного рисования графики
import {Point} from "./shape_drawing_lib"

export class ModernGraphicsRenderer {
    private drawing: boolean = false
    
    // Этот метод должен быть вызван в начале рисования
    beginDraw(): void {
        if (this.drawing) {
            throw new Error('Drawing has already begun')
        }
        console.log('<draw>')
        this.drawing = true
    }

    // Выполняет рисование линии
    drawLine(start: Point, end: Point): void {
        if (!this.drawing) {
            throw new Error('DrawLine is allowed between beginDraw()/endDraw() only')
        }
        console.log(`<line fromX=${start.x} fromY=${start.y} toX=${end.x} toY=${end.y}/>`)
    }

    // Этот метод должен быть вызван в конце рисования
    endDraw(): void {
        if (!this.drawing) {
            throw new Error('Drawing has not been started')
        }
        console.log('</draw>')
        this.drawing = false
    }
}

// Пример использования:
// const renderer = new ModernGraphicsRenderer()
//
// try {
//     renderer.beginDraw()
//     const startPoint = new Point(0, 0)
//     const endPoint = new Point(10, 10)
//     renderer.drawLine(startPoint, endPoint)
//     renderer.endDraw()
// } catch (error) {
//     console.error(error)
// }
//
// console.log('\n')
