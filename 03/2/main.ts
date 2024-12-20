import {Cappuccino, CoffeePortion, Latte, Tea, TeaSort, MilkshakePortion, Milkshake} from './Beverages'
import {CChocolateCrumbs, CIceCubes, CLiker, CSyrup, IceCubeType, LikerType, SyrupType} from "./Condiments"
import {IBeverage} from "./IBeverage"

const teaSort = Object.keys(TeaSort) as TeaSort[]
teaSort.forEach((sort) => {
    const beverage: IBeverage = new CIceCubes(new Tea(sort), 3, IceCubeType.Water)
    console.log(beverage.GetDescription() + ' = ' + beverage.GetCost() + ' рублей')
})

console.log()

const lattePortion = Object.keys(CoffeePortion) as CoffeePortion[]
lattePortion.forEach((portion) => {
    const beverage = new CSyrup(new Latte(portion), SyrupType.Maple)
    console.log(beverage.GetDescription() + ' = ' + beverage.GetCost() + ' рублей')
})

console.log()

const cappuccinoPortion = Object.keys(CoffeePortion) as CoffeePortion[]
cappuccinoPortion.forEach((portion) => {
    const beverage = new CLiker(new Cappuccino(portion), LikerType.Nutty)
    console.log(beverage.GetDescription() + ' = ' + beverage.GetCost() + ' рублей')
})

console.log()

const milkshakePortion = Object.keys(MilkshakePortion) as MilkshakePortion[]
milkshakePortion.forEach((portion) => {
    const beverage = new CChocolateCrumbs(new Milkshake(portion), 50)
    console.log(beverage.GetDescription() + ' = ' + beverage.GetCost() + ' рублей')
})
