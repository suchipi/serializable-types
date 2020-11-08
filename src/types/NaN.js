module.exports = {
  description: "NaN",
  serializedDescription: '{ $type: "NaN", $value: NaN }',

  check(val) {
    return Number.isNaN(val);
  },

  serialize(number) {
    return {
      $type: "NaN",
      $value: NaN,
    };
  },

  checkSerialized(serialized) {
    return serialized.$type === "NaN";
  },

  deserialize() {
    return NaN;
  },
};
