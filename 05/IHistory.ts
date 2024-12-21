import {ICommandExecutor} from "./ICommandExecutor"

export interface IHistory extends ICommandExecutor {
    canUndo(): boolean
    undo(): void

    canRedo(): boolean
    redo(): void
}