/* @flow */
import type { TypeDef } from "../TypeDef";
const Buffer = global.Buffer || require("buffer").Buffer;

module.exports = ({
  name: "Buffer",
  check(val) {
    return Buffer.isBuffer(val);
  },
  serialize(buffer) {
    return { $type: "Buffer", $value: Array.from(buffer.values()) };
  },
  deserialize(serialized) {
    return Buffer.from(serialized.$value);
  },
}: TypeDef<Buffer, "Buffer", Array<number>>);
