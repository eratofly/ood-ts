import {AbstractCommand} from "./AbstractCommand"

export class ChangeDocumentTitleCommand extends AbstractCommand {
    private documentTitle: string
    private newTitle: string
    private changeTitle: (v: string) => void

    constructor(documentTitle: string, changeTitle: (v: string) => void, newTitle: string) {
        super()
        this.documentTitle = documentTitle
        this.changeTitle = changeTitle
        this.newTitle = newTitle
    }

    protected doExecute(): void {
        [this.documentTitle, this.newTitle] = [this.newTitle, this.documentTitle]
        this.changeTitle(this.documentTitle)
    }

    protected doRollback(): void {
        [this.documentTitle, this.newTitle] = [this.newTitle, this.documentTitle]
        this.changeTitle(this.documentTitle)
    }
}
