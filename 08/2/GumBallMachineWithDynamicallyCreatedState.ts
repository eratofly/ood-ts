export interface IState {
    insertQuarter(): void
    ejectQuarter(): void
    turnCrank(): void
    dispense(): void
    toString(): string
}

export interface IGumballMachine {
    releaseBall(): void
    getBallCount(): number
    addQuarter(): void
    returnAllQuarters(): void
    getQuarterCount(): number

    setSoldOutState(): void
    setNoQuarterState(): void
    setSoldState(): void
    setHasQuarterState(): void
}

export class SoldState implements IState {
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

    //шарики уменьшаются, но не уменьшаются монетки

    dispense(): void {
        this.gumballMachine.releaseBall()
        if (this.gumballMachine.getBallCount() > 0) {
            if (this.gumballMachine.getQuarterCount() > 0) {
                this.gumballMachine.setHasQuarterState()
            } else {
                this.gumballMachine.setNoQuarterState()
            }
        } else {
            console.log("Oops, out of gumballs")
            this.gumballMachine.returnAllQuarters()
            this.gumballMachine.setSoldOutState()
        }
    }

    toString(): string {
        return "delivering a gumball"
    }
}

export class SoldOutState implements IState {
    private gumballMachine: IGumballMachine

    constructor(gumballMachine: IGumballMachine) {
        this.gumballMachine = gumballMachine
    }

    insertQuarter(): void {
        console.log("You can't insert a quarter, the machine is sold out")
    }

    //вернуть монетки, если они ещё остались, но даже если мы в soldout

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

export class HasQuarterState implements IState {
    private gumballMachine: IGumballMachine

    constructor(gumballMachine: IGumballMachine) {
        this.gumballMachine = gumballMachine
    }

    insertQuarter(): void {
        if (this.gumballMachine.getQuarterCount() >= 5) {
            console.log("You can't insert more than 5 quarters")
        } else {
            this.gumballMachine.addQuarter()
            console.log(`You inserted a quarter. Total quarters: ${this.gumballMachine.getQuarterCount()}`)
        }    }

    ejectQuarter(): void {
        console.log("Quarter returned")
        this.gumballMachine.returnAllQuarters()
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

export class NoQuarterState implements IState {
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

export class GumballMachine implements IGumballMachine {
    private count: number
    private quarters: number = 0
    private maxQuarters: number = 5

    private currentState: IState = new SoldOutState(this)

    constructor(numBalls: number) {
        this.count = numBalls
        if (this.count > 0) {
            this.setNoQuarterState()
        } else {
            this.setSoldOutState()
        }
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
        return `Mighty Gumball, Inc.\n`
            + `TypeScript-enabled Standing Gumball Model #2024\n`
            + `Inventory: ${this.count} gumball${this.count !== 1 ? "s" : ""}\n`
            + `Machine is ${this.currentState.toString()}\n`
    }

    getBallCount(): number {
        return this.count
    }

    releaseBall(): void {
        if (this.count !== 0) {
            console.log("A gumball comes rolling out the slot...")
            this.count--
        }
    }

    addQuarter(): void {
        if (this.quarters < this.maxQuarters) {
            this.quarters++
        }
    }

    getQuarterCount(): number {
        return this.quarters
    }

    returnAllQuarters(): void {
        console.log(`Returning ${this.quarters} quarter(s)`)
        this.quarters = 0
    }

    setSoldOutState(): void {
        this.currentState = new SoldOutState(this)
    }

    setNoQuarterState(): void {
        this.currentState = new NoQuarterState(this)
    }

    setSoldState(): void {
        this.currentState = new SoldState(this)
    }

    setHasQuarterState(): void {
        this.currentState = new HasQuarterState(this)
    }
}
