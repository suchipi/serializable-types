/* @flow */
import type { TypeDef } from "../TypeDef";

module.exports = ({
  name: "Uint8Array",
  check(val) {
    return val instanceof Uint8Array;
  },
  serialize(uint8Array) {
    return { $type: "Uint8Array", $value: Array.from(uint8Array) };
  },
  deserialize(serialized) {
    return new Uint8Array(serialized.$value);
  },
}: TypeDef<Uint8Array, "Uint8Array", Array<number>>);
