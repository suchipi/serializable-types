const Buffer = require("buffer").Buffer;

module.exports = {
  description: "Buffer",
  serializedDescription: '{ $type: "Buffer", $value: Array<number> }',

  check(val) {
    return Buffer.isBuffer(val);
  },

  serialize(buffer) {
    return {
      $type: "Buffer",
      $value: Array.from(buffer.values()),
    };
  },

  checkSerialized(serialized) {
    return serialized.$type === "Buffer";
  },

  deserialize(serialized) {
    return Buffer.from(serialized.$value);
  },
};
