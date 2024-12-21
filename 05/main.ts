import {Editor} from "./Editor";
import {History} from "./History";
import {HtmlSaver} from "./HtmlSaver";

function main(): void {
    const history = new History();
    const saver = new HtmlSaver();
    const editor = new Editor(process.stdin, process.stdout, history, saver);
    editor.start();
}

main();