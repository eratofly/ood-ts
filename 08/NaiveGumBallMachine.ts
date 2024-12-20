namespace naive {
    class GumballMachine {
        private count: number 
        private state: GumballMachine.State

        constructor(count: number) {
            this.count = count
            this.state = count > 0 ? GumballMachine.State.NoQuarter : GumballMachine.State.SoldOut
        }

        insertQuarter(): void {
            switch (this.state) {
                case GumballMachine.State.SoldOut:
                    console.log("You can't insert a quarter, the machine is sold out")
                    break
                case GumballMachine.State.NoQuarter:
                    console.log("You inserted a quarter")
                    this.state = GumballMachine.State.HasQuarter
                    break
                case GumballMachine.State.HasQuarter:
                    console.log("You can't insert another quarter")
                    break
                case GumballMachine.State.Sold:
                    console.log("Please wait, we're already giving you a gumball")
                    break
            }
        }

        ejectQuarter(): void {
            switch (this.state) {
                case GumballMachine.State.HasQuarter:
                    console.log("Quarter returned")
                    this.state = GumballMachine.State.NoQuarter
                    break
                case GumballMachine.State.NoQuarter:
                    console.log("You haven't inserted a quarter")
                    break
                case GumballMachine.State.Sold:
                    console.log("Sorry, you already turned the crank")
                    break
                case GumballMachine.State.SoldOut:
                    console.log("You can't eject, you haven't inserted a quarter yet")
                    break
            }
        }

        turnCrank(): void {
            switch (this.state) {
                case GumballMachine.State.SoldOut:
                    console.log("You turned but there's no gumballs")
                    break
                case GumballMachine.State.NoQuarter:
                    console.log("You turned but there's no quarter")
                    break
                case GumballMachine.State.HasQuarter:
                    console.log("You turned...")
                    this.state = GumballMachine.State.Sold
                    this.dispense()
                    break
                case GumballMachine.State.Sold:
                    console.log("Turning twice doesn't get you another gumball")
                    break
            }
        }

        refill(numBalls: number): void {
            this.count = numBalls
            this.state = numBalls > 0 ? GumballMachine.State.NoQuarter : GumballMachine.State.SoldOut
        }

        toString(): string {
            const stateDescription =
                this.state === GumballMachine.State.SoldOut
                    ? "sold out"
                    : this.state === GumballMachine.State.NoQuarter
                        ? "waiting for quarter"
                        : this.state === GumballMachine.State.HasQuarter
                            ? "waiting for turn of crank"
                            : "delivering a gumball"

            return `
Mighty Gumball, Inc.
TypeScript-enabled Standing Gumball Model #2024
Inventory: ${this.count} gumball${this.count !== 1 ? "s" : ""}
Machine is ${stateDescription}
`
        }

        private dispense(): void {
            switch (this.state) {
                case GumballMachine.State.Sold:
                    console.log("A gumball comes rolling out the slot")
                    this.count--
                    if (this.count === 0) {
                        console.log("Oops, out of gumballs")
                        this.state = GumballMachine.State.SoldOut
                    } else {
                        this.state = GumballMachine.State.NoQuarter
                    }
                    break
                case GumballMachine.State.NoQuarter:
                    console.log("You need to pay first")
                    break
                case GumballMachine.State.SoldOut:
                case GumballMachine.State.HasQuarter:
                    console.log("No gumball dispensed")
                    break
            }
        }
    }

    namespace GumballMachine {
        export enum State {
            SoldOut, // Жвачка закончилась
            NoQuarter, // Нет монетки
            HasQuarter, // Есть монетка
            Sold, // Монетка выдана
        }
    }
}
