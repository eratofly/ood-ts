//можно представить в виде функции

export interface IStyleEnumerator<T1, T2> {
    enumerateAll(args: { type: T1, callback: (style: T2) => void }): void
}
