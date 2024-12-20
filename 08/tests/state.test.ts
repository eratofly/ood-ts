import { SoldState, SoldOutState, HasQuarterState, NoQuarterState, GumballMachine, IState, IGumballMachine } from "../GumBallMachineWithDynamicallyCreatedState";

describe('Gumball Machine States', () => {
    let gumballMachine: {
        setSoldOutState: jest.Mock<any, any, any>;
        setSoldState: jest.Mock<any, any, any>;
        getBallCount: jest.Mock<any, any, any>;
        setNoQuarterState: jest.Mock<any, any, any>;
        releaseBall: jest.Mock<any, any, any>;
        setHasQuarterState: jest.Mock<any, any, any>
    };

    beforeEach(() => {
        gumballMachine = {
            releaseBall: jest.fn(),
            getBallCount: jest.fn().mockReturnValue(5),
            setSoldOutState: jest.fn(),
            setNoQuarterState: jest.fn(),
            setSoldState: jest.fn(),
            setHasQuarterState: jest.fn(),
        };
    });

    describe('SoldState', () => {
        it('not allow inserting a quarter', () => {
            const state = new SoldState(gumballMachine);
            console.log = jest.fn();
            state.insertQuarter();
            expect(console.log).toHaveBeenCalledWith("Please wait, we're already giving you a gumball");
        });

        it('not allow ejecting a quarter', () => {
            const state = new SoldState(gumballMachine);
            console.log = jest.fn();
            state.ejectQuarter();
            expect(console.log).toHaveBeenCalledWith("Sorry, you already turned the crank");
        });

        it('not allow turning the crank again', () => {
            const state = new SoldState(gumballMachine);
            console.log = jest.fn();
            state.turnCrank();
            expect(console.log).toHaveBeenCalledWith("Turning twice doesn't get you another gumball");
        });

        it('dispense a gumball and update state', () => {
            const state = new SoldState(gumballMachine);
            gumballMachine.getBallCount.mockReturnValue(1);

            state.dispense();
            expect(gumballMachine.releaseBall).toHaveBeenCalled();
            expect(gumballMachine.setNoQuarterState).toHaveBeenCalled();
        });

        it('set to SoldOutState if out of gumballs', () => {
            const state = new SoldState(gumballMachine);
            gumballMachine.getBallCount.mockReturnValue(0);

            state.dispense();
            expect(gumballMachine.releaseBall).toHaveBeenCalled();
            expect(gumballMachine.setSoldOutState).toHaveBeenCalled();
        });
    });

    describe('SoldOutState', () => {
        it('not allow inserting a quarter', () => {
            const state = new SoldOutState(gumballMachine);
            console.log = jest.fn();
            state.insertQuarter();
            expect(console.log).toHaveBeenCalledWith("You can't insert a quarter, the machine is sold out");
        });

        it('not allow ejecting a quarter', () => {
            const state = new SoldOutState(gumballMachine);
            console.log = jest.fn();
            state.ejectQuarter();
            expect(console.log).toHaveBeenCalledWith("You can't eject, you haven't inserted a quarter yet");
        });

        it('not allow turning the crank', () => {
            const state = new SoldOutState(gumballMachine);
            console.log = jest.fn();
            state.turnCrank();
            expect(console.log).toHaveBeenCalledWith("You turned but there's no gumballs");
        });

        it('not dispense a gumball', () => {
            const state = new SoldOutState(gumballMachine);
            console.log = jest.fn();
            state.dispense();
            expect(console.log).toHaveBeenCalledWith("No gumball dispensed");
        });
    });

    describe('HasQuarterState', () => {
        it('not allow inserting another quarter', () => {
            const state = new HasQuarterState(gumballMachine);
            console.log = jest.fn();
            state.insertQuarter();
            expect(console.log).toHaveBeenCalledWith("You can't insert another quarter");
        });

        it('return the quarter and update state', () => {
            const state = new HasQuarterState(gumballMachine);
            console.log = jest.fn();
            state.ejectQuarter();
            expect(console.log).toHaveBeenCalledWith("Quarter returned");
            expect(gumballMachine.setNoQuarterState).toHaveBeenCalled();
        });

        it('set to SoldState when crank is turned', () => {
            const state = new HasQuarterState(gumballMachine);
            console.log = jest.fn();
            state.turnCrank();
            expect(console.log).toHaveBeenCalledWith("You turned...");
            expect(gumballMachine.setSoldState).toHaveBeenCalled();
        });

        it('not dispense a gumball', () => {
            const state = new HasQuarterState(gumballMachine);
            console.log = jest.fn();
            state.dispense();
            expect(console.log).toHaveBeenCalledWith("No gumball dispensed");
        });
    });

    describe('NoQuarterState', () => {
        it('accept a quarter and update state', () => {
            const state = new NoQuarterState(gumballMachine);
            console.log = jest.fn();
            state.insertQuarter();
            expect(console.log).toHaveBeenCalledWith("You inserted a quarter");
            expect(gumballMachine.setHasQuarterState).toHaveBeenCalled();
        });

        it('not eject a quarter', () => {
            const state = new NoQuarterState(gumballMachine);
            console.log = jest.fn();
            state.ejectQuarter();
            expect(console.log).toHaveBeenCalledWith("You haven't inserted a quarter");
        });

        it('not allow turning the crank', () => {
            const state = new NoQuarterState(gumballMachine);
            console.log = jest.fn();
            state.turnCrank();
            expect(console.log).toHaveBeenCalledWith("You turned but there's no quarter");
        });

        it('not dispense a gumball', () => {
            const state = new NoQuarterState(gumballMachine);
            console.log = jest.fn();
            state.dispense();
            expect(console.log).toHaveBeenCalledWith("You need to pay first");
        });
    });
});