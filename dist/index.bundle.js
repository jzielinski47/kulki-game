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

/***/ "./src/Sphere.ts":
/*!***********************!*\
  !*** ./src/Sphere.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Sphere\": () => (/* binding */ Sphere)\n/* harmony export */ });\nclass Sphere {\r\n    constructor(color) {\r\n        this.render = () => {\r\n            this.sphere = document.createElement('div');\r\n            this.sphere.className = 'sphere';\r\n            this.sphere.style.background = this.color;\r\n            return this.sphere;\r\n        };\r\n        this.color = color;\r\n        this.sphere;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://bruce-lee/./src/Sphere.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ \"./src/renderer.ts\");\n/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setup */ \"./src/setup.ts\");\n\r\n\r\nconst app = document.querySelector('#app');\r\nconst settings = {\r\n    width: 9,\r\n    height: 9,\r\n    sphereAmount: 3,\r\n    defaultSeeker: 'S',\r\n    defaultWaypoint: 'W',\r\n    defaultSphere: '#',\r\n};\r\n// initial render\r\nconst tileset = (0,_renderer__WEBPACK_IMPORTED_MODULE_0__.renderTileset)(settings.width, settings.height);\r\n(0,_renderer__WEBPACK_IMPORTED_MODULE_0__.renderDefaultSpheres)(tileset, settings);\r\napp.append((0,_renderer__WEBPACK_IMPORTED_MODULE_0__.display)(tileset, settings, _setup__WEBPACK_IMPORTED_MODULE_1__.colors));\r\nconsole.table(tileset);\r\n\n\n//# sourceURL=webpack://bruce-lee/./src/main.ts?");

/***/ }),

/***/ "./src/misc.ts":
/*!*********************!*\
  !*** ./src/misc.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkAll4Neighbours\": () => (/* binding */ checkAll4Neighbours),\n/* harmony export */   \"clearNums\": () => (/* binding */ clearNums),\n/* harmony export */   \"getCords\": () => (/* binding */ getCords),\n/* harmony export */   \"getRandomInt\": () => (/* binding */ getRandomInt),\n/* harmony export */   \"removeClassName\": () => (/* binding */ removeClassName),\n/* harmony export */   \"removeFromArray\": () => (/* binding */ removeFromArray),\n/* harmony export */   \"resetElement\": () => (/* binding */ resetElement),\n/* harmony export */   \"returnEventListeners\": () => (/* binding */ returnEventListeners)\n/* harmony export */ });\n/* harmony import */ var _pathfinderScripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pathfinderScripts */ \"./src/pathfinderScripts.ts\");\n\r\nfunction getRandomInt(max) {\r\n    return Math.floor(Math.random() * max);\r\n}\r\nfunction checkAll4Neighbours(x, y, tileset, settings) {\r\n    let survey = [];\r\n    function chcekSingleNeighbour(offsetX, offsetY) {\r\n        var _a;\r\n        if (((_a = tileset[x + offsetX]) === null || _a === void 0 ? void 0 : _a[y + offsetY]) !== 0)\r\n            return false;\r\n    }\r\n    survey.push(chcekSingleNeighbour(-1, 0));\r\n    survey.push(chcekSingleNeighbour(1, 0));\r\n    survey.push(chcekSingleNeighbour(0, -1));\r\n    survey.push(chcekSingleNeighbour(0, 1));\r\n    return !(survey.every(direction => direction === false));\r\n}\r\nfunction removeFromArray(name, arr, moved, settings) {\r\n    for (let x = 0; x < arr.length; x++) {\r\n        for (let y = 0; y < arr[x].length; y++) {\r\n            if (arr[x][y] == name) {\r\n                switch (name) {\r\n                    case settings.defaultSeeker:\r\n                        arr[x][y] = (moved) ? 0 : settings.defaultSphere;\r\n                        break;\r\n                    default:\r\n                        arr[x][y] = 0;\r\n                        document.querySelector(x + '-' + y).innerHTML = '0';\r\n                        break;\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\nfunction removeClassName(name) {\r\n    document.querySelectorAll('.' + name).forEach(seeker => seeker.classList.remove(name.toString()));\r\n}\r\nfunction getCords(id) {\r\n    return id.split('-').map(item => parseInt(item));\r\n}\r\nfunction clearNums(tileset, settings) {\r\n    for (let x = 0; x < tileset.length; x++) {\r\n        for (let y = 0; y < tileset[x].length; y++) {\r\n            if (tileset[x][y] != settings.defaultSeeker && tileset[x][y] != settings.defaultWaypoint && tileset[x][y] != settings.defaultSphere) {\r\n                tileset[x][y] = 0;\r\n            }\r\n        }\r\n    }\r\n}\r\nfunction resetElement(element) {\r\n    const factoryDefault = element.cloneNode(true);\r\n    element.replaceWith(factoryDefault);\r\n}\r\nfunction returnEventListeners(tileset, settings) {\r\n    for (let x = 0; x < tileset.length; x++) {\r\n        for (let y = 0; y < tileset[x].length; y++) {\r\n            if (tileset[x][y] == 0) {\r\n                const origin = document.getElementById(x + '-' + y);\r\n                origin.addEventListener('mouseenter', e => (0,_pathfinderScripts__WEBPACK_IMPORTED_MODULE_0__.tileHoverHandler)(e, tileset, settings));\r\n                origin.addEventListener('mouseleave', _pathfinderScripts__WEBPACK_IMPORTED_MODULE_0__.tileResetHandler);\r\n                origin.addEventListener('click', e => (0,_pathfinderScripts__WEBPACK_IMPORTED_MODULE_0__.tileClickHandler)(e, tileset, settings));\r\n            }\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://bruce-lee/./src/misc.ts?");

