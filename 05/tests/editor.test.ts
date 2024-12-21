// const mockHistory = {
//     CanUndo: jest.fn(),
//     Undo: jest.fn(),
//     CanRedo: jest.fn(),
//     Redo: jest.fn(),
//     AddAndExecuteCommand: jest.fn(),
// };
//
// const mockSaver = {
//     Save: jest.fn(),
// };
//
// class Document {
//     constructor(history, saver) {
//         this.history = history;
//         this.saver = saver;
//         this.title = '';
//         this.items = [];
//     }
//
//     GetTitle() {
//         return this.title;
//     }
//
//     GetItemsCount() {
//         return this.items.length;
//     }
//
//     InsertParagraph(text, position) {
//         this.history.AddAndExecuteCommand();
//     }
//
//     InsertImage(path, width, height, position) {
//         this.history.AddAndExecuteCommand();
//     }
//
//     SetTitle(newTitle) {
//         this.history.AddAndExecuteCommand();
//     }
//
//     CanUndo() {
//         return this.history.CanUndo();
//     }
//
//     Undo() {
//         this.history.Undo();
//     }
//
//     CanRedo() {
//         return this.history.CanRedo();
//     }
//
//     Redo() {
//         this.history.Redo();
//     }
//
//     Save(path) {
//         this.saver.Save();
//     }
// }
//
// describe("Document model", () => {
//     let document;
//
//     beforeEach(() => {
//         jest.clearAllMocks();
//         document = new Document(mockHistory, mockSaver);
//     });
//
//     describe("Initial state", () => {
//         test("has empty title and no items", () => {
//             expect(document.GetTitle()).toBe('');
//             expect(document.GetItemsCount()).toBe(0);
//         });
//     });
//
//     describe("Operations", () => {
//         test("delegates paragraph insertion to history", () => {
//             document.InsertParagraph("some text", null);
//             expect(mockHistory.AddAndExecuteCommand).toHaveBeenCalledTimes(1);
//         });
//
//         test("delegates image insertion to history", () => {
//             document.InsertImage("image.jpg", 50, 50, null);
//             expect(mockHistory.AddAndExecuteCommand).toHaveBeenCalledTimes(1);
//         });
//
//         test("delegates title change to history", () => {
//             document.SetTitle("new title");
//             expect(mockHistory.AddAndExecuteCommand).toHaveBeenCalledTimes(1);
//         });
//
//         test("delegates history operations", () => {
//             document.CanUndo();
//             document.Undo();
//             document.CanRedo();
//             document.Redo();
//
//             expect(mockHistory.CanUndo).toHaveBeenCalledTimes(1);
//             expect(mockHistory.Undo).toHaveBeenCalledTimes(1);
//             expect(mockHistory.CanRedo).toHaveBeenCalledTimes(1);
//             expect(mockHistory.Redo).toHaveBeenCalledTimes(1);
//         });
//
//         test("delegates saving to saver", () => {
//             document.Save("path/to/save");
//             expect(mockSaver.Save).toHaveBeenCalledTimes(1);
//         });
//     });
// });
//
// // Add more tests for specific components (Image, Paragraph, History, etc.)
// // following the structure above, replacing logic to fit JavaScript.
