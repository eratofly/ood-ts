/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/CanvasSaver.ts":
/*!***********************************!*\
  !*** ./src/common/CanvasSaver.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CanvasSaver\": () => (/* binding */ CanvasSaver)\n/* harmony export */ });\n/* harmony import */ var _domain_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/Canvas */ \"./src/domain/Canvas.ts\");\n/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./save */ \"./src/common/save.ts\");\n/* harmony import */ var _domain_Shape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domain/Shape */ \"./src/domain/Shape.ts\");\n\r\n\r\n\r\nclass CanvasSaver {\r\n    static save(canvas) {\r\n        (0,_save__WEBPACK_IMPORTED_MODULE_1__.save)(CanvasSaver.serializeCanvas(canvas), 'doc');\r\n    }\r\n    static serializeCanvas(canvas) {\r\n        return JSON.stringify({\r\n            shapes: canvas.getShapes().map(shape => ({\r\n                type: shape.getType(),\r\n                frame: shape.getFrame(),\r\n            })),\r\n            width: canvas.getWidth(),\r\n            height: canvas.getHeight(),\r\n        });\r\n    }\r\n    static upload(file) {\r\n        const data = JSON.parse(file);\r\n        const canvas = new _domain_Canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas(data.width, data.height);\r\n        data.shapes.forEach(shapeData => {\r\n            const shape = new _domain_Shape__WEBPACK_IMPORTED_MODULE_2__.Shape(shapeData.type, shapeData.frame, canvas.getWidth(), canvas.getHeight());\r\n            canvas.insertShape(shape);\r\n        });\r\n        return canvas;\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/common/CanvasSaver.ts?");

/***/ }),

/***/ "./src/common/Signal.ts":
/*!******************************!*\
  !*** ./src/common/Signal.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Signal\": () => (/* binding */ Signal)\n/* harmony export */ });\nclass Signal {\r\n    constructor() {\r\n        this.listeners = [];\r\n    }\r\n    dispatch(value) {\r\n        this.listeners.forEach(listener => listener(value));\r\n    }\r\n    add(listener) {\r\n        this.listeners.push(listener);\r\n        return () => this.remove(listener);\r\n    }\r\n    addCallOnce(listener) {\r\n        const callOnceFn = (value) => {\r\n            listener(value);\r\n            this.remove(callOnceFn);\r\n        };\r\n        this.add(callOnceFn);\r\n    }\r\n    remove(listener) {\r\n        this.listeners = this.listeners.filter(v => v !== listener);\r\n    }\r\n    removeAll() {\r\n        this.listeners = [];\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/common/Signal.ts?");

/***/ }),

/***/ "./src/common/save.ts":
/*!****************************!*\
  !*** ./src/common/save.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"save\": () => (/* binding */ save)\n/* harmony export */ });\nfunction save(content, fileName) {\r\n    const a = document.createElement('a');\r\n    const file = new Blob([content], { type: 'text/plain' });\r\n    a.href = URL.createObjectURL(file);\r\n    a.download = fileName;\r\n    a.click();\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/common/save.ts?");

/***/ }),

/***/ "./src/common/upload.ts":
/*!******************************!*\
  !*** ./src/common/upload.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"upload\": () => (/* binding */ upload)\n/* harmony export */ });\nfunction upload(onUpload) {\r\n    const input = document.createElement('input');\r\n    input.setAttribute('type', 'file');\r\n    input.click();\r\n    input.addEventListener('change', () => {\r\n        const selectedFile = input.files && input.files[0];\r\n        selectedFile.text().then(value => {\r\n            onUpload(value);\r\n        });\r\n    }, {\r\n        once: true,\r\n    });\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/common/upload.ts?");

/***/ }),

/***/ "./src/domain/Canvas.ts":
/*!******************************!*\
  !*** ./src/domain/Canvas.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Canvas\": () => (/* binding */ Canvas)\n/* harmony export */ });\n/* harmony import */ var _common_Signal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Signal */ \"./src/common/Signal.ts\");\n\r\nclass Canvas {\r\n    constructor(width = 800, height = 600) {\r\n        this.shapes = [];\r\n        this.onShapeInsertedSignal = new _common_Signal__WEBPACK_IMPORTED_MODULE_0__.Signal();\r\n        this.onShapeDeletedSignal = new _common_Signal__WEBPACK_IMPORTED_MODULE_0__.Signal();\r\n        this.width = width;\r\n        this.height = height;\r\n    }\r\n    getWidth() {\r\n        return this.width;\r\n    }\r\n    getHeight() {\r\n        return this.height;\r\n    }\r\n    getShapes() {\r\n        return this.shapes;\r\n    }\r\n    insertShape(shape, index = this.shapes.length) {\r\n        if (!this.shapes.includes(shape)) {\r\n            this.shapes.splice(index, 0, shape);\r\n            this.onShapeInsertedSignal.dispatch(shape);\r\n        }\r\n    }\r\n    getOnShapeInsertedSignal() {\r\n        return this.onShapeInsertedSignal;\r\n    }\r\n    deleteShape(shape) {\r\n        this.shapes = this.shapes.filter(v => v !== shape);\r\n        this.onShapeDeletedSignal.dispatch(shape);\r\n    }\r\n    getOnShapeDeletedSignal() {\r\n        return this.onShapeDeletedSignal;\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/domain/Canvas.ts?");

