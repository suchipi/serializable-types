module.exports = function symbolFor(tag) {
  return {
    description: `Symbol.for(${JSON.stringify(tag)})`,
    serializedDescription: `{ $type: "SymbolFor", $value: ${JSON.stringify(
      tag
    )} }`,

    check(val) {
      return val === Symbol.for(tag);
    },

    serialize(val) {
      return {
        $type: "SymbolFor",
        $value: tag,
      };
    },

    checkSerialized(serialized) {
      return serialized.$type === "SymbolFor" && serialized.$value === tag;
    },

    deserialize(serialized) {
      return Symbol.for(tag);
    },
  };
};
