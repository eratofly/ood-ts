import {ICommand} from "./ICommand"

export abstract class AbstractCommand implements ICommand {
    private isExecuted: boolean = false

    public execute(): void {
        if (!this.isExecuted) {
            this.doExecute()
            this.isExecuted = true
        }
    }

    public rollback(): void {
        if (this.isExecuted) {
            this.doRollback()
            this.isExecuted = false
        }
    }

    protected abstract doExecute(): void
    protected abstract doRollback(): void
}
