/* @flow */
import type { TypeDef } from "../TypeDef";
import type { DecoratedTypeDef } from "../decorateTypeDef";
const object = require("./object");
const maybe = require("./maybe");

module.exports = function shape(
  objectDef: Object
): DecoratedTypeDef<Object, any> {
  const shapeDef = {};
  const entries = ((Object.entries(objectDef): any): Array<
    [string, TypeDef<any>]
  >);
  entries.forEach(([key, typeDef]) => {
    shapeDef[key] = maybe(typeDef);
  });
  return object(shapeDef);
};
