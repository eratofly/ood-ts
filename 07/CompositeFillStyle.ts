import {IStyleEnumerator} from "./IStyleEnumerator"
import {IFillStyle} from "./IFillStyle"
import {RGBAColor} from "./CommonTypes"

export class CompositeFillStyle implements IFillStyle {
    private enumerator: IStyleEnumerator<'fill', IFillStyle>

    constructor(enumerator: IStyleEnumerator<'fill', IFillStyle>) {
        this.enumerator = enumerator
    }

    getColor(): RGBAColor | null {
        let result: RGBAColor | null = null
        let isFirstStyle = true

        const callback = (style: IFillStyle): void => {
            if (isFirstStyle) {
                result = style.getColor()
                isFirstStyle = false
            } else if (style.getColor() !== result) {
                result = null
            }
        }

        this.enumerator.enumerateAll({
            type: 'fill',
            callback,
        })
        return result
    }

    setColor(color: RGBAColor | null): void {
        const callback = (style: IFillStyle): void => {
            if (color === null) {
                return
            }
            style.setColor(color)
        }

        this.enumerator.enumerateAll({
            type: 'fill',
            callback,
        })
    }
}
