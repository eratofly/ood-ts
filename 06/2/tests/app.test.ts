import {paintPictureOnModernGraphicsRenderer} from "../app"

test('draw rect', () => {
    const logSpy = jest.spyOn(console, 'log')

    paintPictureOnModernGraphicsRenderer()

    expect(logSpy).toHaveBeenNthCalledWith(1, '<draw>')
})
