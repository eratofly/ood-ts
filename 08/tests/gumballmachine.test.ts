import {GumballMachine} from "../GumBallMachineWithDynamicallyCreatedState"

describe('GumballMachine', () => {
    let gumballMachine: GumballMachine

    beforeEach(() => {
        gumballMachine = new GumballMachine(3)
    })

    test('check initial state', () => {
        expect(gumballMachine.toString()).toContain('waiting for quarter')
    })

    test('insert quarter changes state', () => {
        gumballMachine.insertQuarter()
        expect(gumballMachine.toString()).toContain('waiting for turn of crank')
    })

    test('eject quarter changes state back', () => {
        gumballMachine.insertQuarter()
        gumballMachine.ejectQuarter()
        expect(gumballMachine.toString()).toContain('waiting for quarter')
    })

    test('turn crank gives gumball', () => {
        gumballMachine.insertQuarter()
        gumballMachine.turnCrank()
        expect(gumballMachine.toString()).toContain('waiting for quarter')
        expect(gumballMachine.getBallCount()).toBe(2)
    })

    test('turn crank without quarter does nothing', () => {
        gumballMachine.turnCrank()
        expect(gumballMachine.toString()).toContain('waiting for quarter')
        expect(gumballMachine.getBallCount()).toBe(3)
    })

    test('insert quarter when empty fails', () => {
        gumballMachine = new GumballMachine(0)
        gumballMachine.insertQuarter()
        expect(gumballMachine.toString()).toContain('sold out')
    })

    test('last gumball changes state to empty', () => {
        gumballMachine.insertQuarter()
        gumballMachine.turnCrank()
        gumballMachine.insertQuarter()
        gumballMachine.turnCrank()
        gumballMachine.insertQuarter()
        gumballMachine.turnCrank()
        expect(gumballMachine.toString()).toContain('sold out')
    })

    test('', () => {
        console.log('!!!!!')
        gumballMachine.releaseBall()
    })
})