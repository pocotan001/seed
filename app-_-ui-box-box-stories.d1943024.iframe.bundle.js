"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([[264],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{Z:()=>_defineProperty})},"./node_modules/@babel/runtime/helpers/esm/extends.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}__webpack_require__.d(__webpack_exports__,{Z:()=>_extends})},"./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_objectWithoutProperties});var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=(0,_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__.Z)(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}},"./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}__webpack_require__.d(__webpack_exports__,{Z:()=>_objectWithoutPropertiesLoose})},"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}__webpack_require__.d(__webpack_exports__,{Z:()=>_slicedToArray})},"./node_modules/@vanilla-extract/sprinkles/createRuntimeSprinkles/dist/vanilla-extract-sprinkles-createRuntimeSprinkles.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}__webpack_require__.d(__webpack_exports__,{$:()=>createSprinkles});var composeStyles=classList=>classList,createSprinkles=function createSprinkles(){return(composeStyles=>function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];var sprinklesStyles=Object.assign({},...args.map((a=>a.styles))),sprinklesKeys=Object.keys(sprinklesStyles),shorthandNames=sprinklesKeys.filter((property=>"mappings"in sprinklesStyles[property]));return Object.assign((props=>{var classNames=[],shorthands={},nonShorthands=_objectSpread2({},props),hasShorthands=!1;for(var shorthand of shorthandNames){var value=props[shorthand];if(null!=value){var sprinkle=sprinklesStyles[shorthand];for(var propMapping of(hasShorthands=!0,sprinkle.mappings))shorthands[propMapping]=value,null==nonShorthands[propMapping]&&delete nonShorthands[propMapping]}}var finalProps=hasShorthands?_objectSpread2(_objectSpread2({},shorthands),nonShorthands):props;for(var prop in finalProps){var propValue=finalProps[prop],_sprinkle=sprinklesStyles[prop];try{if(_sprinkle.mappings)continue;if("string"==typeof propValue||"number"==typeof propValue)classNames.push(_sprinkle.values[propValue].defaultClass);else if(Array.isArray(propValue))for(var responsiveIndex=0;responsiveIndex<propValue.length;responsiveIndex++){var responsiveValue=propValue[responsiveIndex];if(null!=responsiveValue){var conditionName=_sprinkle.responsiveArray[responsiveIndex];classNames.push(_sprinkle.values[responsiveValue].conditions[conditionName])}}else for(var _conditionName in propValue){var _value=propValue[_conditionName];null!=_value&&classNames.push(_sprinkle.values[_value].conditions[_conditionName])}}catch(e){throw e}}return composeStyles(classNames.join(" "))}),{properties:new Set(sprinklesKeys)})})(composeStyles)(...arguments)}},"./src/app/_/ui/box/box.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AsProp:()=>AsProp,Basic:()=>Basic,ResponsiveValues:()=>ResponsiveValues,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Basic$parameters,_Basic$parameters2,_Basic$parameters2$do,_AsProp$parameters,_AsProp$parameters2,_AsProp$parameters2$d,_ResponsiveValues$par,_ResponsiveValues$par2,_ResponsiveValues$par3,_home_runner_work_seed_seed_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_app_styles_system_css__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/app/_/styles/system.css.ts"),_lib_storybook__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/lib/storybook/create-arg-types-by-sprinkle-props.ts"),_box__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/app/_/ui/box/box.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_home_runner_work_seed_seed_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var meta={title:"UI / Layout / Box",component:_box__WEBPACK_IMPORTED_MODULE_3__.x,tags:["autodocs"],argTypes:(0,_lib_storybook__WEBPACK_IMPORTED_MODULE_4__.q)(_app_styles_system_css__WEBPACK_IMPORTED_MODULE_2__.U,{alwaysShow:!0})},Basic={args:{bg:"pink.500",color:"white",p:24},render:function render(args){return __jsx(_box__WEBPACK_IMPORTED_MODULE_3__.x,args,"As a CSS utility component, the Box also supports all system properties.",__jsx("br",null),"You can use them as prop directly on the component.")}},AsProp={args:{as:"button",bg:"pink.500",color:"white",px:20,py:8,rounded:"md"},render:function render(args){return __jsx(_box__WEBPACK_IMPORTED_MODULE_3__.x,args,"Box as a button")}},ResponsiveValues={args:{fontSize:{base:14,tablet:24,desktop:36},bg:"pink.500",color:"white",p:24},render:function render(args){return __jsx(_box__WEBPACK_IMPORTED_MODULE_3__.x,args,"Box allows you to provide object values to add mobile-first responsive styles.")}};const __WEBPACK_DEFAULT_EXPORT__=meta;Basic.parameters=_objectSpread(_objectSpread({},Basic.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Basic$parameters=Basic.parameters)||void 0===_Basic$parameters?void 0:_Basic$parameters.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    bg: "pink.500",\n    color: "white",\n    p: 24\n  },\n  render: args => <Box {...args}>\n      As a CSS utility component, the Box also supports all system properties.\n      <br />\n      You can use them as prop directly on the component.\n    </Box>\n}'},null===(_Basic$parameters2=Basic.parameters)||void 0===_Basic$parameters2||null===(_Basic$parameters2$do=_Basic$parameters2.docs)||void 0===_Basic$parameters2$do?void 0:_Basic$parameters2$do.source)})}),AsProp.parameters=_objectSpread(_objectSpread({},AsProp.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_AsProp$parameters=AsProp.parameters)||void 0===_AsProp$parameters?void 0:_AsProp$parameters.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    as: "button",\n    bg: "pink.500",\n    color: "white",\n    px: 20,\n    py: 8,\n    rounded: "md"\n  },\n  render: args => <Box {...args}>Box as a button</Box>\n}'},null===(_AsProp$parameters2=AsProp.parameters)||void 0===_AsProp$parameters2||null===(_AsProp$parameters2$d=_AsProp$parameters2.docs)||void 0===_AsProp$parameters2$d?void 0:_AsProp$parameters2$d.source)})}),ResponsiveValues.parameters=_objectSpread(_objectSpread({},ResponsiveValues.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_ResponsiveValues$par=ResponsiveValues.parameters)||void 0===_ResponsiveValues$par?void 0:_ResponsiveValues$par.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    fontSize: {\n      base: 14,\n      tablet: 24,\n      desktop: 36\n    },\n    bg: "pink.500",\n    color: "white",\n    p: 24\n  },\n  render: args => <Box {...args}>\n      Box allows you to provide object values to add mobile-first responsive\n      styles.\n    </Box>\n}'},null===(_ResponsiveValues$par2=ResponsiveValues.parameters)||void 0===_ResponsiveValues$par2||null===(_ResponsiveValues$par3=_ResponsiveValues$par2.docs)||void 0===_ResponsiveValues$par3?void 0:_ResponsiveValues$par3.source)})})}}]);