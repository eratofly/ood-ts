import {IDocument} from "./IDocument"
import {Document} from "./Document"
import {IHistory} from "./IHistory"
import {ISaver} from "./ISaver"
import process from 'node:process'

export class Editor {
    private static trimString(str: string): void {
        str = str.trim()
    }

    private running = true
    private document: IDocument

    constructor(
        private input: NodeJS.ReadableStream,
        private output: NodeJS.WritableStream,
        private history: IHistory,
        private saver: ISaver
    ) {
        this.document = new Document(history, saver)
    }

    public start(): void {
        const rl = require("readline").createInterface({
            input: this.input,
            output: this.output
        })

        rl.on("line", (inputLine: string) => {
            const args = inputLine.split(" ")
            const commandName = args[0]

            try {
                const handler = this.getCommandHandler(commandName)
                handler(args.slice(1))
            } catch (e) {
                this.output.write(`Error: ${e}\n`)
            }
        })

        rl.on("close", () => {
            this.output.write("Bye\n")
        })
    }

    private getCommandHandler(commandName: string): (args: string[]) => void {
        switch (commandName) {
            case "InsertParagraph":
                return this.insertParagraph.bind(this)
            case "InsertImage":
                return this.insertImage.bind(this)
            case "SetTitle":
                return this.setTitle.bind(this)
            case "List":
                return this.list.bind(this)
            case "ReplaceText":
                return this.replaceText.bind(this)
            case "ResizeImage":
                return this.resizeImage.bind(this)
            case "DeleteItem":
                return this.deleteItem.bind(this)
            case "Help":
                return this.help.bind(this)
            case "Undo":
                return this.undo.bind(this)
            case "Redo":
                return this.redo.bind(this)
            case "Save":
                return this.save.bind(this)
            case "Exit":
                return this.exit.bind(this)
            default:
                throw new Error(`Unknown command: ${commandName}`)
        }
    }

    private insertParagraph(args: string[]): void {
        const text = args.length > 1
            ? args.slice(0, -1).join(' ')
            : args[0] || ''
        const optionalIndex = this.getOptionalIndex(args[args.length - 1])
        this.document.insertParagraph(text.trim(), optionalIndex)
    }

    private insertImage(args: string[]): void {
        const [index, width, height, ...pathArr] = args
        const path = pathArr.join(" ")
        const optionalIndex = this.getOptionalIndex(index)
        this.document.insertImage(path.trim(), parseInt(width), parseInt(height), optionalIndex)
    }

    private setTitle(args: string[]): void {
        const title = args.join(" ").trim()
        this.document.setTitle(title)
    }

    private list(): void {
        this.output.write(`Title: ${this.document.getTitle()}\n`)
        for (let i = 0; i < this.document.getItemsCount(); ++i) {
            const item = this.document.getItem(i)
            this.output.write(`${i}. `)

            const image = item.getImage()
            if (image) {
                this.output.write(`Image: ${image.getWidth()} ${image.getHeight()} ${image.getPath()}`)
            } else {
                const paragraph = item.getParagraph()
                if (paragraph) {
                    this.output.write(`Paragraph: ${paragraph.getText()}`)
                }
            }
            this.output.write("\n")
        }
    }

    private replaceText(args: string[]): void {
        const [index, ...textArr] = args
        const text = textArr.join(" ").trim()
        const paragraph = this.document.getItem(parseInt(index)).getParagraph()
        if (!paragraph) {
            throw new Error("Element is not a paragraph")
        }
        paragraph.setText(text)
    }

    private resizeImage(args: string[]): void {
        const [index, width, height] = args
        const image = this.document.getItem(parseInt(index)).getImage()
        if (!image) {
            throw new Error("Element is not an image")
        }
        image.resize(parseInt(width), parseInt(height))
    }

    private deleteItem(args: string[]): void {
        const [index] = args
        this.document.deleteItem(parseInt(index))
    }

    private help(): void {
        this.output.write(
            "Available commands:\n" +
            "InsertParagraph <index>|end <text>\n" +
            "InsertImage <index>|end <width> <height> <image path>\n" +
            "SetTitle <title>\n" +
            "List\n" +
            "ReplaceText <index> <text>\n" +
            "ResizeImage <index> <width> <height>\n" +
            "DeleteItem <index>\n" +
            "Help\n" +
            "Undo\n" +
            "Redo\n" +
            "Save <path>\n" +
            "Exit\n"
        )
    }

    private undo(): void {
        if (!this.document.canUndo()) {
            throw new Error("Cannot undo")
        }
        this.document.undo()
    }

    private redo(): void {
        if (!this.document.canRedo()) {
            throw new Error("Cannot redo")
        }
        this.document.redo()
    }

    private save(args: string[]): void {
        const path = args.join(" ").trim()
        this.document.save(path)
    }

    private exit(): void {
        this.running = false
        this.output.write("Exiting editor...\n")
        process.exit()
    }

    private getOptionalIndex(value: string): number | undefined {
        return value !== "end" ? parseInt(value) : undefined
    }
}
