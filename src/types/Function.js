/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = decorateTypeDef(
  ({
    description: "Function",
    serializedDescription: "Functions cannot be serialized",
    check(val) {
      return typeof val === "function";
    },
    serialize(buffer) {
      throw new TypeError("Functions cannot be serialized");
    },
    checkSerialized(serialized) {
      return false;
    },
    deserialize(serialized) {
      throw new TypeError("Functions cannot be deserialized");
    },
  }: TypeDef<Buffer, Array<number>>)
);
