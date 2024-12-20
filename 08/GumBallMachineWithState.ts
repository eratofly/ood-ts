namespace withState {

    interface IState {
        insertQuarter(): void
        ejectQuarter(): void
        turnCrank(): void
        dispense(): void
        toString(): string
    }

    interface IGumballMachine {
        releaseBall(): void
        getBallCount(): number

        setSoldOutState(): void
        setNoQuarterState(): void
        setSoldState(): void
        setHasQuarterState(): void
    }

    class SoldState implements IState {
        private gumballMachine: IGumballMachine

        constructor(gumballMachine: IGumballMachine) {
            this.gumballMachine = gumballMachine
        }

        insertQuarter(): void {
            console.log("Please wait, we're already giving you a gumball")
        }

        ejectQuarter(): void {
            console.log("Sorry, you already turned the crank")
        }

        turnCrank(): void {
            console.log("Turning twice doesn't get you another gumball")
        }

        dispense(): void {
            this.gumballMachine.releaseBall()
            if (this.gumballMachine.getBallCount() === 0) {
                console.log("Oops, out of gumballs")
                this.gumballMachine.setSoldOutState()
            } else {
                this.gumballMachine.setNoQuarterState()
            }
        }

        toString(): string {
            return "delivering a gumball"
        }
    }

    class SoldOutState implements IState {
        private gumballMachine: IGumballMachine

        constructor(gumballMachine: IGumballMachine) {
            this.gumballMachine = gumballMachine
        }

        insertQuarter(): void {
            console.log("You can't insert a quarter, the machine is sold out")
        }

        ejectQuarter(): void {
            console.log("You can't eject, you haven't inserted a quarter yet")
        }

        turnCrank(): void {
            console.log("You turned but there's no gumballs")
        }

        dispense(): void {
            console.log("No gumball dispensed")
        }

        toString(): string {
            return "sold out"
        }
    }

    class HasQuarterState implements IState {
        private gumballMachine: IGumballMachine

        constructor(gumballMachine: IGumballMachine) {
            this.gumballMachine = gumballMachine
        }

        insertQuarter(): void {
            console.log("You can't insert another quarter")
        }

        ejectQuarter(): void {
            console.log("Quarter returned")
            this.gumballMachine.setNoQuarterState()
        }

        turnCrank(): void {
            console.log("You turned...")
            this.gumballMachine.setSoldState()
        }

        dispense(): void {
            console.log("No gumball dispensed")
        }

        toString(): string {
            return "waiting for turn of crank"
        }
    }

    class NoQuarterState implements IState {
        private gumballMachine: IGumballMachine

        constructor(gumballMachine: IGumballMachine) {
            this.gumballMachine = gumballMachine
        }

        insertQuarter(): void {
            console.log("You inserted a quarter")
            this.gumballMachine.setHasQuarterState()
        }

        ejectQuarter(): void {
            console.log("You haven't inserted a quarter")
        }

        turnCrank(): void {
            console.log("You turned but there's no quarter")
        }

        dispense(): void {
            console.log("You need to pay first")
        }

        toString(): string {
            return "waiting for quarter"
        }
    }

    class GumballMachine implements IGumballMachine {
        private count: number
        private soldState: IState
        private soldOutState: IState
        private noQuarterState: IState
        private hasQuarterState: IState
        private currentState: IState

        constructor(numBalls: number) {
            this.soldState = new SoldState(this)
            this.soldOutState = new SoldOutState(this)
            this.noQuarterState = new NoQuarterState(this)
            this.hasQuarterState = new HasQuarterState(this)

            this.count = numBalls
            this.currentState = this.count > 0 ? this.noQuarterState : this.soldOutState
        }

        ejectQuarter(): void {
            this.currentState.ejectQuarter()
        }

        insertQuarter(): void {
            this.currentState.insertQuarter()
        }

        turnCrank(): void {
            this.currentState.turnCrank()
            this.currentState.dispense()
        }

        toString(): string {
            return `
Mighty Gumball, Inc.
TypeScript-enabled Standing Gumball Model #2024
Inventory: ${this.count} gumball${this.count !== 1 ? "s" : ""}
Machine is ${this.currentState.toString()}
`
        }

        getBallCount(): number {
            return this.count
        }

        releaseBall(): void {
            if (this.count > 0) {
                console.log("A gumball comes rolling out the slot...")
                this.count--
            }
        }

        setSoldOutState(): void {
            this.currentState = this.soldOutState
        }

        setNoQuarterState(): void {
            this.currentState = this.noQuarterState
        }

        setSoldState(): void {
            this.currentState = this.soldState
        }

        setHasQuarterState(): void {
            this.currentState = this.hasQuarterState
        }
    }
}
