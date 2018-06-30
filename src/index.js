/* @flow */
import type { TypeDef } from "./TypeDef";
const baseTypes = require("./types");
const typeComposers = require("./typeComposers");

function assert(value: any, typeDef: TypeDef<any, string, any>) {
  if (!typeDef.check(value)) {
    throw new TypeError(
      `Expected ${typeDef.niceName || typeDef.name}, but received: ${
        typeof value === "object" ? JSON.stringify(value) : value
      }`
    );
  }
}

module.exports = Object.assign({ assert }, baseTypes, typeComposers);
