import {ILineStyle} from "./ILineStyle"
import {RGBAColor} from "./CommonTypes"

export class LineStyle implements ILineStyle {
    private width: number
    private color: RGBAColor
    
    constructor(width: number = 1, color: RGBAColor = '#000000FF') {
        this.width = width
        this.color = color
    }

    getColor(): RGBAColor {
        return this.color
    }

    getLineWidth(): number {
        return this.width
    }

    setColor(color: RGBAColor): void {
        this.color = color
    }

    setLineWidth(lineWidth: number): void {
        this.width = lineWidth
    }

}