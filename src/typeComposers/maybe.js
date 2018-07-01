/* @flow */
import type { TypeDef } from "../TypeDef";
import type { DecoratedTypeDef } from "../decorateTypeDef";
const undefinedDef = require("../types/undefined");
const union = require("./union");

module.exports = function maybe(typeDef: TypeDef<any>): DecoratedTypeDef<any> {
  return union(typeDef, undefinedDef);
};
