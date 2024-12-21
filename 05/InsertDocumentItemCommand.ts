import {AbstractCommand} from "./AbstractCommand"
import {DocumentItem} from "./DocumentItem"

export class InsertDocumentItemCommand extends AbstractCommand {
    private items: DocumentItem[]
    private newItem: DocumentItem
    private index: number | null

    constructor(items: DocumentItem[], newItem: DocumentItem, index?: number | null) {
        super()
        if (index !== undefined && index !== null && index > items.length) {
            throw new Error("invalid index")
        }
        this.items = items
        this.newItem = newItem
        this.index = index !== undefined ? index : null
    }

    protected doExecute(): void {
        if (this.index !== null) {
            this.items.splice(this.index, 0, this.newItem)
        } else {
            this.items.push(this.newItem)
        }
    }

    protected doRollback(): void {
        if (this.index !== null) {
            this.items.splice(this.index, 1)
        } else {
            this.items.pop()
        }
    }
}