/***/ }),

/***/ "./src/domain/Shape.ts":
/*!*****************************!*\
  !*** ./src/domain/Shape.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Shape\": () => (/* binding */ Shape)\n/* harmony export */ });\n/* harmony import */ var _common_Signal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Signal */ \"./src/common/Signal.ts\");\n\r\nclass Shape {\r\n    constructor(type, frame, canvasWidth, canvasHeight) {\r\n        this.onFrameChangedSignal = new _common_Signal__WEBPACK_IMPORTED_MODULE_0__.Signal();\r\n        this.type = type;\r\n        this.frame = frame;\r\n        this.canvasWidth = canvasWidth;\r\n        this.canvasHeight = canvasHeight;\r\n    }\r\n    getFrame() {\r\n        return this.frame;\r\n    }\r\n    setFrame(frame) {\r\n        if (frame.height >= Shape.minSize && frame.width >= Shape.minSize) {\r\n            this.frame = frame;\r\n            if (frame.left < 0)\r\n                this.frame.left = 0;\r\n            if (frame.top < 0)\r\n                this.frame.top = 0;\r\n            if (frame.left + frame.width > this.canvasWidth)\r\n                this.frame.left = this.canvasWidth - frame.width;\r\n            if (frame.top + frame.height > this.canvasHeight)\r\n                this.frame.top = this.canvasHeight - frame.height;\r\n            this.onFrameChangedSignal.dispatch(this.frame);\r\n        }\r\n    }\r\n    setPosition({ left, top }) {\r\n        this.setFrame({\r\n            left,\r\n            top,\r\n            width: this.frame.width,\r\n            height: this.frame.height,\r\n        });\r\n    }\r\n    getOnFrameChangedSignal() {\r\n        return this.onFrameChangedSignal;\r\n    }\r\n    getType() {\r\n        return this.type;\r\n    }\r\n}\r\nShape.minSize = 20;\r\n\r\n\n\n//# sourceURL=webpack:///./src/domain/Shape.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _presenter_EditorPresenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./presenter/EditorPresenter */ \"./src/presenter/EditorPresenter.ts\");\n\r\nwindow.addEventListener('DOMContentLoaded', initEditor);\r\nfunction initEditor() {\r\n    new _presenter_EditorPresenter__WEBPACK_IMPORTED_MODULE_0__.EditorPresenter();\r\n}\r\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/presenter/CanvasPresenter.ts":
/*!******************************************!*\
  !*** ./src/presenter/CanvasPresenter.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CanvasPresenter\": () => (/* binding */ CanvasPresenter)\n/* harmony export */ });\n/* harmony import */ var _view_ShapeViewFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/ShapeViewFactory */ \"./src/view/ShapeViewFactory.ts\");\n/* harmony import */ var _ShapePresenter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShapePresenter */ \"./src/presenter/ShapePresenter.ts\");\n/* harmony import */ var _SelectionPresenter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SelectionPresenter */ \"./src/presenter/SelectionPresenter.ts\");\n/* harmony import */ var _view_SelectionView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/SelectionView */ \"./src/view/SelectionView.ts\");\n\r\n\r\n\r\n\r\nclass CanvasPresenter {\r\n    constructor(canvasModel, canvasView) {\r\n        this.shapesPresenter = [];\r\n        this.selectedShape = null;\r\n        this.canvasModel = canvasModel;\r\n        this.canvasView = canvasView;\r\n        this.canvasModel.getShapes().forEach(shapeModel => this.addShape(shapeModel));\r\n        this.canvasModel.getOnShapeInsertedSignal().add(shapeModel => this.addShape(shapeModel));\r\n        this.canvasModel.getOnShapeDeletedSignal().add(shapeModel => {\r\n            const shapePresenter = this.shapesPresenter.find(presenter => presenter.getModel() === shapeModel);\r\n            shapePresenter.remove();\r\n            this.removeSelection();\r\n        });\r\n        this.canvasView.getOnClickSignal().add(() => this.removeSelection());\r\n    }\r\n    addShape(shapeModel) {\r\n        const shapeView = _view_ShapeViewFactory__WEBPACK_IMPORTED_MODULE_0__.ShapeViewFactory.createShape(shapeModel.getType(), shapeModel.getFrame());\r\n        const shapePresenter = new _ShapePresenter__WEBPACK_IMPORTED_MODULE_1__.ShapePresenter(this, shapeModel, shapeView);\r\n        this.shapesPresenter.push(shapePresenter);\r\n        this.canvasView.addShape(shapeView);\r\n        shapeView.getOnMouseDownSignal().add(() => {\r\n            this.removeSelection();\r\n            this.selectedShape = shapeModel;\r\n            const selectionView = new _view_SelectionView__WEBPACK_IMPORTED_MODULE_3__.SelectionView(shapeModel.getFrame());\r\n            this.selectionPresenter = new _SelectionPresenter__WEBPACK_IMPORTED_MODULE_2__.SelectionPresenter(this, shapePresenter, selectionView);\r\n            selectionView.appendTo(this.canvasView.getElement());\r\n        });\r\n        shapeModel.getOnFrameChangedSignal().add(frame => shapeView.setFrame(frame));\r\n    }\r\n    getView() {\r\n        return this.canvasView;\r\n    }\r\n    getModel() {\r\n        return this.canvasModel;\r\n    }\r\n    removeSelection() {\r\n        if (this.selectionPresenter) {\r\n            this.selectionPresenter.remove();\r\n            this.selectionPresenter = null;\r\n        }\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/presenter/CanvasPresenter.ts?");

