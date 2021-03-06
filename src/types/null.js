module.exports = {
  description: "null",
  serializedDescription: '{ $type: "null", $value: null }',

  check(val) {
    return val === null;
  },

  serialize() {
    return {
      $type: "null",
      $value: null,
    };
  },

  checkSerialized(serialized) {
    return serialized.$type === "null";
  },

  deserialize() {
    return null;
  },
};
