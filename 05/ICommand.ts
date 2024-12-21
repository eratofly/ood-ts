export interface ICommand {
    execute(): void
    rollback(): void
}
