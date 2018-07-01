/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = decorateTypeDef(
  ({
    description: "string",
    serializedDescription: '{ $type: "string", $value: string }',
    check(val) {
      return typeof val === "string";
    },
    serialize(str) {
      return { $type: "string", $value: str };
    },
    checkSerialized(serialized) {
      return serialized.$type === "string";
    },
    deserialize(serialized) {
      return serialized.$value;
    },
  }: TypeDef<string>)
);
