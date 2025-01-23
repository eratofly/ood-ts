import {Frame} from '../common/Frame'
import {RectangleView} from './RectangleView'
import {View} from './View'

class SelectionView extends View<SVGGElement> {
	private static readonly pointSize = 5
	private static readonly halfPointSize = SelectionView.pointSize / 2
	private readonly point1: RectangleView
	private readonly point2: RectangleView
	private readonly point3: RectangleView
	private readonly point4: RectangleView
	private frame: Frame = {left: 0, top: 0, width: 0, height: 0}

	constructor(frame: Frame) {
		super(document.createElementNS('http://www.w3.org/2000/svg', 'g'))
		this.element.setAttribute('stroke', 'black')
		this.element.setAttribute('fill', 'transparent')

		const initialPointFrame = {left: 0, top: 0, width: SelectionView.pointSize, height: SelectionView.pointSize}
		this.point1 = new RectangleView(initialPointFrame)
		this.point2 = new RectangleView(initialPointFrame)
		this.point3 = new RectangleView(initialPointFrame)
		this.point4 = new RectangleView(initialPointFrame)

		this.setFrame(frame)
	}

	setFrame(frame: Frame): void {
		this.frame = frame

		this.point1.setPosition(frame.left - SelectionView.halfPointSize, frame.top - SelectionView.halfPointSize)
		this.point2.setPosition(frame.left + frame.width - SelectionView.halfPointSize, frame.top - SelectionView.halfPointSize)
		this.point3.setPosition(frame.left - SelectionView.halfPointSize, frame.top + frame.height - SelectionView.halfPointSize)
		this.point4.setPosition(frame.left + frame.width - SelectionView.halfPointSize, frame.top  + frame.height - SelectionView.halfPointSize)
	}

	getPoints(): [RectangleView, RectangleView, RectangleView, RectangleView] {
		return [this.point1, this.point2, this.point3, this.point4]
	}

	appendTo(parent: Element): void {
		super.appendTo(parent)
		parent.appendChild(this.getElement())
		this.getPoints().forEach(point => point.appendTo(this.getElement()))
	}
}

export {
	SelectionView,
}