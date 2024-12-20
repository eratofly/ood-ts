import * as readline from 'readline/promises'
// import {IDesigner} from "./IDesigner"
import {PictureDraft} from "./PictureDraft"
import {IShapeFactory} from "./IShapeFactory"

export class Designer {
    private factory: IShapeFactory
    private rl: readline.Interface

    constructor(factory: IShapeFactory) {
        this.factory = factory
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    async CreateDraft(): Promise<PictureDraft> {
        const draft: PictureDraft = new PictureDraft()

        await this.AddNewShapes(draft)
        return draft
    }

    private async AddNewShapes(draft: PictureDraft): Promise<void>
    {
        while (true) {
            const answer = await this.rl.question('Enter a shape ')
            if (answer === 'quit') {
                this.rl.close()
                break
            }
            try {
                draft.AddShape(this.factory.CreateShape(answer))
            } catch (e) {
                console.log(e.message)
            }
        }
    }
}





