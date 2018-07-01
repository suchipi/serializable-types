/* @flow */
const makeTypedArrayDef = require("./makeTypedArrayDef");

module.exports = {
  boolean: require("./boolean"),
  Buffer: require("./Buffer"),
  Date: require("./Date"),
  Error: require("./Error"),
  false: require("./false"),
  integer: require("./integer"),
  NaN: require("./NaN"),
  null: require("./null"),
  number: require("./number"),
  RegExp: require("./RegExp"),
  string: require("./string"),
  Symbol: require("./Symbol"),
  true: require("./true"),
  Int8Array: makeTypedArrayDef(Int8Array),
  Uint8Array: makeTypedArrayDef(Uint8Array),
  Uint8ClampedArray: makeTypedArrayDef(Uint8ClampedArray),
  Int16Array: makeTypedArrayDef(Int16Array),
  Uint16Array: makeTypedArrayDef(Uint16Array),
  Int32Array: makeTypedArrayDef(Int32Array),
  Uint32Array: makeTypedArrayDef(Uint32Array),
  Float32Array: makeTypedArrayDef(Float32Array),
  Float64Array: makeTypedArrayDef(Float64Array),
  undefined: require("./undefined"),
  URL: require("./URL"),
};
