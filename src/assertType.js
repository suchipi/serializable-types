/* @flow */
import type { TypeDef } from "./TypeDef";

function assertType(value: any, typeDef: TypeDef<any>) {
  if (!typeDef.check(value)) {
    throw assertType.makeError(typeDef.description, value);
  }
}

assertType.makeError = function makeError(description: string, value: any) {
  let stringified = value;
  try {
    stringified = JSON.stringify(value, null, 2);
  } catch (err) {}
  return new TypeError(`Expected ${description}, but received ${stringified}`);
};

module.exports = assertType;