/***/ }),

/***/ "./src/presenter/EditorPresenter.ts":
/*!******************************************!*\
  !*** ./src/presenter/EditorPresenter.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EditorPresenter\": () => (/* binding */ EditorPresenter)\n/* harmony export */ });\n/* harmony import */ var _view_EditorView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/EditorView */ \"./src/view/EditorView.ts\");\n/* harmony import */ var _domain_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/Canvas */ \"./src/domain/Canvas.ts\");\n/* harmony import */ var _CanvasPresenter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CanvasPresenter */ \"./src/presenter/CanvasPresenter.ts\");\n/* harmony import */ var _ToolbarPresenter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolbarPresenter */ \"./src/presenter/ToolbarPresenter.ts\");\n/* harmony import */ var _common_CanvasSaver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/CanvasSaver */ \"./src/common/CanvasSaver.ts\");\n\r\n\r\n\r\n\r\n\r\nclass EditorPresenter {\r\n    constructor() {\r\n        this.setModel(new _domain_Canvas__WEBPACK_IMPORTED_MODULE_1__.Canvas());\r\n    }\r\n    setModel(canvas) {\r\n        this.model = canvas;\r\n        this.view = new _view_EditorView__WEBPACK_IMPORTED_MODULE_0__.EditorView();\r\n        this.canvasPresenter = new _CanvasPresenter__WEBPACK_IMPORTED_MODULE_2__.CanvasPresenter(this.model, this.view.getCanvas());\r\n        this.toolbarPresenter = new _ToolbarPresenter__WEBPACK_IMPORTED_MODULE_3__.ToolbarPresenter(this.model, this.view.getToolbar());\r\n        this.toolbarPresenter.getOnSaveSignal().add(() => this.saveCanvas());\r\n        this.toolbarPresenter.getOnUploadSignal().add(file => this.uploadCanvas(file));\r\n        this.view.appendTo(document.body);\r\n    }\r\n    saveCanvas() {\r\n        _common_CanvasSaver__WEBPACK_IMPORTED_MODULE_4__.CanvasSaver.save(this.model);\r\n    }\r\n    uploadCanvas(file) {\r\n        this.view.remove();\r\n        this.setModel(_common_CanvasSaver__WEBPACK_IMPORTED_MODULE_4__.CanvasSaver.upload(file));\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/presenter/EditorPresenter.ts?");

/***/ }),

