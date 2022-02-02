module.exports = function predicate(matcherFunction) {
  return {
    description: `Predicate type for: ${matcherFunction.toString()}`,
    serializedDescription: `Predicate types cannot be serialized`,

    check(val) {
      return matcherFunction(val);
    },

    serialize(array) {
      throw new Error("Predicate types cannot be serialized");
    },

    checkSerialized(serialized) {
      throw new Error("Predicate types cannot be serialized");
    },

    deserialize(serialized) {
      throw new Error("Predicate types cannot be deserialized");
    },
  };
};
