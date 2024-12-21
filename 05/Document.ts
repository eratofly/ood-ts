import {IDocument} from "./IDocument"
import {IHistory} from "./IHistory"
import {ISaver} from "./ISaver"
import {Image} from "./Image"
import {DocumentItem} from "./DocumentItem"
import {Paragraph} from "./Paragraph"
import {DeleteItemCommand} from "./DeleteItemCommand"
import {ChangeDocumentTitleCommand} from "./ChangeDocumentTitleCommand"
import {InsertDocumentItemCommand} from "./InsertDocumentItemCommand"

export class Document implements IDocument {
    private items: DocumentItem[] = []
    private title: string = ""

    constructor(private history: IHistory, private saver: ISaver) {}

    public insertParagraph(text: string, position?: number): void {
        const paragraph = new Paragraph(text, this.history)
        const item = new DocumentItem(paragraph)

        const command = new InsertDocumentItemCommand(this.items, item, position)
        this.history.addAndExecuteCommand(command)
    }

    public insertImage(path: string, width: number, height: number, position?: number): void {
        const image = new Image(path, width, height, this.history)
        const item = new DocumentItem(image)

        const command = new InsertDocumentItemCommand(this.items, item, position)
        this.history.addAndExecuteCommand(command)
    }

    public getItemsCount(): number {
        return this.items.length
    }

    public getItem(index: number): DocumentItem {
        return this.items[index]
    }

    public deleteItem(index: number): void {
        const command = new DeleteItemCommand(this.items, index)
        this.history.addAndExecuteCommand(command)
    }

    public getTitle(): string {
        return this.title
    }

    public setTitle(title: string): void {
        const command = new ChangeDocumentTitleCommand(this.title, title)
        this.history.addAndExecuteCommand(command)
    }

    public canUndo(): boolean {
        return this.history.canUndo()
    }

    public undo(): void {
        this.history.undo()
    }

    public canRedo(): boolean {
        return this.history.canRedo()
    }

    public redo(): void {
        this.history.redo()
    }

    public save(path: string): void {
        this.saver.save(this, path)
    }
}