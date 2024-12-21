import {ConstDocumentItem} from "./ConstDocumentItem"
import {IImage} from "./IImage"
import {IParagraph} from "./IParagraph"

export class DocumentItem extends ConstDocumentItem {
    constructor(image: IImage)
    constructor(paragraph: IParagraph)
    constructor(arg: IImage | IParagraph) {
        super(arg)
    }

    getImage(): IImage | null {
        return this.image
    }

    getParagraph(): IParagraph | null {
        return this.paragraph
    }
}