/***/ "./src/presenter/SelectionPresenter.ts":
/*!*********************************************!*\
  !*** ./src/presenter/SelectionPresenter.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SelectionPresenter\": () => (/* binding */ SelectionPresenter)\n/* harmony export */ });\n/* harmony import */ var _view_WindowSignals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/WindowSignals */ \"./src/view/WindowSignals.ts\");\n\r\nclass SelectionPresenter {\r\n    constructor(canvasPresenter, selectedShapePresenter, view) {\r\n        this.windowView = new _view_WindowSignals__WEBPACK_IMPORTED_MODULE_0__.WindowSignals();\r\n        this.canvasPresenter = canvasPresenter;\r\n        this.selectedShapePresenter = selectedShapePresenter;\r\n        this.view = view;\r\n        this.windowView.onKeyDownSignal.add(event => this.onKeyDown(event));\r\n        selectedShapePresenter.getModel().getOnFrameChangedSignal().add(frame => view.setFrame(frame));\r\n        this.movePoint(this.view.getPoints()[0], (initialFrame, moveEvent) => ({\r\n            left: moveEvent.offsetX,\r\n            top: moveEvent.offsetY,\r\n            width: initialFrame.width + initialFrame.left - moveEvent.offsetX,\r\n            height: initialFrame.height + initialFrame.top - moveEvent.offsetY,\r\n        }));\r\n        this.movePoint(this.view.getPoints()[1], (initialFrame, moveEvent) => ({\r\n            left: initialFrame.left,\r\n            top: moveEvent.offsetY,\r\n            width: moveEvent.offsetX - initialFrame.left,\r\n            height: initialFrame.height + initialFrame.top - moveEvent.offsetY,\r\n        }));\r\n        this.movePoint(this.view.getPoints()[2], (initialFrame, moveEvent) => ({\r\n            left: moveEvent.offsetX,\r\n            top: initialFrame.top,\r\n            width: initialFrame.left + initialFrame.width - moveEvent.offsetX,\r\n            height: moveEvent.offsetY - initialFrame.top,\r\n        }));\r\n        this.movePoint(this.view.getPoints()[3], (initialFrame, moveEvent) => ({\r\n            left: initialFrame.left,\r\n            top: initialFrame.top,\r\n            width: moveEvent.offsetX - initialFrame.left,\r\n            height: moveEvent.offsetY - initialFrame.top,\r\n        }));\r\n    }\r\n    movePoint(point, getNewFrame) {\r\n        point.getOnMouseDownSignal().add(() => {\r\n            const initialFrame = this.selectedShapePresenter.getModel().getFrame();\r\n            const onMouseMove = (moveEvent) => this.selectedShapePresenter.getModel().setFrame(getNewFrame(initialFrame, moveEvent));\r\n            this.canvasPresenter.getView().getOnMouseMoveSignal().add(onMouseMove);\r\n            this.windowView.onMouseUpSignal.addCallOnce(() => this.canvasPresenter.getView().getOnMouseMoveSignal().remove(onMouseMove));\r\n        });\r\n    }\r\n    getView() {\r\n        return this.view;\r\n    }\r\n    onKeyDown(event) {\r\n        if (event.code === 'Delete')\r\n            this.canvasPresenter.getModel().deleteShape(this.selectedShapePresenter.getModel());\r\n    }\r\n    remove() {\r\n        this.windowView.onMouseMoveSignal.removeAll();\r\n        this.windowView.onKeyDownSignal.removeAll();\r\n        this.view.remove();\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/presenter/SelectionPresenter.ts?");

/***/ }),

/***/ "./src/presenter/ShapePresenter.ts":
/*!*****************************************!*\
  !*** ./src/presenter/ShapePresenter.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShapePresenter\": () => (/* binding */ ShapePresenter)\n/* harmony export */ });\n/* harmony import */ var _view_WindowSignals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/WindowSignals */ \"./src/view/WindowSignals.ts\");\n\r\nclass ShapePresenter {\r\n    constructor(canvasPresenter, model, view) {\r\n        this.windowView = new _view_WindowSignals__WEBPACK_IMPORTED_MODULE_0__.WindowSignals();\r\n        this.canvasPresenter = canvasPresenter;\r\n        this.model = model;\r\n        this.view = view;\r\n        model.getOnFrameChangedSignal().add(frame => view.setFrame(frame));\r\n        this.view.getOnMouseDownSignal().add(event => this.moveShape(event));\r\n    }\r\n    moveShape(event) {\r\n        const x = event.offsetX - this.model.getFrame().left;\r\n        const y = event.offsetY - this.model.getFrame().top;\r\n        const onMouseMove = (moveEvent) => {\r\n            this.model.setPosition({ left: moveEvent.offsetX - x, top: moveEvent.offsetY - y });\r\n        };\r\n        this.canvasPresenter.getView().getOnMouseMoveSignal().add(onMouseMove);\r\n        this.windowView.onMouseUpSignal.addCallOnce(() => this.canvasPresenter.getView().getOnMouseMoveSignal().remove(onMouseMove));\r\n    }\r\n    getView() {\r\n        return this.view;\r\n    }\r\n    getModel() {\r\n        return this.model;\r\n    }\r\n    remove() {\r\n        this.view.remove();\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/presenter/ShapePresenter.ts?");

/***/ }),

