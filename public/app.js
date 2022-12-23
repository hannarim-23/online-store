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

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://online-store/./src/style.css?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mainContainer\": () => (/* binding */ mainContainer)\n/* harmony export */ });\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _pages_product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/product */ \"./src/pages/product.ts\");\n/* harmony import */ var _pages_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/main */ \"./src/pages/main.ts\");\n/* harmony import */ var _pages_cart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/cart */ \"./src/pages/cart.ts\");\n/* harmony import */ var _pages_404__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/404 */ \"./src/pages/404.ts\");\n\r\n\r\n\r\n\r\n\r\nlet mainContainer = document.querySelector('#main-container'); /*const*/\r\nlet links = document.querySelectorAll('[data-link]'); /**/\r\nfunction router(event) {\r\n    event.preventDefault();\r\n    if (event.target instanceof HTMLLinkElement) {\r\n        let href = event.target.href;\r\n        console.log('href=', href);\r\n        history.pushState({}, '', href);\r\n    }\r\n    let route = routes.find(route => route.path == window.location.pathname);\r\n    if (route) {\r\n        let html = (route.template)();\r\n    }\r\n}\r\nconst routes = [\r\n    {\r\n        path: '404',\r\n        template: _pages_404__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\r\n    },\r\n    {\r\n        path: '/',\r\n        template: _pages_main__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\r\n    },\r\n    {\r\n        path: '/cart',\r\n        template: _pages_cart__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\r\n    },\r\n    {\r\n        path: '/product1',\r\n        template: _pages_product__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\r\n    },\r\n];\r\nwindow.addEventListener('popstate', function () {\r\n    let route = routes.find(route => route.path == window.location.pathname);\r\n    if (route) {\r\n        let html = (route.template)();\r\n    }\r\n});\r\nwindow.addEventListener('DOMContentLoaded', function () {\r\n    let route = routes.find(route => route.path == window.location.pathname); //защита от обновлений\r\n    if (route) {\r\n        let html = (route.template)();\r\n    }\r\n});\r\n/*window.onpopstate = function (event) {\r\n    var content = \"\";\r\n    if(event.state) {\r\n      content = event.state.plate;\r\n    }\r\n    changeMain(content);\r\n  }*/\r\n\n\n//# sourceURL=webpack://online-store/./src/index.ts?");

/***/ }),

/***/ "./src/pages/404.ts":
/*!**************************!*\
  !*** ./src/pages/404.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ error)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./src/index.ts\");\n\r\nfunction error() {\r\n    if (_index__WEBPACK_IMPORTED_MODULE_0__.mainContainer) {\r\n        _index__WEBPACK_IMPORTED_MODULE_0__.mainContainer.innerHTML = \"\";\r\n        let p = document.createElement('p');\r\n        p.innerText = 'This is an ERRor!!404';\r\n        return _index__WEBPACK_IMPORTED_MODULE_0__.mainContainer.append(p);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://online-store/./src/pages/404.ts?");

/***/ }),

/***/ "./src/pages/cart.ts":
/*!***************************!*\
  !*** ./src/pages/cart.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ cart)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./src/index.ts\");\n\r\nfunction cart() {\r\n    if (_index__WEBPACK_IMPORTED_MODULE_0__.mainContainer) {\r\n        _index__WEBPACK_IMPORTED_MODULE_0__.mainContainer.innerHTML = \"\";\r\n        let p = document.createElement('p');\r\n        p.innerText = 'This is a cart';\r\n        return _index__WEBPACK_IMPORTED_MODULE_0__.mainContainer.append(p);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://online-store/./src/pages/cart.ts?");

/***/ }),

/***/ "./src/pages/main.ts":
/*!***************************!*\
  !*** ./src/pages/main.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./src/index.ts\");\n\r\nfunction main() {\r\n    if (_index__WEBPACK_IMPORTED_MODULE_0__.mainContainer) {\r\n        _index__WEBPACK_IMPORTED_MODULE_0__.mainContainer.innerHTML = \"\";\r\n        let p = document.createElement('p');\r\n        p.innerText = 'This is a main';\r\n        return _index__WEBPACK_IMPORTED_MODULE_0__.mainContainer.append(p);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://online-store/./src/pages/main.ts?");

/***/ }),

/***/ "./src/pages/product.ts":
/*!******************************!*\
  !*** ./src/pages/product.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ product)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./src/index.ts\");\n\r\nfunction product() {\r\n    if (_index__WEBPACK_IMPORTED_MODULE_0__.mainContainer) {\r\n        _index__WEBPACK_IMPORTED_MODULE_0__.mainContainer.innerHTML = \"\";\r\n        let p = document.createElement('p');\r\n        p.innerText = 'This is a Products';\r\n        return _index__WEBPACK_IMPORTED_MODULE_0__.mainContainer.append(p);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://online-store/./src/pages/product.ts?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;