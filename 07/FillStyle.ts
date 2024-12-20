import {IFillStyle} from "./IFillStyle"
import {RGBAColor} from "./CommonTypes"

export class FillStyle implements IFillStyle {
    private color: RGBAColor
    
    constructor(color: RGBAColor = '#000000FF') {
        this.color = color
    }

    getColor(): RGBAColor {
        return this.color
    }

    setColor(color: RGBAColor): void {
        this.color = color
    }
}