/***/ "./src/presenter/ToolbarPresenter.ts":
/*!*******************************************!*\
  !*** ./src/presenter/ToolbarPresenter.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ToolbarPresenter\": () => (/* binding */ ToolbarPresenter)\n/* harmony export */ });\n/* harmony import */ var _domain_Shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/Shape */ \"./src/domain/Shape.ts\");\n\r\nclass ToolbarPresenter {\r\n    constructor(model, view) {\r\n        this.model = model;\r\n        this.view = view;\r\n        this.view.getAddShapeSignal().add(type => this.addShape(type));\r\n    }\r\n    addShape(type) {\r\n        const shapeSize = 100;\r\n        const newShapeFrame = {\r\n            left: (this.model.getWidth() - shapeSize) / 2,\r\n            top: (this.model.getHeight() - shapeSize) / 2 - 50,\r\n            width: shapeSize,\r\n            height: shapeSize,\r\n        };\r\n        this.model.insertShape(new _domain_Shape__WEBPACK_IMPORTED_MODULE_0__.Shape(type, newShapeFrame, this.model.getWidth(), this.model.getHeight()));\r\n    }\r\n    getOnSaveSignal() {\r\n        return this.view.getOnSaveSignal();\r\n    }\r\n    getOnUploadSignal() {\r\n        return this.view.getOnUploadSignal();\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/presenter/ToolbarPresenter.ts?");

/***/ }),

/***/ "./src/view/ButtonView.ts":
/*!********************************!*\
  !*** ./src/view/ButtonView.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ButtonView\": () => (/* binding */ ButtonView)\n/* harmony export */ });\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ \"./src/view/View.ts\");\n\r\nclass ButtonView extends _View__WEBPACK_IMPORTED_MODULE_0__.View {\r\n    constructor(onClick, className = '', text = '') {\r\n        super(document.createElement('div'));\r\n        this.addRemovable(this.getOnClickSignal().add(() => onClick()));\r\n        this.element.classList.add('button');\r\n        if (className)\r\n            this.element.classList.add(className);\r\n        this.element.textContent = text;\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/view/ButtonView.ts?");

/***/ }),

/***/ "./src/view/CanvasView.ts":
/*!********************************!*\
  !*** ./src/view/CanvasView.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CanvasView\": () => (/* binding */ CanvasView)\n/* harmony export */ });\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ \"./src/view/View.ts\");\n\r\nclass CanvasView extends _View__WEBPACK_IMPORTED_MODULE_0__.View {\r\n    constructor(width, height) {\r\n        super(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));\r\n        this.element.classList.add('canvas');\r\n        this.setWidth(width);\r\n        this.setHeight(height);\r\n    }\r\n    addShape(shape) {\r\n        shape.appendTo(this.getElement());\r\n    }\r\n    setWidth(width) {\r\n        this.element.style.width = `${width}px`;\r\n    }\r\n    setHeight(height) {\r\n        this.element.style.height = `${height}px`;\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/view/CanvasView.ts?");

/***/ }),

/***/ "./src/view/EditorView.ts":
/*!********************************!*\
  !*** ./src/view/EditorView.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EditorView\": () => (/* binding */ EditorView)\n/* harmony export */ });\n/* harmony import */ var _CanvasView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasView */ \"./src/view/CanvasView.ts\");\n/* harmony import */ var _ToolbarView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolbarView */ \"./src/view/ToolbarView.ts\");\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./View */ \"./src/view/View.ts\");\n\r\n\r\n\r\nclass EditorView extends _View__WEBPACK_IMPORTED_MODULE_2__.View {\r\n    constructor() {\r\n        super(document.createElement('div'));\r\n        this.element.classList.add('editor');\r\n        this.canvas = new _CanvasView__WEBPACK_IMPORTED_MODULE_0__.CanvasView(800, 600);\r\n        this.toolbar = new _ToolbarView__WEBPACK_IMPORTED_MODULE_1__.ToolbarView();\r\n    }\r\n    getToolbar() {\r\n        return this.toolbar;\r\n    }\r\n    getCanvas() {\r\n        return this.canvas;\r\n    }\r\n    appendTo(parent) {\r\n        super.appendTo(parent);\r\n        this.toolbar.appendTo(this.getElement());\r\n        this.canvas.appendTo(this.getElement());\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/view/EditorView.ts?");

/***/ }),

/***/ "./src/view/EllipseView.ts":
/*!*********************************!*\
  !*** ./src/view/EllipseView.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EllipseView\": () => (/* binding */ EllipseView)\n/* harmony export */ });\n/* harmony import */ var _ShapeView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShapeView */ \"./src/view/ShapeView.ts\");\n\r\nclass EllipseView extends _ShapeView__WEBPACK_IMPORTED_MODULE_0__.ShapeView {\r\n    constructor(frame) {\r\n        super(document.createElementNS('http://www.w3.org/2000/svg', 'ellipse'));\r\n        this.element.setAttribute('fill', 'red');\r\n        this.setFrame(frame);\r\n    }\r\n    setFrame(frame) {\r\n        super.setFrame(frame);\r\n        this.element.setAttribute('cx', (frame.left + frame.width / 2).toString());\r\n        this.element.setAttribute('cy', (frame.top + frame.height / 2).toString());\r\n        this.element.setAttribute('rx', (frame.width / 2).toString());\r\n        this.element.setAttribute('ry', (frame.height / 2).toString());\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/view/EllipseView.ts?");

