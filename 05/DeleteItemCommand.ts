import {AbstractCommand} from "./AbstractCommand"
import {DocumentItem} from "./DocumentItem"

export class DeleteItemCommand extends AbstractCommand {
    private items: DocumentItem[]
    private index: number
    private deletedItem: DocumentItem | null = null

    constructor(items: DocumentItem[], index: number) {
        super()
        if (index >= items.length) {
            throw new Error("invalid index")
        }
        this.items = items
        this.index = index
        this.deletedItem = items[index]
    }

    protected doExecute(): void {
        this.items.splice(this.index, 1)
    }

    protected doRollback(): void {
        if (this.deletedItem !== null) {
            this.items.splice(this.index, 0, this.deletedItem)
        }
    }
}