/***/ }),

/***/ "./src/objectRenderer.ts":
/*!*******************************!*\
  !*** ./src/objectRenderer.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderSphere\": () => (/* binding */ renderSphere)\n/* harmony export */ });\n/* harmony import */ var _pathfinderScripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pathfinderScripts */ \"./src/pathfinderScripts.ts\");\n/* harmony import */ var _Sphere__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sphere */ \"./src/Sphere.ts\");\n\r\n\r\nfunction renderSphere(x, y, color, tileset, settings) {\r\n    const model = new _Sphere__WEBPACK_IMPORTED_MODULE_1__.Sphere(color);\r\n    const sphere = model.render();\r\n    sphere.addEventListener('click', e => (0,_pathfinderScripts__WEBPACK_IMPORTED_MODULE_0__.sphereClickHandler)(e, x, y, tileset, settings));\r\n    return sphere;\r\n}\r\n\n\n//# sourceURL=webpack://bruce-lee/./src/objectRenderer.ts?");

/***/ }),

/***/ "./src/pathfinderScripts.ts":
/*!**********************************!*\
  !*** ./src/pathfinderScripts.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"appendToTileset\": () => (/* binding */ appendToTileset),\n/* harmony export */   \"moveSphere\": () => (/* binding */ moveSphere),\n/* harmony export */   \"renderUpcoming\": () => (/* binding */ renderUpcoming),\n/* harmony export */   \"resetPathfinder\": () => (/* binding */ resetPathfinder),\n/* harmony export */   \"runSearchEngine\": () => (/* binding */ runSearchEngine),\n/* harmony export */   \"sphereClickHandler\": () => (/* binding */ sphereClickHandler),\n/* harmony export */   \"tileClickHandler\": () => (/* binding */ tileClickHandler),\n/* harmony export */   \"tileHoverHandler\": () => (/* binding */ tileHoverHandler),\n/* harmony export */   \"tileResetHandler\": () => (/* binding */ tileResetHandler)\n/* harmony export */ });\n/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setup */ \"./src/setup.ts\");\n/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./misc */ \"./src/misc.ts\");\n/* harmony import */ var _objectRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objectRenderer */ \"./src/objectRenderer.ts\");\n/* harmony import */ var _Sphere__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Sphere */ \"./src/Sphere.ts\");\n\r\n\r\n\r\n\r\nlet localSphereMemory = [];\r\nrenderUpcoming(3, _setup__WEBPACK_IMPORTED_MODULE_0__.colors);\r\nlet seeker;\r\nlet seekerColor;\r\nlet waypoint;\r\nlet progressStatus = 0;\r\nlet inMotion = false;\r\nlet movePossible;\r\nfunction sphereClickHandler(e, x, y, tileset, settings) {\r\n    const target = e.currentTarget;\r\n    (0,_misc__WEBPACK_IMPORTED_MODULE_1__.clearNums)(tileset, settings);\r\n    if (progressStatus < 2) {\r\n        if (!target.classList.contains('seeker')) {\r\n            if ((0,_misc__WEBPACK_IMPORTED_MODULE_1__.checkAll4Neighbours)(x, y, tileset, settings)) {\r\n                (0,_misc__WEBPACK_IMPORTED_MODULE_1__.removeFromArray)(settings.defaultSeeker, tileset, false, settings);\r\n                (0,_misc__WEBPACK_IMPORTED_MODULE_1__.removeClassName)('seeker');\r\n                seeker = [x, y];\r\n                target.classList.add('seeker');\r\n                tileset[x][y] = settings.defaultSeeker;\r\n                seekerColor = target.style.background;\r\n                // runSearchEngine\r\n                runSearchEngine(seeker, 0, tileset, settings);\r\n                progressStatus = 1;\r\n            }\r\n        }\r\n        else {\r\n            (0,_misc__WEBPACK_IMPORTED_MODULE_1__.removeFromArray)(settings.defaultSeeker, tileset, false, settings);\r\n            (0,_misc__WEBPACK_IMPORTED_MODULE_1__.removeClassName)('seeker');\r\n            seeker = [];\r\n            progressStatus = 0;\r\n        }\r\n    }\r\n    console.table(tileset);\r\n}\r\nfunction runSearchEngine(seeker, round, tileset, settings) {\r\n    function inspectSingleTile(offsetX, offsetY) {\r\n        var _a;\r\n        let expression = (_a = tileset[seeker[0] + offsetX]) === null || _a === void 0 ? void 0 : _a[seeker[1] + offsetY];\r\n        if (expression === 0) {\r\n            expression = expression + round;\r\n            tileset[seeker[0] + offsetX][seeker[1] + offsetY] = expression;\r\n            // display number\r\n            // let destination = document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`)\r\n            // destination.innerHTML = expression.toString()\r\n            setTimeout(() => runSearchEngine([seeker[0] + offsetX, seeker[1] + offsetY], round, tileset, settings), 1);\r\n        }\r\n    }\r\n    round++;\r\n    inspectSingleTile(-1, 0);\r\n    inspectSingleTile(1, 0);\r\n    inspectSingleTile(0, -1);\r\n    inspectSingleTile(0, 1);\r\n}\r\nfunction tileHoverHandler(e, tileset, settings) {\r\n    const target = e.currentTarget;\r\n    if (progressStatus == 1) {\r\n        waypoint = (0,_misc__WEBPACK_IMPORTED_MODULE_1__.getCords)(target.id);\r\n        if (seeker != waypoint)\r\n            target.classList.add('waypoint');\r\n        findBestRoute(waypoint, tileset[waypoint[0]][waypoint[1]], tileset, settings);\r\n    }\r\n}\r\nfunction tileResetHandler() {\r\n    if (!inMotion) {\r\n        (0,_misc__WEBPACK_IMPORTED_MODULE_1__.removeClassName)('path');\r\n        (0,_misc__WEBPACK_IMPORTED_MODULE_1__.removeClassName)('waypoint');\r\n    }\r\n}\r\nfunction tileClickHandler(e, tileset, settings) {\r\n    const target = e.currentTarget;\r\n    if (progressStatus == 1) {\r\n        waypoint = (0,_misc__WEBPACK_IMPORTED_MODULE_1__.getCords)(target.id);\r\n        if (seeker != waypoint)\r\n            target.classList.add('waypoint');\r\n        if (movePossible) {\r\n            moveSphere(seeker, waypoint, tileset, settings);\r\n            progressStatus = 2;\r\n        }\r\n    }\r\n}\r\nfunction findBestRoute(waypoint, majorDist, tileset, settings) {\r\n    let route = [majorDist];\r\n    function findAvailableTile(wX, wY, offsetX, offsetY, dist) {\r\n        var _a;\r\n        let expression = (_a = tileset[wX + offsetX]) === null || _a === void 0 ? void 0 : _a[wY + offsetY];\r\n        if (!route.includes(expression)) {\r\n            if (expression === dist - 1) {\r\n                route.push(expression);\r\n                document.getElementById(`${wX + offsetX}-${wY + offsetY}`).classList.add('path');\r\n                // console.log(route)\r\n                findAvailableTile(wX + offsetX, wY + offsetY, -1, 0, dist - 1);\r\n                findAvailableTile(wX + offsetX, wY + offsetY, 1, 0, dist - 1);\r\n                findAvailableTile(wX + offsetX, wY + offsetY, 0, -1, dist - 1);\r\n                findAvailableTile(wX + offsetX, wY + offsetY, 0, 1, dist - 1);\r\n            }\r\n        }\r\n    }\r\n    findAvailableTile(waypoint[0], waypoint[1], -1, 0, majorDist);\r\n    findAvailableTile(waypoint[0], waypoint[1], 1, 0, majorDist);\r\n    findAvailableTile(waypoint[0], waypoint[1], 0, -1, majorDist);\r\n    findAvailableTile(waypoint[0], waypoint[1], 0, 1, majorDist);\r\n    movePossible = (majorDist === route.length);\r\n}\r\nfunction moveSphere(seeker, waypoint, tileset, settings) {\r\n    const origin = document.getElementById(`${seeker[0]}-${seeker[1]}`);\r\n    let destination = document.getElementById(`${waypoint[0]}-${waypoint[1]}`);\r\n    destination.replaceWith(destination.cloneNode(false));\r\n    destination = document.getElementById(`${waypoint[0]}-${waypoint[1]}`);\r\n    (0,_misc__WEBPACK_IMPORTED_MODULE_1__.removeFromArray)(settings.defaultSeeker, tileset, true, settings);\r\n    tileset[waypoint[0]][waypoint[1]] = settings.defaultSphere;\r\n    inMotion = true;\r\n    origin.innerHTML = '';\r\n    destination.innerHTML = '';\r\n    (0,_misc__WEBPACK_IMPORTED_MODULE_1__.removeClassName)('waypoint');\r\n    destination.append((0,_objectRenderer__WEBPACK_IMPORTED_MODULE_2__.renderSphere)(waypoint[0], waypoint[1], seekerColor, tileset, settings));\r\n    console.table(tileset);\r\n    setTimeout(() => {\r\n        resetPathfinder(tileset, settings);\r\n        renderUpcoming(3, _setup__WEBPACK_IMPORTED_MODULE_0__.colors);\r\n    }, 1000);\r\n}\r\nfunction resetPathfinder(tileset, settings) {\r\n    inMotion = false;\r\n    progressStatus = 0;\r\n    (0,_misc__WEBPACK_IMPORTED_MODULE_1__.removeClassName)('seeker');\r\n    (0,_misc__WEBPACK_IMPORTED_MODULE_1__.removeClassName)('path');\r\n    (0,_misc__WEBPACK_IMPORTED_MODULE_1__.removeFromArray)(settings.defaultSeeker, tileset, true, settings);\r\n    (0,_misc__WEBPACK_IMPORTED_MODULE_1__.removeFromArray)(settings.defaultWaypoint, tileset, true, settings);\r\n    document.querySelector('#upcoming').innerHTML = '';\r\n    appendToTileset(tileset, settings);\r\n    localSphereMemory = [];\r\n    (0,_misc__WEBPACK_IMPORTED_MODULE_1__.clearNums)(tileset, settings);\r\n    (0,_misc__WEBPACK_IMPORTED_MODULE_1__.returnEventListeners)(tileset, settings);\r\n}\r\nfunction renderUpcoming(amount, colors) {\r\n    const upcomingSpheres = document.querySelector('#upcoming');\r\n    for (let i = 0; i < amount; i++) {\r\n        const color = colors[Math.floor(Math.random() * colors.length)];\r\n        const model = new _Sphere__WEBPACK_IMPORTED_MODULE_3__.Sphere(color);\r\n        const sphere = model.render();\r\n        sphere.classList.add('default');\r\n        localSphereMemory.push(color);\r\n        upcomingSpheres.append(sphere);\r\n    }\r\n    console.log(localSphereMemory);\r\n}\r\nfunction appendToTileset(tileset, settings) {\r\n    for (let i = 0; i < localSphereMemory.length; i++) {\r\n        let cords = [(0,_misc__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(settings.height), (0,_misc__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(settings.width)];\r\n        // console.warn('d')\r\n        while (tileset[cords[0]][cords[1]] == settings.defaultSphere) {\r\n            cords = [(0,_misc__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(settings.height), (0,_misc__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(settings.width)];\r\n        }\r\n        tileset[cords[0]][cords[1]] = settings.defaultSphere;\r\n        const destination = document.getElementById(cords[0] + '-' + cords[1]);\r\n        destination.replaceWith(destination.cloneNode(false));\r\n        destination.innerHTML = '';\r\n        document.getElementById(cords[0] + '-' + cords[1]).append((0,_objectRenderer__WEBPACK_IMPORTED_MODULE_2__.renderSphere)(cords[0], cords[1], localSphereMemory[i], tileset, settings));\r\n        // console.table(tileset)\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://bruce-lee/./src/pathfinderScripts.ts?");

