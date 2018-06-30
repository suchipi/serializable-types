/* @flow */
import type { TypeDef, TypeWrapper } from "../TypeDef";

module.exports = function union(...typeDefs: Array<TypeDef<>>): TypeDef<> {
  return {
    name: "union",
    niceName: typeDefs.map((typeDef) => typeDef.name).join(" | "),
    check(val) {
      return typeDefs.some((typeDef) => typeDef.check(val));
    },
    serialize(val) {
      let serialized = val;
      typeDefs.forEach((typeDef) => {
        if (typeDef.check(val)) {
          serialized = typeDef.serialize(val);
        }
      });
      return serialized;
    },
    deserialize(serialized) {
      let deserialized;
      typeDefs.forEach((typeDef) => {
        // All names for different types in a union must be unique, otherwise
        // this won't work.
        if (serialized.$type === typeDef.name) {
          deserialized = typeDef.deserialize(serialized);
        }
      });
      return deserialized;
    },
  };
};
