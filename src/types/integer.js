/* @flow */
import type { TypeDef } from "../TypeDef";

module.exports = ({
  name: "integer",
  check(val) {
    return typeof val === "number" && parseInt(String(val)) === val;
  },
  serialize(integer) {
    return { $type: "integer", $value: integer };
  },
  deserialize(serialized) {
    return serialized.$value;
  },
}: TypeDef<number, "integer", number>);
