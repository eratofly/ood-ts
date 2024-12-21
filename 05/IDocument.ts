import {DocumentItem} from "./DocumentItem"

export interface IDocument {
    insertParagraph(text: string, position?: number): void
    insertImage(path: string, width: number, height: number, position?: number): void

    getItemsCount(): number

    getItem(index: number): DocumentItem
    deleteItem(index: number): void

    getTitle(): string
    setTitle(title: string): void

    canUndo(): boolean
    undo(): void

    canRedo(): boolean
    redo(): void

    save(path: string): void
}