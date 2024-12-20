import {GumballMachine} from "../GumBallMachine"

describe('GumballMachine', () => {
    let gumballMachine: GumballMachine

    beforeEach(() => {
        gumballMachine = new GumballMachine(5)
    })

    test('start in NoQuarterState if there are gumballs', () => {
        expect(gumballMachine.toString()).toContain('waiting for quarter')
    })

    test('start in SoldOutState if there are no gumballs', () => {
        gumballMachine = new GumballMachine(0)
        expect(gumballMachine.toString()).toContain('sold out')
    })

    test('change to SoldState when turn crank after inserting a quarter', () => {
        gumballMachine.insertQuarter()
        expect(gumballMachine.toString()).toContain('waiting for turn of crank')

        gumballMachine.turnCrank()
        expect(gumballMachine.toString()).toContain('delivering a gumball')
    })

    test('dispense gumball and change to NoQuarterState after gumball is dispensed', () => {
        gumballMachine.insertQuarter()
        gumballMachine.turnCrank()
        expect(gumballMachine.getBallCount()).toBe(4)
        expect(gumballMachine.toString()).toContain('waiting for quarter')
    })

    test('not dispense gumball if no quarter is inserted', () => {
        gumballMachine.turnCrank()
        expect(gumballMachine.getBallCount()).toBe(5)
        expect(gumballMachine.toString()).toContain('waiting for quarter')
    })

    test('reject quarter in SoldState', () => {
        gumballMachine.insertQuarter()
        gumballMachine.turnCrank()

        const consoleSpy = jest.spyOn(console, 'log')
        gumballMachine.insertQuarter()
        expect(consoleSpy).toHaveBeenCalledWith("Please wait, we're already giving you a gumball")
    })

    test('eject quarter in HasQuarterState', () => {
        gumballMachine.insertQuarter()
        gumballMachine.ejectQuarter()
        expect(gumballMachine.toString()).toContain('waiting for quarter')
    })

    test('not accept quarter in SoldOutState', () => {
        gumballMachine = new GumballMachine(0) 
        const consoleSpy = jest.spyOn(console, 'log')
        gumballMachine.insertQuarter()
        expect(consoleSpy).toHaveBeenCalledWith("You can't insert a quarter, the machine is sold out")
    })

    test('refill gumball machine from SoldOutState', () => {
        gumballMachine = new GumballMachine(0)
        gumballMachine.refill(5)
        expect(gumballMachine.getBallCount()).toBe(5)
        expect(gumballMachine.toString()).toContain('waiting for quarter')
    })

    test('refill gumball machine from NoQuarterState', () => {
        gumballMachine.refill(5)
        expect(gumballMachine.getBallCount()).toBe(10)
    })

    test('not refill from SoldState', () => {
        gumballMachine.insertQuarter()
        gumballMachine.turnCrank()
        const consoleSpy = jest.spyOn(console, 'log')
        gumballMachine.refill(5)
        expect(consoleSpy).toHaveBeenCalledWith('Cannot refill while dispensing a gumball.')
    })
})