import {IDocument} from "./IDocument"

export interface ISaver{
    save(document: IDocument, path: string): void
}