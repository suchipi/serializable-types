/* @flow */
import type { TypeDef } from "../TypeDef";

module.exports = ({
  name: "undefined",
  check(val) {
    return val === undefined;
  },
  serialize() {
    return { $type: "undefined", $value: undefined };
  },
  deserialize() {
    return undefined;
  },
}: TypeDef<void, "undefined", void>);
