import {Slide} from "./Slide"
import {Rectangle} from "./Rectangle"
import {Ellipse} from "./Ellipse"
import {Triangle} from "./Triangle"
import {GroupShape} from "./GroupShape"
import {SvgCanvas} from "./SvgCanvas"

//паттерн копоновщик, выучить теорию

function main(): void {
    const slide = new Slide(800, 600)
    slide.setBackgroundColor('#ffffffd9')

    const land = new Rectangle(0, 300, 800, 600)
    land.getFillStyle().setColor('#0080f0cc')
    slide.insertShape(land, 0)

    const sun = new Ellipse(600, 100, 50, 50)
    sun.getFillStyle().setColor('#b4506e80')
    sun.getOutlineStyle().setColor('#b4506e')
    slide.insertShape(sun, 1)

    const hill = new Triangle(800, 280, 800, 300, 500, 300)
    hill.getFillStyle().setColor('#2a0038')
    slide.insertShape(hill, 2)

    const walls = new Rectangle(200, 200, 400, 400)
    walls.getFillStyle().setColor('#dcc88c')

    const window = new Rectangle(260, 260, 340, 340)
    window.getFillStyle().setColor('#dcc88c')

    const roof = new Triangle(140, 200, 460, 200, 300, 120)
    roof.getFillStyle().setColor('#1e008cb3')

    const house = new GroupShape()
    house.insertShape(walls, 0)
    house.insertShape(window, 1)
    house.insertShape(roof, 2)
    house.setFrame({ left: 60, top: 200, width: 400, height: 120 })
    slide.insertShape(house, 3)

    const canvas = new SvgCanvas(800, 600)
    slide.draw(canvas)
    canvas.print('C:/study/ood ts/07/example.svg')

    // for (let i = 0 i < slide.getShapesCount() i++) {
    //     const sh = slide.getShapeAtIndex(i)
    //     // если это группа, то добавить внутрь нее еще один прямоугольник
    // }
}

main()