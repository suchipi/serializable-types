/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = function makeTypedArrayDef(klass: Class<$TypedArray>) {
  return decorateTypeDef(
    ({
      description: klass.name,
      serializedDescription: `{ $type: "${
        klass.name
      }", $value: Array<number> }`,
      check(val) {
        return val instanceof klass;
      },
      serialize(typedArray) {
        return { $type: klass.name, $value: Array.from(typedArray) };
      },
      checkSerialized(serialized) {
        return serialized.$type === klass.name;
      },
      deserialize(serialized) {
        return new klass(serialized.$value);
      },
    }: TypeDef<typeof klass.prototype, Array<number>>)
  );
};
