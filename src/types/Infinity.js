module.exports = {
  description: "Infinity",
  serializedDescription: '{ $type: "Infinity" }',

  check(val) {
    return val === Infinity;
  },

  serialize(number) {
    return {
      $type: "Infinity",
    };
  },

  checkSerialized(serialized) {
    return serialized.$type === "Infinity";
  },

  deserialize(serialized) {
    return Infinity;
  },
};
