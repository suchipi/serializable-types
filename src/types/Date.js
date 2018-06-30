/* @flow */
import type { TypeDef } from "../TypeDef";

module.exports = ({
  name: "Date",
  check(val) {
    return val instanceof Date;
  },
  serialize(date) {
    return { $type: "Date", $value: Number(date) };
  },
  deserialize(serialized) {
    return new Date(serialized.$value);
  },
}: TypeDef<Date, "Date", number>);
