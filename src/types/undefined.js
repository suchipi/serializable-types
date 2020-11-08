module.exports = {
  description: "undefined",
  serializedDescription: '{ $type: "undefined", $value: undefined }',

  check(val) {
    return val === undefined;
  },

  serialize() {
    return {
      $type: "undefined",
      $value: undefined,
    };
  },

  checkSerialized(serialized) {
    return serialized.$type === "undefined";
  },

  deserialize() {
    return undefined;
  },
};
