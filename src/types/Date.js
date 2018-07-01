/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = decorateTypeDef(
  ({
    description: "Date",
    serializedDescription: '{ $type: "Date", $value: number }',
    check(val) {
      return val instanceof Date;
    },
    serialize(date) {
      return { $type: "Date", $value: Number(date) };
    },
    checkSerialized(serialized) {
      return serialized.$type === "Date";
    },
    deserialize(serialized) {
      return new Date(serialized.$value);
    },
  }: TypeDef<Date, number>)
);
