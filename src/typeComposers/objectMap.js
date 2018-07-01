/* @flow */
import type { TypeDef } from "../TypeDef";
import type { DecoratedTypeDef } from "../decorateTypeDef";
const decorateTypeDef = require("../decorateTypeDef");
const union = require("./union");
const stringDef = require("../types/string");
const symbolDef = require("../types/Symbol");

module.exports = function objectMap<Key, Value>(
  valueType: TypeDef<Value, any>,
  keyType: TypeDef<Key> = union(stringDef, symbolDef)
): DecoratedTypeDef<{ [key: Key]: Value }, Array<[any, any]>> {
  return decorateTypeDef({
    description: `{ [${keyType.description}]: ${valueType.description} }`,
    serializedDescription: `{ $type: "objectMap", $value: Array<[${
      keyType.description
    }, ${valueType.description}]> }`,

    check(val) {
      return (
        val != null &&
        typeof val === "object" &&
        Object.entries(val).every(
          ([key, val]) => keyType.check(key) && valueType.check(val)
        )
      );
    },

    serialize(obj) {
      return {
        $type: "objectMap",
        $value: ((Object.entries(obj): any): Array<[Key, Value]>).map(
          ([key, val]) => {
            return [keyType.serialize(key), valueType.serialize(val)];
          }
        ),
      };
    },

    checkSerialized(serialized) {
      if (serialized.$type !== "objectMap") {
        return false;
      }

      return serialized.$value.every(
        ([key, val]) =>
          keyType.checkSerialized(key) && valueType.checkSerialized(val)
      );
    },

    deserialize(serialized) {
      const obj: { [key: Key]: Value } = {};
      serialized.$value.forEach(([serializedKey, serializedValue]) => {
        const key = keyType.deserialize(serializedKey);
        const val = valueType.deserialize(serializedValue);
        obj[key] = val;
      });
      return obj;
    },
  });
};
