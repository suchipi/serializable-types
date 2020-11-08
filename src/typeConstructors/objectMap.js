const union = require("./union");
const stringDef = require("../types/string");
const symbolDef = require("../types/Symbol");

module.exports = function objectMap(
  valueType,
  keyType = union(stringDef, symbolDef)
) {
  return {
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
        $value: Object.entries(obj).map(([key, val]) => {
          return [keyType.serialize(key), valueType.serialize(val)];
        }),
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
      const obj = {};
      serialized.$value.forEach(([serializedKey, serializedValue]) => {
        const key = keyType.deserialize(serializedKey);
        const val = valueType.deserialize(serializedValue);
        obj[key] = val;
      });
      return obj;
    },
  };
};
