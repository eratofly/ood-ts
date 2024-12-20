//Изменяет поведение объекта при изменении его внутреннего состояния

//Есть класс, чьё поведение сильно меняется от внутреннего состояния
// Состояний много, их код часто меняется
// Код класса содержит множество больших, похожих друг на друга условных операторов
// В зависимости от содержимого полей класса они выбирают поведение


//повторить теорию и нарисовать диаграмму классов
//нарислвать диаграмму
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

export class SoldOutState implements IState {
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

export class HasQuarterState implements IState {
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

//клиенту не должны быть доступны привилигированные методы

export class GumballMachine implements IGumballMachine {
    private count: number
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

// export class GumballMachine extends DefaultGumballMachine {
//     private count: number
//     private currentState: IState = new SoldOutState(this)
//
//     constructor(numBalls: number) {
//         super()
//     }
//
//     ejectQuarter(): void {
//         this.currentState.ejectQuarter()
//     }
//
//     insertQuarter(): void {
//         this.currentState.insertQuarter()
//     }
//
//     turnCrank(): void {
//         this.currentState.turnCrank()
//         this.currentState.dispense()
//     }
//
//     toString(): string {
//         return `Mighty Gumball, Inc.\n`
//             + `TypeScript-enabled Standing Gumball Model #2024\n`
//             + `Inventory: ${this.count} gumball${this.count !== 1 ? "s" : ""}\n`
//             + `Machine is ${this.currentState.toString()}\n`
//     }
//
//     getBallCount(): number {
//         return this.count
//     }
//
//     releaseBall(): void {
//         if (this.count !== 0) {
//             console.log("A gumball comes rolling out the slot...")
//             this.count--
//         }
//     }
//
//     setSoldOutState(): void {
//         this.currentState = new SoldOutState(this)
//     }
//
//     setNoQuarterState(): void {
//         this.currentState = new NoQuarterState(this)
//     }
//
//     setSoldState(): void {
//         this.currentState = new SoldState(this)
//     }
//
//     setHasQuarterState(): void {
//         this.currentState = new HasQuarterState(this)
//     }
// }
