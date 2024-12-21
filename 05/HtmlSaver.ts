import * as fs from "fs"
import * as path from "path"
import {ISaver} from "./ISaver"
import {IDocument} from "./IDocument"
import {IImage} from "./IImage";
import {IParagraph} from "./IParagraph";

export class HtmlSaver implements ISaver {
    private static readonly IMAGES_DIRECTORY = "images"

    private static readonly ESCAPE_SEQUENCES: Record<string, string> = {
        "&": "&amp",
        "<": "&lt",
        ">": "&gt",
        '"': "&quot",
        "'": "&apos",
    }

    save(document: IDocument, path: string): void {
        const output = fs.createWriteStream(path, { flags: "w" })
        const imagesDirectoryPath = HtmlSaver.createImagesDirectory(path)

        HtmlSaver.writeHeader(output, document)

        for (let i = 0; i < document.getItemsCount(); i++) {
            const item = document.getItem(i)

            const image = item.getImage()
            if (image) {
                HtmlSaver.writeImage(output, image, imagesDirectoryPath)
            } else {
                const paragraph = item.getParagraph()
                if (paragraph) {
                    HtmlSaver.writeParagraph(output, paragraph)
                }
            }
        }

        HtmlSaver.writeFooter(output)
        output.close()
    }

    private static createImagesDirectory(documentPath: string): string {
        const imagesDirectoryPath = HtmlSaver.getImagesDirectoryPath(documentPath)
        if (!fs.existsSync(imagesDirectoryPath)) {
            fs.mkdirSync(imagesDirectoryPath, { recursive: true })
        }
        return imagesDirectoryPath
    }

    private static getImagesDirectoryPath(documentPath: string): string {
        const documentRootPath = path.dirname(documentPath)
        return path.join(documentRootPath, HtmlSaver.IMAGES_DIRECTORY)
    }

    private static writeHeader(output: fs.WriteStream, document: IDocument): void {
        output.write("<html>\n<head>\n")
        output.write(`  <title>${HtmlSaver.escape(document.getTitle())}</title>\n`)
        output.write("</head>\n<body>\n")
    }

    private static writeImage(output: fs.WriteStream, image: IImage, imagesDirectoryPath: string): void {
        const imageDestinationPath = path.join(imagesDirectoryPath, path.basename(image.getPath()))
        fs.copyFileSync(image.getPath(), imageDestinationPath)

        output.write(
            `  <img src="${HtmlSaver.escape(imageDestinationPath)}" ` +
            `width="${image.getWidth()}" height="${image.getHeight()}" />\n`
        )
    }

    private static writeParagraph(output: fs.WriteStream, paragraph: IParagraph): void {
        output.write(`  <p>${HtmlSaver.escape(paragraph.getText())}</p>\n`)
    }

    private static writeFooter(output: fs.WriteStream): void {
        output.write("</body>\n</html>\n")
    }

    private static escape(str: string): string {
        return [...str].map(ch => HtmlSaver.ESCAPE_SEQUENCES[ch] || ch).join("")
    }
}
