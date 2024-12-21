import {ICommandExecutor} from "./ICommandExecutor"
import {IImage} from "./IImage"

export class Image implements IImage{
    private static readonly MIN_WIDTH = 1
    private static readonly MAX_WIDTH = 5000

    private static readonly MIN_HEIGHT = 1
    private static readonly MAX_HEIGHT = 5000

    private static readonly IMAGE_EXTENSIONS: Set<string> = new Set([".jpg", ".png", ".svg", ".gif"])
    private static readonly BASE_FILENAME = "image_"

    private static nextImageId = 1

    private path: string
    private width: number
    private height: number
    private commandExecutor: ICommandExecutor

    constructor(path: string, width: number, height: number, commandExecutor: ICommandExecutor) {
        this.commandExecutor = commandExecutor

        Image.validateDimensions(width, height)
        this.width = width
        this.height = height

        Image.validateImageFormat(path)
        Image.validateFileExists(path)

        const newPath = `${Image.getTempDirectory()}/${Image.getNextFilename()}${Image.getFileExtension(path)}`
        Image.copyFile(path, newPath)

        this.path = newPath
    }

    public getPath(): string {
        return this.path
    }

    public getWidth(): number {
        return this.width
    }

    public getHeight(): number {
        return this.height
    }

    public resize(width: number, height: number): void {
        Image.validateDimensions(width, height)
        const prevWidth = this.width
        const prevHeight = this.height
        this.commandExecutor.addAndExecuteCommand({
            execute: () => {
                this.width = width
                this.height = height
            },
            rollback: () => {
                this.width = prevWidth
                this.height = prevHeight
            },
        })
    }

    private static validateDimensions(width: number, height: number): void {
        if (width < this.MIN_WIDTH || width > this.MAX_WIDTH) {
            throw new Error("Invalid image width")
        }

        if (height < this.MIN_HEIGHT || height > this.MAX_HEIGHT) {
            throw new Error("Invalid image height")
        }
    }

    private static validateImageFormat(path: string): void {
        const extension = this.getFileExtension(path)
        if (!this.IMAGE_EXTENSIONS.has(extension)) {
            throw new Error("Invalid image format")
        }
    }

    private static validateFileExists(path: string): void {
        if (!this.fileExists(path)) {
            throw new Error("Image does not exist")
        }
    }

    private static getNextFilename(): string {
        return `${this.BASE_FILENAME}${this.nextImageId++}`
    }

    private static getTempDirectory(): string {
        return "/tmp" // Replace with actual temp directory logic
        //????????????
    }

    private static getFileExtension(path: string): string {
        return path.slice(path.lastIndexOf("."))
    }

    private static fileExists(path: string): boolean {
        return true
    }

    private static copyFile(src: string, dest: string): void {
        console.log(`Copying file from ${src} to ${dest}`)
    }

    getType(): "image" {
        return "image"
    }
}
