import {AbstractCommand} from "./AbstractCommand"

class ResizeItemCommand extends AbstractCommand {
    private imageWidth: { value: number }
    private imageHeight: { value: number }
    private newWidth: number
    private newHeight: number

    constructor(imageWidth: { value: number }, imageHeight: { value: number }, newWidth: number, newHeight: number) {
        super()
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight
        this.newWidth = newWidth
        this.newHeight = newHeight
    }

    protected doExecute(): void {
        [this.imageWidth.value, this.newWidth] = [this.newWidth, this.imageWidth.value]
        [this.imageHeight.value, this.newHeight] = [this.newHeight, this.imageHeight.value]
    }

    protected doRollback(): void {
        [this.imageWidth.value, this.newWidth] = [this.newWidth, this.imageWidth.value]
        [this.imageHeight.value, this.newHeight] = [this.newHeight, this.imageHeight.value]
    }
}
