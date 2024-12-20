import {ILineStyle} from "./ILineStyle"
import {IStyleEnumerator} from "./IStyleEnumerator"
import {RGBAColor} from "./CommonTypes"

export class CompositeLineStyle implements ILineStyle {
    private enumerator: IStyleEnumerator<'line', ILineStyle>

    constructor(enumerator: IStyleEnumerator<'line', ILineStyle>) {
        this.enumerator = enumerator
    }

    getLineWidth(): number | null {
        let result: number | null = null
        let isFirstStyle = true

        const callback = (style: ILineStyle): void => {
            const lineWidth = style.getLineWidth()
            if (isFirstStyle) {
                result = lineWidth
                isFirstStyle = false
            } else if (lineWidth !== result) {
                result = null
            }
        }

        this.enumerator.enumerateAll({
            type: 'line',
            callback
        })
        return result
    }

    setLineWidth(width: number): void {
        const callback = (style: ILineStyle): void => {
            style.setLineWidth(width)
        }

        this.enumerator.enumerateAll({
            type: 'line',
            callback
        })
    }

    getColor(): RGBAColor | null {
        let result: RGBAColor | null = null
        let isFirstStyle = true

        const callback = (style: ILineStyle): void => {
            const color = style.getColor()
            if (isFirstStyle) {
                result = color
                isFirstStyle = false
            } else if (color !== result) {
                result = null
            }
        }

        this.enumerator.enumerateAll({
            type: 'line',
            callback
        })
        return result
    }

    setColor(color: RGBAColor | null): void {
        const callback = (style: ILineStyle): void => {
            if (color === null) {
                return
            }
            style.setColor(color)
        }

        this.enumerator.enumerateAll({
            type: 'line',
            callback
        })
    }
}