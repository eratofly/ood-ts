import {IBeverage} from "./IBeverage"

enum CoffeePortion {
    Standard = "Standard",
    Double = "Double"
}

enum MilkshakePortion {
    Small = "Small",
    Medium = "Medium",
    Large = "Large"
}

enum TeaSort {
    Black = "Black",
    Green = "Green",
    Yellow = "Yellow",
    Oolong = "Oolong"
}

// Beverage.ts
class Beverage implements IBeverage {
    private description: string

    constructor(description: string) {
        this.description = description
    }

    GetDescription(): string {
        return this.description
    }

    GetCost(): number {
        return 0
    }
}

// Coffee.ts
class Coffee extends Beverage {
    constructor(description: string = "Coffee") {
        super(description)
    }

    override GetCost(): number {
        return 60
    }
}

// Cappuccino.ts
class Cappuccino extends Coffee {
    private cappuccinoPortion: CoffeePortion

    constructor(coffeePortion: CoffeePortion) {
        super(`${coffeePortion} Cappuccino`)
        this.cappuccinoPortion = coffeePortion
    }

    override GetCost(): number {
        if (this.cappuccinoPortion === CoffeePortion.Double) {
            return 120
        } else if (this.cappuccinoPortion === CoffeePortion.Standard) {
            return 80
        }
    }
}

// Latte.ts
class Latte extends Coffee {
    private lattePortion: CoffeePortion

    constructor(coffeePortion: CoffeePortion) {
        super(`${coffeePortion} Latte`)
        this.lattePortion = coffeePortion
    }

    override GetCost(): number {
        if (this.lattePortion === CoffeePortion.Double) {
            return 130
        } else if (this.lattePortion === CoffeePortion.Standard) {
            return 90
        }
    }
}

// Tea.ts
class Tea extends Beverage {
    constructor(teaSort: TeaSort) {
        super(`${teaSort} Tea`)
    }

    override GetCost(): number {
        return 30
    }
}

// Milkshake.ts
class Milkshake extends Beverage {
    private milkshakePortion: MilkshakePortion

    constructor(milkshakePortion: MilkshakePortion) {
        super(`${milkshakePortion} Milkshake`)
        this.milkshakePortion = milkshakePortion
    }

    override GetCost(): number {
        switch (this.milkshakePortion) {
            case MilkshakePortion.Small:
                return 50
            case MilkshakePortion.Medium:
                return 60
            case MilkshakePortion.Large:
                return 80
        }
    }
}

export {Latte, Cappuccino, Milkshake, Tea, TeaSort, CoffeePortion, MilkshakePortion}