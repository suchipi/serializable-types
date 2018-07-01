/* @flow */
import type { TypeDef } from "../TypeDef";
import type { DecoratedTypeDef } from "../decorateTypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = function tuple(
  ...memberDefs: Array<TypeDef<any>>
): DecoratedTypeDef<any> {
  return decorateTypeDef({
    description: `[${memberDefs
      .map((typeDef) => typeDef.description)
      .join(", ")}]`,

    serializedDescription: `[${memberDefs
      .map((typeDef) => typeDef.description)
      .join(", ")}]`,

    check(val) {
      return (
        val != null &&
        typeof val === "object" &&
        memberDefs.every((typeDef, index) => typeDef.check(val[index]))
      );
    },

    serialize(tuple) {
      return {
        $type: "tuple",
        $value: Array.from(tuple).map((member, index) =>
          memberDefs[index].serialize(member)
        ),
      };
    },

    checkSerialized(serialized) {
      return (
        serialized.$type === "tuple" &&
        serialized.$value.every((serializedValue, index) => {
          const typeDef = memberDefs[index];
          return typeDef.checkSerialized(serializedValue);
        })
      );
    },

    deserialize(serialized) {
      return serialized.$value.map((serializedValue, index) => {
        const typeDef = memberDefs[index];
        return typeDef.deserialize(serializedValue);
      });
    },
  });
};
