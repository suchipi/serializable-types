/* @flow */
import type { TypeDef } from "../TypeDef";

module.exports = ({
  name: "null",
  check(val) {
    return val === null;
  },
  serialize() {
    return { $type: "null", $value: null };
  },
  deserialize() {
    return null;
  },
}: TypeDef<null, "null", null>);
