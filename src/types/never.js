module.exports = {
  description: "never",
  serializedDescription: "never",

  check(val) {
    return false;
  },

  serialize(bool) {
    throw new Error("Cannot serialize never");
  },

  checkSerialized(serialized) {
    return false;
  },

  deserialize(serialized) {
    throw new Error("Cannot deserialize never");
  },
};
