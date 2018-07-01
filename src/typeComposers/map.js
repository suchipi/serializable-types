/* @flow */
import type { TypeDef, SerializationWrapper } from "../TypeDef";
import type { DecoratedTypeDef } from "../decorateTypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = function map<KeyT, KeySerialized, ValueT, ValueSerialized>(
  keyDef: TypeDef<KeyT, KeySerialized>,
  valueDef: TypeDef<ValueT, ValueSerialized>
): DecoratedTypeDef<
  Map<KeyT, ValueT>,
  Array<
    [SerializationWrapper<KeySerialized>, SerializationWrapper<ValueSerialized>]
  >
> {
  return decorateTypeDef({
    description: `Map<${keyDef.description}, ${valueDef.description}>`,

    serializedDescription: `{ $type: "Map", $value: Array<[${
      keyDef.serializedDescription
    }, ${valueDef.serializedDescription}]> }`,

    check(val) {
      return (
        val instanceof Map &&
        Array.from(val).every(
          ([key, value]) => keyDef.check(key) && valueDef.check(value)
        )
      );
    },

    serialize(map) {
      return {
        $type: "Map",
        $value: Array.from(map).map(([key, val]) => [
          keyDef.serialize(key),
          valueDef.serialize(val),
        ]),
      };
    },

    checkSerialized(serialized) {
      return (
        serialized.$type === "Map" &&
        serialized.$value.every(
          ([serializedKey, serializedVal]) =>
            keyDef.checkSerialized(serializedKey) &&
            valueDef.checkSerialized(serializedVal)
        )
      );
    },

    deserialize(serialized) {
      const map = new Map();
      serialized.$value.forEach(([serializedKey, serializedValue]) => {
        map.set(
          keyDef.deserialize(serializedKey),
          valueDef.deserialize(serializedValue)
        );
      });
      return map;
    },
  });
};
