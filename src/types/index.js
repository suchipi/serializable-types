const makeTypedArrayDef = require("./makeTypedArrayDef");

module.exports = {
  any: require("./any"),
  anyObject: require("./anyObject"),
  boolean: require("./boolean"),
  Buffer: require("./Buffer"),
  Date: require("./Date"),
  Element: require("./Element"),
  Error: require("./Error"),
  false: require("./false"),
  false_: require("./false"), // for TS
  Function: require("./Function"),
  Infinity: require("./Infinity"),
  integer: require("./integer"),
  NaN: require("./NaN"),
  NegativeInfinity: require("./NegativeInfinity"),
  never: require("./never"),
  null: require("./null"),
  null_: require("./null"), // for TS
  number: require("./number"),
  RegExp: require("./RegExp"),
  string: require("./string"),
  Symbol: require("./Symbol"),
  true: require("./true"),
  true_: require("./true"), // for TS
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
