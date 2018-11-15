/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = decorateTypeDef(
  ({
    description: "-Infinity",
    serializedDescription: '{ $type: "-Infinity" }',
    check(val) {
      return val === -Infinity;
    },
    serialize(number) {
      return {
        $type: "-Infinity",
      };
    },
    checkSerialized(serialized) {
      return serialized.$type === "-Infinity";
    },
    deserialize(serialized) {
      return -Infinity;
    },
  }: TypeDef<void>)
);
