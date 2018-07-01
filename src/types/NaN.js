/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = decorateTypeDef(
  ({
    description: "NaN",
    serializedDescription: '{ $type: "NaN", $value: NaN }',
    check(val) {
      return Number.isNaN(val);
    },
    serialize(number) {
      return { $type: "NaN", $value: NaN };
    },
    checkSerialized(serialized) {
      return serialized.$type === "NaN";
    },
    deserialize() {
      return NaN;
    },
  }: TypeDef<typeof NaN>)
);