/***/ }),

/***/ "./src/view/RectangleView.ts":
/*!***********************************!*\
  !*** ./src/view/RectangleView.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RectangleView\": () => (/* binding */ RectangleView)\n/* harmony export */ });\n/* harmony import */ var _ShapeView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShapeView */ \"./src/view/ShapeView.ts\");\n\r\nclass RectangleView extends _ShapeView__WEBPACK_IMPORTED_MODULE_0__.ShapeView {\r\n    constructor(frame) {\r\n        super(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));\r\n        this.element.setAttribute('fill', 'green');\r\n        this.setFrame(frame);\r\n    }\r\n    setFrame(frame) {\r\n        super.setFrame(frame);\r\n        this.element.setAttribute('x', frame.left.toString());\r\n        this.element.setAttribute('y', frame.top.toString());\r\n        this.element.setAttribute('width', frame.width.toString());\r\n        this.element.setAttribute('height', frame.height.toString());\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/view/RectangleView.ts?");

/***/ }),

/***/ "./src/view/SelectionView.ts":
/*!***********************************!*\
  !*** ./src/view/SelectionView.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SelectionView\": () => (/* binding */ SelectionView)\n/* harmony export */ });\n/* harmony import */ var _RectangleView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RectangleView */ \"./src/view/RectangleView.ts\");\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View */ \"./src/view/View.ts\");\n\r\n\r\nclass SelectionView extends _View__WEBPACK_IMPORTED_MODULE_1__.View {\r\n    constructor(frame) {\r\n        super(document.createElementNS('http://www.w3.org/2000/svg', 'g'));\r\n        this.frame = { left: 0, top: 0, width: 0, height: 0 };\r\n        this.element.setAttribute('stroke', 'black');\r\n        this.element.setAttribute('fill', 'transparent');\r\n        const initialPointFrame = { left: 0, top: 0, width: SelectionView.pointSize, height: SelectionView.pointSize };\r\n        this.point1 = new _RectangleView__WEBPACK_IMPORTED_MODULE_0__.RectangleView(initialPointFrame);\r\n        this.point2 = new _RectangleView__WEBPACK_IMPORTED_MODULE_0__.RectangleView(initialPointFrame);\r\n        this.point3 = new _RectangleView__WEBPACK_IMPORTED_MODULE_0__.RectangleView(initialPointFrame);\r\n        this.point4 = new _RectangleView__WEBPACK_IMPORTED_MODULE_0__.RectangleView(initialPointFrame);\r\n        this.setFrame(frame);\r\n    }\r\n    setFrame(frame) {\r\n        this.frame = frame;\r\n        this.point1.setPosition(frame.left - SelectionView.halfPointSize, frame.top - SelectionView.halfPointSize);\r\n        this.point2.setPosition(frame.left + frame.width - SelectionView.halfPointSize, frame.top - SelectionView.halfPointSize);\r\n        this.point3.setPosition(frame.left - SelectionView.halfPointSize, frame.top + frame.height - SelectionView.halfPointSize);\r\n        this.point4.setPosition(frame.left + frame.width - SelectionView.halfPointSize, frame.top + frame.height - SelectionView.halfPointSize);\r\n    }\r\n    getPoints() {\r\n        return [this.point1, this.point2, this.point3, this.point4];\r\n    }\r\n    appendTo(parent) {\r\n        super.appendTo(parent);\r\n        parent.appendChild(this.getElement());\r\n        this.getPoints().forEach(point => point.appendTo(this.getElement()));\r\n    }\r\n}\r\nSelectionView.pointSize = 5;\r\nSelectionView.halfPointSize = SelectionView.pointSize / 2;\r\n\r\n\n\n//# sourceURL=webpack:///./src/view/SelectionView.ts?");

/***/ }),

/***/ "./src/view/ShapeView.ts":
/*!*******************************!*\
  !*** ./src/view/ShapeView.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShapeView\": () => (/* binding */ ShapeView)\n/* harmony export */ });\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ \"./src/view/View.ts\");\n\r\nclass ShapeView extends _View__WEBPACK_IMPORTED_MODULE_0__.View {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.frame = { left: 0, top: 0, width: 0, height: 0 };\r\n    }\r\n    setFrame(frame) {\r\n        this.frame = frame;\r\n    }\r\n    setPosition(left, top) {\r\n        this.setFrame(Object.assign(Object.assign({}, this.frame), { left,\r\n            top }));\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/view/ShapeView.ts?");

