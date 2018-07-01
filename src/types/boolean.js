/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = decorateTypeDef(
  ({
    description: "boolean",
    serializedDescription: '{ $type: "boolean", $value: boolean }',
    check(val) {
      return typeof val === "boolean";
    },
    serialize(bool) {
      return { $type: "boolean", $value: bool };
    },
    checkSerialized(serialized) {
      return serialized.$type === "boolean";
    },
    deserialize(serialized) {
      return serialized.$value;
    },
  }: TypeDef<boolean>)
);
