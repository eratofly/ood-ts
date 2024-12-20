import {Color} from './Color'
import {ICanvas} from './ICanvas'
import * as fs from 'node:fs'

export class Canvas implements ICanvas{
    private color: Color
    private outputStr: string

    constructor() {
        this.color = Color.Black
        this.outputStr = ''
    }

    SetColor(color: Color): void {
        this.color = color
    }

    DrawLine(x1: number, y1: number, x2: number, y2: number): void {
        this.outputStr += '\t'
        this.outputStr += `<line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}' stroke='${this.colorToStr(this.color)}' />`
        this.outputStr += '\n'
    }

    DrawEllipse(cx: number, cy: number, rx: number, ry: number): void {
        this.outputStr += '\t'
        this.outputStr += `<ellipse cx='${cx}' cy='${cy}' rx='${rx}' ry='${ry}' stroke='${this.colorToStr(this.color)}' />`
        this.outputStr += '\n'
    }

    Print(path: string): void {
        const content = `<svg width='400' height='400' viewBox='0 0 400 400' fill='none' xmlns='http://www.w3.org/2000/svg'>` 
            + '\n' + this.outputStr + '</svg>\n'
        try {
            fs.writeFileSync(path, content)
        } catch (err) {
            //здесь не должны перехватывать ошибку
            console.error(err)
        }
    }

    private colorToStr(color: Color): string {
        if (color === Color.Black) {
            return 'black'
        }
        else if (color === Color.Blue) {
            return 'blue'
        }
        else if (color === Color.Green) {
            return 'green'
        }
        else if (color === Color.Pink) {
            return 'pink'
        }
        else if (color === Color.Red) {
            return 'red'
        }
        else if (color === Color.Yellow) {
            return 'yellow'
        }
        else {
            return 'black'
        }
    }
}