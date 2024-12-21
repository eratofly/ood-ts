import {IHistory} from "./IHistory"
import {ICommand} from "./ICommand"

export class History implements IHistory {
    private commands: ICommand[] = []
    private currentCommandIndex: number = 0

    canUndo(): boolean {
        return this.currentCommandIndex > 0
    }

    undo(): void {
        if (this.canUndo()) {
            this.currentCommandIndex--
            this.commands[this.currentCommandIndex].rollback()
        }
    }

    canRedo(): boolean {
        return this.currentCommandIndex < this.commands.length
    }

    redo(): void {
        if (this.canRedo()) {
            this.commands[this.currentCommandIndex].execute()
            this.currentCommandIndex++
        }
    }

    addAndExecuteCommand(command: ICommand): void {
        command.execute()

        this.commands = this.commands.slice(0, this.currentCommandIndex)

        this.commands.push(command)
        this.currentCommandIndex++
    }
}