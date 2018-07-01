/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");
const Buffer = global.Buffer || require("buffer").Buffer;

module.exports = decorateTypeDef(
  ({
    description: "Buffer",
    serializedDescription: '{ $type: "Buffer", $value: Array<number> }',
    check(val) {
      return Buffer.isBuffer(val);
    },
    serialize(buffer) {
      return { $type: "Buffer", $value: Array.from(buffer.values()) };
    },
    checkSerialized(serialized) {
      return serialized.$type === "Buffer";
    },
    deserialize(serialized) {
      return Buffer.from(serialized.$value);
    },
  }: TypeDef<Buffer, Array<number>>)
);
