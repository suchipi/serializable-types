/* @flow */
import type { TypeDef } from "../TypeDef";

module.exports = ({
  name: "boolean",
  check(val) {
    return typeof val === "boolean";
  },
  serialize(bool) {
    return { $type: "boolean", $value: bool };
  },
  deserialize(serialized) {
    return serialized.$value;
  },
}: TypeDef<boolean, "boolean", boolean>);
