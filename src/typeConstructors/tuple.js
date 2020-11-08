module.exports = function tuple(...memberDefs) {
  return {
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
        memberDefs.length === val.length &&
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
        serialized.$value.length === memberDefs.length &&
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
  };
};