/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"display\": () => (/* binding */ display),\n/* harmony export */   \"renderDefaultSpheres\": () => (/* binding */ renderDefaultSpheres),\n/* harmony export */   \"renderTileset\": () => (/* binding */ renderTileset)\n/* harmony export */ });\n/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ \"./src/misc.ts\");\n/* harmony import */ var _objectRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objectRenderer */ \"./src/objectRenderer.ts\");\n/* harmony import */ var _pathfinderScripts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pathfinderScripts */ \"./src/pathfinderScripts.ts\");\n\r\n\r\n\r\nfunction renderTileset(width, height) {\r\n    let tab = [];\r\n    for (let x = 0; x < height; x++) {\r\n        tab[x] = [];\r\n        for (let y = 0; y < width; y++) {\r\n            tab[x][y] = 0;\r\n        }\r\n    }\r\n    return tab;\r\n}\r\nfunction renderDefaultSpheres(tileset, settings) {\r\n    for (let i = 0; i < settings.sphereAmount; i++) {\r\n        let cords = [(0,_misc__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(settings.height), (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(settings.width)];\r\n        while (tileset[cords[0]][cords[1]] == settings.defaultSphere) {\r\n            cords = [(0,_misc__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(settings.height), (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(settings.width)];\r\n        }\r\n        tileset[cords[0]][cords[1]] = settings.defaultSphere;\r\n    }\r\n}\r\nfunction display(tileset, settings, colors) {\r\n    const container = document.createElement('div');\r\n    container.className = 'tileset';\r\n    for (let x = 0; x < settings.height; x++) {\r\n        for (let y = 0; y < settings.width; y++) {\r\n            let tile = document.createElement('div');\r\n            tile.id = x + '-' + y;\r\n            tile.classList.add('tile');\r\n            // the bug in previous version was the fact that the event listener was attached to the tile and not to the sphere\r\n            // so when the user moved the sphere the event listener was still on the previous tile\r\n            if (tileset[x][y] == settings.defaultSphere) {\r\n                tile.append((0,_objectRenderer__WEBPACK_IMPORTED_MODULE_1__.renderSphere)(x, y, colors[Math.floor(Math.random() * colors.length)], tileset, settings));\r\n            }\r\n            else {\r\n                // tile.innerHTML = tileset[x][y].toString()\r\n                tile.addEventListener('mouseenter', e => (0,_pathfinderScripts__WEBPACK_IMPORTED_MODULE_2__.tileHoverHandler)(e, tileset, settings));\r\n                tile.addEventListener('mouseleave', _pathfinderScripts__WEBPACK_IMPORTED_MODULE_2__.tileResetHandler);\r\n                tile.addEventListener('click', e => (0,_pathfinderScripts__WEBPACK_IMPORTED_MODULE_2__.tileClickHandler)(e, tileset, settings));\r\n            }\r\n            if (x != 0 && y == 0)\r\n                tile.style.clear = 'both';\r\n            container.append(tile);\r\n        }\r\n    }\r\n    return container;\r\n}\r\n\n\n//# sourceURL=webpack://bruce-lee/./src/renderer.ts?");

/***/ }),

/***/ "./src/setup.ts":
/*!**********************!*\
  !*** ./src/setup.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"colors\": () => (/* binding */ colors)\n/* harmony export */ });\nconst colors = ['#FA6B5D', '#F79C53', '#EFC95E', '#76BD6D', '#59AAA4', '#9F82C4', '#C482BD'];\r\n\n\n//# sourceURL=webpack://bruce-lee/./src/setup.ts?");

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