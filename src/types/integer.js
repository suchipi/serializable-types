/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = decorateTypeDef(
  ({
    description: "integer",
    serializedDescription: '{ $type: "integer", $value: number }',
    check(val) {
      return typeof val === "number" && parseInt(String(val)) === val;
    },
    serialize(integer) {
      return { $type: "integer", $value: integer };
    },
    checkSerialized(serialized) {
      return serialized.$type === "integer";
    },
    deserialize(serialized) {
      return serialized.$value;
    },
  }: TypeDef<number>)
);
