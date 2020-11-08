const makeError = require("../makeError");
module.exports = function union(...typeDefs) {
  return {
    description: typeDefs.map((typeDef) => typeDef.description).join(" | "),
    serializedDescription: typeDefs
      .map((typeDef) => typeDef.serializedDescription)
      .join(" | "),

    check(val) {
      return typeDefs.some((typeDef) => typeDef.check(val));
    },

    serialize(val) {
      const defToSerializeWith = typeDefs.find((typeDef) => typeDef.check(val));

      if (defToSerializeWith == null) {
        throw makeError(this.description, val);
      }

      return defToSerializeWith.serialize(val);
    },

    checkSerialized(serialized) {
      return typeDefs.some((typeDef) => typeDef.checkSerialized(serialized));
    },

    deserialize(serialized) {
      const defToDeserializeWith = typeDefs.find((typeDef) =>
        typeDef.checkSerialized(serialized)
      );

      if (defToDeserializeWith == null) {
        throw makeError(this.serializedDescription, serialized);
      }

      return defToDeserializeWith.deserialize(serialized);
    },
  };
};
