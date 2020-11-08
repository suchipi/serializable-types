module.exports = function object(objectDef) {
  const entries = Object.entries(objectDef);
  return {
    description: `{ ${entries
      .map(([key, typeDef]) => `${key}: ${typeDef.description}`)
      .join(", ")} }`,
    serializedDescription: `{ $type: "object", $value: { ${entries
      .map(([key, typeDef]) => `${key}: ${typeDef.serializedDescription}`)
      .join(", ")} } }`,

    check(val) {
      return (
        val != null &&
        typeof val === "object" &&
        entries.every(([key, typeDef]) => typeDef.check(val[key]))
      );
    },

    serialize(obj) {
      const value = {};
      entries.forEach(([key, typeDef]) => {
        value[key] = typeDef.serialize(obj[key]);
      });
      return {
        $type: "object",
        $value: value,
      };
    },

    checkSerialized(serialized) {
      if (serialized.$type !== "object") {
        return false;
      }

      const serializedEntries = Object.entries(serialized.$value);
      return serializedEntries.every(
        ([key, serializedValue]) =>
          objectDef[key] && objectDef[key].checkSerialized(serializedValue)
      );
    },

    deserialize(serialized) {
      const value = {};
      entries.forEach(([key, typeDef]) => {
        value[key] = typeDef.deserialize(serialized.$value[key]);
      });
      return value;
    },
  };
};