/***/ }),

/***/ "./src/view/ShapeViewFactory.ts":
/*!**************************************!*\
  !*** ./src/view/ShapeViewFactory.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ShapeViewFactory\": () => (/* binding */ ShapeViewFactory)\n/* harmony export */ });\n/* harmony import */ var _TriangleView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TriangleView */ \"./src/view/TriangleView.ts\");\n/* harmony import */ var _EllipseView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EllipseView */ \"./src/view/EllipseView.ts\");\n/* harmony import */ var _RectangleView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RectangleView */ \"./src/view/RectangleView.ts\");\n\r\n\r\n\r\nclass ShapeViewFactory {\r\n    static createShape(type, frame) {\r\n        switch (type) {\r\n            case 'triangle':\r\n                return new _TriangleView__WEBPACK_IMPORTED_MODULE_0__.TriangleView(frame);\r\n            case 'rectangle':\r\n                return new _RectangleView__WEBPACK_IMPORTED_MODULE_2__.RectangleView(frame);\r\n            case 'ellipse':\r\n                return new _EllipseView__WEBPACK_IMPORTED_MODULE_1__.EllipseView(frame);\r\n        }\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/view/ShapeViewFactory.ts?");

/***/ }),

/***/ "./src/view/ToolbarView.ts":
/*!*********************************!*\
  !*** ./src/view/ToolbarView.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ToolbarView\": () => (/* binding */ ToolbarView)\n/* harmony export */ });\n/* harmony import */ var _ButtonView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ButtonView */ \"./src/view/ButtonView.ts\");\n/* harmony import */ var _common_Signal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Signal */ \"./src/common/Signal.ts\");\n/* harmony import */ var _common_upload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/upload */ \"./src/common/upload.ts\");\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./View */ \"./src/view/View.ts\");\n\r\n\r\n\r\n\r\nclass ToolbarView extends _View__WEBPACK_IMPORTED_MODULE_3__.View {\r\n    constructor() {\r\n        super(document.createElement('div'));\r\n        this.addShapeSignal = new _common_Signal__WEBPACK_IMPORTED_MODULE_1__.Signal();\r\n        this.onSaveSignal = new _common_Signal__WEBPACK_IMPORTED_MODULE_1__.Signal();\r\n        this.onUploadSignal = new _common_Signal__WEBPACK_IMPORTED_MODULE_1__.Signal();\r\n        this.element.classList.add('toolbar');\r\n        this.addButton(() => this.onSaveSignal.dispatch(), '', 'Save');\r\n        this.addButton(() => {\r\n            (0,_common_upload__WEBPACK_IMPORTED_MODULE_2__.upload)(value => this.onUploadSignal.dispatch(value));\r\n        }, '', 'Upload');\r\n        this.addButton(() => this.addShapeSignal.dispatch('rectangle'), 'rectangle-button');\r\n        this.addButton(() => this.addShapeSignal.dispatch('triangle'), 'triangle-button');\r\n        this.addButton(() => this.addShapeSignal.dispatch('ellipse'), 'ellipse-button');\r\n    }\r\n    getAddShapeSignal() {\r\n        return this.addShapeSignal;\r\n    }\r\n    getOnSaveSignal() {\r\n        return this.onSaveSignal;\r\n    }\r\n    getOnUploadSignal() {\r\n        return this.onUploadSignal;\r\n    }\r\n    getElement() {\r\n        return this.element;\r\n    }\r\n    addButton(onClick, className, text = '') {\r\n        const button = new _ButtonView__WEBPACK_IMPORTED_MODULE_0__.ButtonView(onClick, className, text);\r\n        button.appendTo(this.getElement());\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/view/ToolbarView.ts?");

/***/ }),

/***/ "./src/view/TriangleView.ts":
/*!**********************************!*\
  !*** ./src/view/TriangleView.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TriangleView\": () => (/* binding */ TriangleView)\n/* harmony export */ });\n/* harmony import */ var _ShapeView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShapeView */ \"./src/view/ShapeView.ts\");\n\r\nclass TriangleView extends _ShapeView__WEBPACK_IMPORTED_MODULE_0__.ShapeView {\r\n    constructor(frame) {\r\n        super(document.createElementNS('http://www.w3.org/2000/svg', 'polygon'));\r\n        this.element.setAttribute('fill', 'blue');\r\n        this.setFrame(frame);\r\n    }\r\n    setFrame(frame) {\r\n        super.setFrame(frame);\r\n        const { left, top, height, width } = frame;\r\n        const x1 = left + width / 2;\r\n        const y1 = top;\r\n        const x2 = left;\r\n        const y2 = top + height;\r\n        const x3 = left + width;\r\n        const y3 = top + height;\r\n        this.element.setAttribute('points', `${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`);\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/view/TriangleView.ts?");

