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

/***/ "./src/gameRenderer.ts":
/*!*****************************!*\
  !*** ./src/gameRenderer.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderBall\": () => (/* binding */ renderBall),\n/* harmony export */   \"renderDefaultBalls\": () => (/* binding */ renderDefaultBalls),\n/* harmony export */   \"renderTileset\": () => (/* binding */ renderTileset)\n/* harmony export */ });\n/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./misc */ \"./src/misc.ts\");\n\r\nfunction renderTileset(width, height) {\r\n    var tab = [];\r\n    for (var x = 0; x < height; x++) {\r\n        tab[x] = [];\r\n        for (var y = 0; y < width; y++) {\r\n            tab[x][y] = 0;\r\n        }\r\n    }\r\n    return tab;\r\n}\r\nfunction renderDefaultBalls(tileset, settings) {\r\n    for (var i = 0; i < settings.defaultObstacles; i++) {\r\n        var cords = [(0,_misc__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(settings.height), (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(settings.width)];\r\n        while (tileset[cords[0]][cords[1]] == settings.defaultObstacleMark) {\r\n            cords = [(0,_misc__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(settings.height), (0,_misc__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(settings.width)];\r\n        }\r\n        tileset[cords[0]][cords[1]] = settings.defaultObstacleMark;\r\n    }\r\n}\r\nfunction renderBall(color) {\r\n    var ball = document.createElement('div');\r\n    ball.className = 'ball';\r\n    ball.style.background = color;\r\n    return ball;\r\n}\r\n\n\n//# sourceURL=webpack://kulki-game/./src/gameRenderer.ts?");

/***/ }),

/***/ "./src/misc.ts":
/*!*********************!*\
  !*** ./src/misc.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getRandomInt\": () => (/* binding */ getRandomInt)\n/* harmony export */ });\nfunction getRandomInt(max) {\r\n    return Math.floor(Math.random() * max);\r\n}\r\n\n\n//# sourceURL=webpack://kulki-game/./src/misc.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/gameRenderer.ts");
/******/ 	
/******/ })()
;