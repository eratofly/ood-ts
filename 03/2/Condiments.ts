import {IBeverage} from './IBeverage'

    //GetCondimentDescription и GetDescription
//GetCondimentDescription - нужен ли приватный
    class CCondimentDecorator implements IBeverage {
    private beverage: IBeverage

    constructor(beverage: IBeverage) {
        this.beverage = beverage
    }

    GetDescription(): string {
        return this.beverage.GetDescription() + ', ' + this.GetCondimentDescription()
    }

    GetCost(): number {
        return this.beverage.GetCost() + this.GetCondimentCost()
    }

     GetCondimentDescription(): string {
        return ''
    }

    GetCondimentCost(): number {
        return 0
    }
}

//если мы сделаем эти методы приватными, то они будут не доступны для конкретных классов добавки.

//не использовать в классах префикс C
class CCinnamon extends CCondimentDecorator {
    constructor(beverage: IBeverage) {
        super(beverage)
    }

    GetCondimentCost(): number {
        return 20
    }

    GetCondimentDescription(): string {
        return 'Cinnamon'
    }
}

class CCream extends CCondimentDecorator {
    constructor(beverage: IBeverage) {
        super(beverage)
    }

    GetCondimentCost(): number {
        return 25
    }

    GetCondimentDescription(): string {
        return 'Cream'
    }
}

enum LikerType {
    Chocolate = 'Chocolate',
    Nutty = 'Nutty'
}

class CLiker extends CCondimentDecorator {
    private type: LikerType

    constructor(beverage: IBeverage, type: LikerType = LikerType.Chocolate) {
        super(beverage)
        this.type = type
    }

    GetCondimentCost(): number {
        return 50
    }

    GetCondimentDescription(): string {
        return `${this.type} Liker`
    }
}

class CChocolate extends CCondimentDecorator {
    private quantity: number
    
    constructor(beverage: IBeverage, quantity: number = 1) {
        super(beverage)
        if (quantity >= 1 && quantity <= 5) {
            this.quantity = quantity
        }
        else {
            throw new Error('Quantity must be between 1 and 5')
        }
    }

    GetCondimentCost(): number {
        return this.quantity * 10
    }

    GetCondimentDescription(): string {
        return 'Chocolate x ' + this.quantity.toString()
    }
}

class CLemon extends CCondimentDecorator {
    private quantity: number

    constructor(beverage: IBeverage, quantity: number = 1) {
        super(beverage)
        if (quantity >= 1) {
            this.quantity = quantity
        }
        else {
            throw new Error('Quantity must be more than 1')
        }
    }

    GetCondimentCost(): number {
        return 10 * this.quantity
    }

    GetCondimentDescription(): string {
        return 'Lemon x ' + this.quantity.toString()
    }
}

enum IceCubeType {
    Dry,
    Water
}

class CIceCubes extends CCondimentDecorator {
    private quantity: number
    private type: IceCubeType


    constructor(beverage: IBeverage, quantity: number, type: IceCubeType = IceCubeType.Water) {
        super(beverage)
        this.quantity = quantity
        this.type = type
    }

    GetCondimentCost(): number {
        return (this.type === IceCubeType.Dry ? 10 : 5) * this.quantity
    }

    GetCondimentDescription(): string {
        return (this.type === IceCubeType.Dry ? 'Dry' : 'Water') + ' ice cubes x ' + this.quantity.toString()
    }
}

enum SyrupType {
    Chocolate,
    Maple
}

class CSyrup extends CCondimentDecorator {
    private syrupType: SyrupType

    constructor(beverage: IBeverage, syrupType: SyrupType) {
        super(beverage)
        this.syrupType = syrupType
    }

    GetCondimentCost(): number {
        return 15
    }

    GetCondimentDescription(): string {
        return (this.syrupType === SyrupType.Chocolate ? 'Chocolate' : 'Maple') + ' syrup'
    }
}

class CChocolateCrumbs extends CCondimentDecorator {
    private mass: number

    constructor(beverage: IBeverage, mass: number) {
        super(beverage)
        this.mass = mass
    }

    GetCondimentCost(): number {
        return 2 * this.mass
    }

    GetCondimentDescription(): string {
        return 'Chocolate crumbs ' + this.mass.toString() + 'g'
    }
}

class CCoconutFlakes extends CCondimentDecorator {
    private mass: number

    constructor(beverage: IBeverage, mass: number) {
        super(beverage)
        this.mass = mass
    }

    GetCondimentCost(): number {
        return this.mass
    }

    GetCondimentDescription(): string {
        return 'Coconut flakes ' + this.mass.toString() + 'g'
    }
}

export {CLemon, CChocolate, CIceCubes, IceCubeType, CSyrup, SyrupType, CChocolateCrumbs, LikerType, CLiker}