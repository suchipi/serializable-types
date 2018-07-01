/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = decorateTypeDef(
  ({
    description: "Uint8Array",
    serializedDescription: '{ $type: "Uint8Array", $value: Array<number> }',
    check(val) {
      return val instanceof Uint8Array;
    },
    serialize(uint8Array) {
      return { $type: "Uint8Array", $value: Array.from(uint8Array) };
    },
    checkSerialized(serialized) {
      return serialized.$type === "Uint8Array";
    },
    deserialize(serialized) {
      return new Uint8Array(serialized.$value);
    },
  }: TypeDef<Uint8Array, Array<number>>)
);
