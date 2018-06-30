/* @flow */
import type { TypeDef } from "../TypeDef";

module.exports = ({
  name: "number",
  check(val) {
    return typeof val === "number" && !Number.isNaN(val);
  },
  serialize(number) {
    return { $type: "number", $value: number };
  },
  deserialize(serialized) {
    return serialized.$value;
  },
}: TypeDef<number, "number", number>);
