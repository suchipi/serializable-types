/* @flow */
import type { TypeDef } from "./TypeDef";
const prettyFormat = require("pretty-format");

function assertType(value: any, typeDef: TypeDef<any>) {
  if (!typeDef.check(value)) {
    throw assertType.makeError(typeDef.description, value);
  }
}

assertType.makeError = function makeError(description: string, value: any) {
  return new TypeError(
    `Expected ${description}, but received ${prettyFormat(value)}`
  );
};

module.exports = assertType;
