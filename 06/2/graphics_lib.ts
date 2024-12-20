// Холст для рисования
import {Color} from "../../04/Color"

export interface ICanvas {
// Ставит "перо" в точку x, y
    moveTo(x: number, y: number): void

// Рисует линию с текущей позиции, передвигая перо в точку x,y
    lineTo(x: number, y: number): void
}

// Реализация холста для рисования
export class Canvas implements ICanvas {
    moveTo(x: number, y: number): void {
        console.log(`moveTo (${x}, ${y})`)
    }

    lineTo(x: number, y: number): void {
        console.log(`lineTo (${x}, ${y})`)
    }
}
