import {ICommand} from "./ICommand"

export interface ICommandExecutor {
    addAndExecuteCommand(command: ICommand): void
}