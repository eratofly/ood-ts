import {AbstractCommand} from "./AbstractCommand"

class SetParagraphTextCommand extends AbstractCommand {
    private paragraphText: { value: string }
    private newText: string

    constructor(paragraphText: { value: string }, newText: string) {
        super()
        this.paragraphText = paragraphText
        this.newText = newText
    }

    protected doExecute(): void {
        [this.paragraphText.value, this.newText] = [this.newText, this.paragraphText.value]
    }

    protected doRollback(): void {
        [this.paragraphText.value, this.newText] = [this.newText, this.paragraphText.value]
    }
}
