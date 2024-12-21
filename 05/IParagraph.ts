export interface IParagraph {
    getText(): string
    setText(text: string): void
    getType(): 'paragraph'
}