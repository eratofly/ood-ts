import {AbstractCommand} from "./AbstractCommand"

export class ChangeDocumentTitleCommand extends AbstractCommand {
    private documentTitle: string
    private newTitle: string

    constructor(documentTitle: string, newTitle: string) {
        super()
        this.documentTitle = documentTitle
        this.newTitle = newTitle
    }

    protected doExecute(): void {
        [this.documentTitle, this.newTitle] = [this.newTitle, this.documentTitle]
    }

    protected doRollback(): void {
        [this.documentTitle, this.newTitle] = [this.newTitle, this.documentTitle]
    }
}
