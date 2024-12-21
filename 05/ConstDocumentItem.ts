import {IImage} from "./IImage"
import {IParagraph} from "./IParagraph"

export class ConstDocumentItem {
    protected image: IImage | null = null
    protected paragraph: IParagraph | null = null

    constructor(arg: IImage | IParagraph) {
        if (this.isImage(arg)) {
            this.image = arg
        } else {
            this.paragraph = arg
        }
    }

    getImage(): IImage | null {
        return this.image
    }

    getParagraph(): IParagraph | null {
        return this.paragraph
    }

    private isImage(arg: IImage | IParagraph): arg is IImage {
        return arg.getType() === "image"
    }
}