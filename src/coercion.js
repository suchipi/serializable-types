const types = require("./types");
const typeConstructors = require("./typeConstructors");
const formatValue = require("./formatValue");

const decoratedTypeDefType = typeConstructors.object({
  description: types.string,
  serializedDescription: types.string,
  check: types.Function,
  serialize: types.Function,
  checkSerialized: types.Function,
  deserialize: types.Function,
});

const coercingTypeConstructors = {
  array: (member) => typeConstructors.array(coerce(member)),
  arrayContaining: (member) => typeConstructors.arrayContaining(coerce(member)),
  exactNumber: typeConstructors.exactNumber,
  exactString: typeConstructors.exactString,
  func: (params, returnValue) =>
    typeConstructors.func(params.map(coerce), coerce(returnValue)),
  instanceOf: typeConstructors.instanceOf,
  intersection: (...members) =>
    typeConstructors.intersection(...members.map(coerce)),
  map: (key, value) => typeConstructors.map(coerce(key), coerce(value)),
  maybe: (wrapped) => typeConstructors.maybe(coerce(wrapped)),
  object: (defObj) =>
    typeConstructors.object(
      Object.fromEntries(
        Object.entries(defObj).map(([key, value]) => [key, coerce(value)])
      )
    ),
  objectMap: (value, key) =>
    typeConstructors.objectMap(coerce(value), coerce(key)),
  set: (member) => typeConstructors.set(coerce(member)),
  shape: (defObj) =>
    typeConstructors.shape(
      Object.fromEntries(
        Object.entries(defObj).map(([key, value]) => [key, coerce(value)])
      )
    ),
  stringMatching: typeConstructors.stringMatching,
  symbolFor: typeConstructors.symbolFor,
  tuple: (...members) => typeConstructors.tuple(...members.map(coerce)),
  union: (...members) => typeConstructors.union(...members.map(coerce)),
};

function coerce(value) {
  if (decoratedTypeDefType.check(value)) {
    return value;
  } else if (value === true) {
    return types.true;
  } else if (value === false) {
    return types.false;
  } else if (value === null) {
    return types.null;
  } else if (value === undefined) {
    return types.undefined;
  } else if (Number.isNaN(value)) {
    return types.NaN;
  } else if (value === Infinity) {
    return types.Infinity;
  } else if (value === -Infinity) {
    return types.NegativeInfinity;
  } else if (value === Object || value === coercingTypeConstructors.object) {
    return types.anyObject;
  } else if (typeof URL !== "undefined" && value === URL) {
    return types.URL;
  } else if (value === Symbol) {
    return types.Symbol;
  } else if (value === RegExp) {
    return types.RegExp;
  } else if (value === Function) {
    return types.Function;
  } else if (value === Error) {
    return types.Error;
  } else if (typeof Element !== "undefined" && value === Element) {
    return types.Element;
  } else if (typeof Buffer !== "undefined" && value === Buffer) {
    return types.Buffer;
  } else if (value === Date) {
    return types.Date;
  } else if (value === String) {
    return types.string;
  } else if (value === Number) {
    return types.number;
  } else if (value === Boolean) {
    return types.boolean;
  } else if (value === Array) {
    return typeConstructors.array(types.any);
  } else if (typeof value === "string") {
    return typeConstructors.exactString(value);
  } else if (typeof value === "number") {
    return typeConstructors.exactNumber(value);
  } else if (Array.isArray(value)) {
    return coercingTypeConstructors.tuple(...value);
  } else if (typeof value === "function") {
    return typeConstructors.instanceOf(value);
  } else if (value != null && typeof value === "object") {
    return coercingTypeConstructors.object(value);
  } else {
    throw new Error(`Unexpected value in type position: ${formatValue(value)}`);
  }
}

module.exports = {
  coerce,
  coercingTypeConstructors,
};