/***/ }),

/***/ "./src/view/View.ts":
/*!**************************!*\
  !*** ./src/view/View.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"View\": () => (/* binding */ View)\n/* harmony export */ });\n/* harmony import */ var _common_Signal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Signal */ \"./src/common/Signal.ts\");\n/* harmony import */ var _createFnRemovableSubscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createFnRemovableSubscribe */ \"./src/view/createFnRemovableSubscribe.ts\");\n\r\n\r\nclass View {\r\n    constructor(element) {\r\n        this.removables = [];\r\n        this.onClickSignal = new _common_Signal__WEBPACK_IMPORTED_MODULE_0__.Signal();\r\n        this.onMouseDownSignal = new _common_Signal__WEBPACK_IMPORTED_MODULE_0__.Signal();\r\n        this.onMouseMoveSignal = new _common_Signal__WEBPACK_IMPORTED_MODULE_0__.Signal();\r\n        this.element = element;\r\n        this.initSignals();\r\n    }\r\n    initSignals() {\r\n        this.addRemovable(() => this.onClickSignal.removeAll());\r\n        this.addRemovable(() => this.onMouseDownSignal.removeAll());\r\n        this.addRemovable(() => this.onMouseMoveSignal.removeAll());\r\n        this.addRemovableListener(this.element, 'click', (event) => {\r\n            if (event.target === this.element)\r\n                this.onClickSignal.dispatch(event);\r\n        });\r\n        this.addRemovableListener(this.element, 'mousedown', (event) => {\r\n            if (event.target === this.element)\r\n                this.onMouseDownSignal.dispatch(event);\r\n        });\r\n        this.addRemovableListener(this.element, 'mousemove', (event) => {\r\n            this.onMouseMoveSignal.dispatch(event);\r\n        });\r\n    }\r\n    addRemovable(removable) {\r\n        this.removables.push(removable);\r\n    }\r\n    addRemovableListener(element, type, fn) {\r\n        this.addRemovable((0,_createFnRemovableSubscribe__WEBPACK_IMPORTED_MODULE_1__.createFnRemovableSubscribe)(element, type, fn));\r\n    }\r\n    getOnClickSignal() {\r\n        return this.onClickSignal;\r\n    }\r\n    getOnMouseDownSignal() {\r\n        return this.onMouseDownSignal;\r\n    }\r\n    getOnMouseMoveSignal() {\r\n        return this.onMouseMoveSignal;\r\n    }\r\n    getElement() {\r\n        return this.element;\r\n    }\r\n    remove() {\r\n        this.removables.forEach(remove => remove());\r\n        this.getElement().remove();\r\n    }\r\n    appendTo(parent) {\r\n        parent.appendChild(this.getElement());\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/view/View.ts?");

/***/ }),

/***/ "./src/view/WindowSignals.ts":
/*!***********************************!*\
  !*** ./src/view/WindowSignals.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WindowSignals\": () => (/* binding */ WindowSignals)\n/* harmony export */ });\n/* harmony import */ var _common_Signal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Signal */ \"./src/common/Signal.ts\");\n\r\nclass WindowSignals {\r\n    constructor() {\r\n        this.onMouseMoveSignal = new _common_Signal__WEBPACK_IMPORTED_MODULE_0__.Signal();\r\n        this.onMouseUpSignal = new _common_Signal__WEBPACK_IMPORTED_MODULE_0__.Signal();\r\n        this.onKeyDownSignal = new _common_Signal__WEBPACK_IMPORTED_MODULE_0__.Signal();\r\n        window.addEventListener('mousemove', event => this.onMouseMoveSignal.dispatch(event));\r\n        window.addEventListener('keydown', event => this.onKeyDownSignal.dispatch(event));\r\n        window.addEventListener('mouseup', event => this.onMouseUpSignal.dispatch(event));\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/view/WindowSignals.ts?");

/***/ }),

/***/ "./src/view/createFnRemovableSubscribe.ts":
/*!************************************************!*\
  !*** ./src/view/createFnRemovableSubscribe.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createFnRemovableSubscribe\": () => (/* binding */ createFnRemovableSubscribe)\n/* harmony export */ });\nfunction createFnRemovableSubscribe(element, type, fn) {\r\n    element.addEventListener(type, fn);\r\n    return () => element.removeEventListener(type, fn);\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/view/createFnRemovableSubscribe.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;