/* @flow */
import type { TypeDef } from "./TypeDef";
const assertType = require("./assertType");

export type DecoratedTypeDef<
  ValueType,
  SerializedValueType = ValueType
> = TypeDef<ValueType, SerializedValueType> & {
  assert(val: any): void,
};

module.exports = function decorateTypeDef<ValueType, SerializedValueType>(
  typeDef: TypeDef<ValueType, SerializedValueType>
): DecoratedTypeDef<ValueType, SerializedValueType> {
  return {
    description: typeDef.description,
    serializedDescription: typeDef.serializedDescription,
    check: typeDef.check,
    serialize(val) {
      if (!this.check(val)) {
        throw assertType.makeError(typeDef.description, val);
      }
      return typeDef.serialize(val);
    },
    checkSerialized: typeDef.checkSerialized,
    deserialize(serialized) {
      if (!this.checkSerialized(serialized)) {
        throw assertType.makeError(typeDef.serializedDescription, serialized);
      }
      return typeDef.deserialize(serialized);
    },
    assert(val) {
      assertType(val, typeDef);
    },
  };
};
