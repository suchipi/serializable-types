/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = decorateTypeDef(
  ({
    description: "undefined",
    serializedDescription: '{ $type: "undefined", $value: undefined }',
    check(val) {
      return val === undefined;
    },
    serialize() {
      return { $type: "undefined", $value: undefined };
    },
    checkSerialized(serialized) {
      return serialized.$type === "undefined";
    },
    deserialize() {
      return undefined;
    },
  }: TypeDef<void>)
);
