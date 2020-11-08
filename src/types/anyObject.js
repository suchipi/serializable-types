module.exports = {
  description: "any Object",
  serializedDescription: '{ $type: "object", $value: Object }',

  check(val) {
    return val != null && typeof val === "object";
  },

  serialize(val) {
    return {
      $type: "object",
      $value: val,
    };
  },

  checkSerialized(serialized) {
    return serialized.$type === "object";
  },

  deserialize(serialized) {
    return serialized.$value;
  },
};
