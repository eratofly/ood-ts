import {PictureDraft} from "./PictureDraft"
import {ICanvas} from "./ICanvas"
export class Painter {
    DrawPicture(draft: PictureDraft, canvas: ICanvas): void {
        const n: number = draft.GetShapeCount()
        for (let i: number = 0 i < n ++i) {
            draft.GetShape(i).Draw(canvas)
        }
    }
}