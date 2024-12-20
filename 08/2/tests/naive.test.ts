import {GumballMachine} from "../NaiveGumBallMachine"

describe('GumballMachine', () => {
    let machine: GumballMachine

    beforeEach(() => {
        machine = new GumballMachine(2)
    })

    test('start in NoQuarter state with gumballs', () => {
        expect(machine.toString()).toContain('Machine is waiting for quarter')
    })

    test('not allow inserting more than 5 quarters', () => {
        for (let i = 0; i < 5; i++) {
            machine.insertQuarter()
        }
        machine.insertQuarter()
        expect(machine.toString()).toContain('Machine is waiting for turn of crank')
    })

    test('change state to HasQuarter after inserting one quarter', () => {
        machine.insertQuarter()
        expect(machine.toString()).toContain('Machine is waiting for turn of crank')
    })

    test('not insert a quarter when sold out', () => {
        const emptyMachine = new GumballMachine(0)
        emptyMachine.insertQuarter()
        expect(emptyMachine.toString()).toContain('Machine is sold out')
    })

    test('eject all quarters', () => {
        machine.insertQuarter()
        machine.insertQuarter()
        machine.ejectQuarter()
        expect(machine.toString()).toContain('Machine is waiting for quarter')
    })

    test('not eject quarters if none are inserted', () => {
        machine.ejectQuarter()
        expect(machine.toString()).toContain('Machine is waiting for quarter')
    })

    test('turn crank and dispense gumball', () => {
        machine.insertQuarter()
        machine.turnCrank()
        expect(machine.toString()).toContain('Machine is waiting for quarter')
    })

    test('transition to SoldOut state when no gumballs left', () => {
        machine.insertQuarter()
        machine.turnCrank()
        machine.insertQuarter()
        machine.turnCrank()
        expect(machine.toString()).toContain('Machine is sold out')
    })

    test('return remaining quarters when sold out', () => {
        machine.insertQuarter()
        machine.turnCrank()
        machine.insertQuarter()
        machine.turnCrank()
        expect(machine.toString()).toContain('Quarters: 0')
    })

    test('dispense gumball and reduce count', () => {
        machine.insertQuarter()
        const initialCount = machine.getBallCount()
        machine.turnCrank()
        expect(machine.getBallCount()).toBe(initialCount - 1)
    })

    test('transition back to NoQuarter state after dispensing gumball', () => {
        machine.insertQuarter()
        machine.turnCrank()
        expect(machine.toString()).toContain('Machine is waiting for quarter')
    })

    test('not dispense gumball without quarter', () => {
        machine.turnCrank()
        expect(machine.toString()).toContain('Machine is waiting for quarter')
    })

    test('refill gumballs and return to NoQuarter state', () => {
        machine.refill(5)
        expect(machine.toString()).toContain('Machine is waiting for quarter')
    })

    test('return to NoQuarter state after all gumballs are dispensed', () => {
        machine.insertQuarter()
        machine.turnCrank() 
        machine.insertQuarter()
        machine.turnCrank() 
        expect(machine.toString()).toContain('Machine is sold out')
    })
})
