import {Cappuccino, CoffeePortion, Latte, Milkshake, MilkshakePortion, Tea, TeaSort,} from './Beverages'

const teaSort = Object.keys(TeaSort) as TeaSort[]
teaSort.forEach((sort) => {
    const tea = new Tea(sort)
    console.log(tea.GetDescription() + ' -- ' + tea.GetCost() + ' рублей')
})

console.log()

const lattePortion = Object.keys(CoffeePortion) as CoffeePortion[]
lattePortion.forEach((portion) => {
    const latte = new Latte(portion)
    console.log(latte.GetDescription() + ' -- ' + latte.GetCost() + ' рублей')
})

console.log()

const cappuccinoPortion = Object.keys(CoffeePortion) as CoffeePortion[]
cappuccinoPortion.forEach((portion) => {
    const cappuccino = new Cappuccino(portion)
    console.log(cappuccino.GetDescription() + ' -- ' + cappuccino.GetCost() + ' рублей')
})

console.log()

const milkshakePortion = Object.keys(MilkshakePortion) as MilkshakePortion[]
milkshakePortion.forEach((portion) => {
    const milkshake = new Milkshake(portion)
    console.log(milkshake.GetDescription() + ' -- ' + milkshake.GetCost() + ' рублей')
})