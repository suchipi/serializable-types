/* @flow */
import type { TypeDef } from "../TypeDef";
import type { DecoratedTypeDef } from "../decorateTypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = function intersection(
  ...typeDefs: Array<TypeDef<any>>
): DecoratedTypeDef<any> {
  return decorateTypeDef({
    description: typeDefs.map((typeDef) => typeDef.description).join(" & "),

    serializedDescription: `{ $type: "intersection", $value: [ ${typeDefs
      .map((typeDef) => typeDef.serializedDescription)
      .join(", ")} ] }`,

    check(val) {
      return typeDefs.every((typeDef) => typeDef.check(val));
    },

    serialize(val) {
      return {
        $type: "intersection",
        $value: typeDefs.map((typeDef) => typeDef.serialize(val)),
      };
    },

    checkSerialized(serialized) {
      return (
        serialized.$type === "intersection" &&
        typeDefs.every((typeDef, index) =>
          typeDef.checkSerialized(serialized.$value[index])
        )
      );
    },

    deserialize(serialized) {
      let val;

      typeDefs.forEach((typeDef, index) => {
        if (typeof val === "undefined") {
          val = typeDef.deserialize(serialized.$value[index]);
        } else {
          Object.assign(val, typeDef.deserialize(serialized.$value[index]));
        }
      });

      return val;
    },
  });
};
