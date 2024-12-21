import {IParagraph} from "./IParagraph"
import {ICommandExecutor} from "./ICommandExecutor"
import {text} from "node:stream/consumers"

export class Paragraph implements IParagraph {
    private text: string
    private commandExecutor: ICommandExecutor

    constructor(text: string, commandExecutor: ICommandExecutor) {
        this.text = text
        this.commandExecutor = commandExecutor
    }

    public getText(): string {
        return this.text
    }

    public setText(text: string): void {
        const prevText = this.text
        this.commandExecutor.addAndExecuteCommand({
            execute: () => {
                this.text = text
            },
            rollback: () => {
                this.text = prevText
            },
        })
    }

    getType(): "paragraph" {
        return "paragraph"
    }
}