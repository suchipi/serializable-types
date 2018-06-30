/* @flow */
import type { TypeDef } from "../TypeDef";

module.exports = ({
  name: "string",
  check(val) {
    return typeof val === "string";
  },
  serialize(str) {
    return { $type: "string", $value: str };
  },
  deserialize(serialized) {
    return serialized.$value;
  },
}: TypeDef<string, "string", string>);
