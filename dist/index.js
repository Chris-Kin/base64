module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: encode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_encode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/encode */ \"./src/encode.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"encode\", function() { return _src_encode__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  baseChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'\n});\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/encode.js":
/*!***********************!*\
  !*** ./src/encode.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\n\n\nconst {\n  baseChars\n} = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\nconst {\n  splitByLength\n} = _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\nfunction transfer(str) {\n  // 原始字符对应的二进制\n  var binarys = '';\n  [...str].forEach(el => {\n    // 判断中文字符，将一个Unicode编码（js默认编码）的中文转为UTF8的字节码\n    if (/[^\\x00-\\xff]/ig.test(el)) {\n      var hanzi = parseInt(encodeURI(el).replace(/%/g, ''), 16).toString(2);\n      binarys += hanzi;\n      return;\n    }\n    binarys += el.charCodeAt().toString(2).padStart(8, 0);\n  });\n\n  // 将二进制每六位重组，并映射到baseChars的数组\n  var newGroup = splitByLength(binarys, 6).map(el => {\n    if (el.length !== 6) {\n      el = el.padEnd(6, 0);\n    }\n    var index = parseInt(el, 2);\n    return baseChars[index];\n  });\n\n  // 补充等号\n  var padCount = 4 - newGroup.length % 4;\n  if (padCount !== 4) {\n    newGroup.push(...new Array(padCount).fill('='));\n  }\n\n  return newGroup.join('');\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (transfer);\n\n//# sourceURL=webpack:///./src/encode.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// 工具类文件\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  // 按固定长度切割字符串，返回数组\n  splitByLength(str, n) {\n    var arrLength = Math.ceil(str.length / n);\n    var ans = [];\n    for (var i = 0; i < arrLength; i++) {\n      ans.push(str.slice(n * i, n * (i + 1)));\n    }\n    return ans;\n  }\n});\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });