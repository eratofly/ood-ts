import {GumballMachine} from "../GumBallMachineWithDynamicallyCreatedState"

describe('Gumball Machine', () => {
    let gumballMachine: GumballMachine

    beforeEach(() => {
        gumballMachine = new GumballMachine(5)
    })

    test('start in NoQuarter state when initialized with balls', () => {
        expect(gumballMachine.toString()).toContain("waiting for quarter")
    })

    test('transition to HasQuarter state after inserting a quarter', () => {
        gumballMachine.insertQuarter()
        expect(gumballMachine.toString()).toContain("waiting for turn of crank")
    })

    test('not allow more than 5 quarters', () => {
        for (let i = 0; i < 6; i++) {
            gumballMachine.insertQuarter()
        }
        expect(gumballMachine.getQuarterCount()).toBe(5)
    })

    test('dispense a gumball and reduce count when crank is turned', () => {
        gumballMachine.insertQuarter()
        gumballMachine.turnCrank()

        expect(gumballMachine.getBallCount()).toBe(4)
        expect(gumballMachine.toString()).toContain("waiting for quarter")
    })

    test('transition to SoldOut state when no balls are left', () => {
        gumballMachine = new GumballMachine(1)

        gumballMachine.insertQuarter()
        gumballMachine.turnCrank()

        expect(gumballMachine.getBallCount()).toBe(0)
        expect(gumballMachine.toString()).toContain("sold out")
    })

    test('return all quarters when eject is called', () => {
        gumballMachine.insertQuarter()
        gumballMachine.insertQuarter()

        expect(gumballMachine.getQuarterCount()).toBe(2)

        gumballMachine.ejectQuarter()

        expect(gumballMachine.getQuarterCount()).toBe(0)
        expect(gumballMachine.toString()).toContain("waiting for quarter")
    })

    test('not allow turning crank without inserting a quarter', () => {
        gumballMachine.turnCrank()

        expect(gumballMachine.getBallCount()).toBe(5)
        expect(gumballMachine.toString()).toContain("waiting for quarter")
    })

    test('handle SoldOut state correctly', () => {
        gumballMachine = new GumballMachine(0)

        expect(gumballMachine.toString()).toContain("sold out")

        gumballMachine.insertQuarter()
        gumballMachine.turnCrank()

        expect(gumballMachine.toString()).toContain("sold out")
        expect(gumballMachine.getQuarterCount()).toBe(0)
    })

    test('transition to HasQuarter state when quarters remain after dispensing', () => {
        gumballMachine.insertQuarter()
        gumballMachine.insertQuarter()
        gumballMachine.turnCrank()

        expect(gumballMachine.getBallCount()).toBe(4)
        expect(gumballMachine.getQuarterCount()).toBe(1)
        expect(gumballMachine.toString()).toContain("waiting for turn of crank")
    })

    test('transition to NoQuarter state when last quarter is used', () => {
        gumballMachine.insertQuarter()
        gumballMachine.turnCrank()

        expect(gumballMachine.getQuarterCount()).toBe(0)
        expect(gumballMachine.toString()).toContain("waiting for quarter")
    })
})
