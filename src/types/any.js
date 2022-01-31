module.exports = {
  description: "any",
  serializedDescription: "Values of type 'any' cannot be serialized",

  check(_val) {
    return true;
  },

  serialize(_val) {
    throw new Error("Values of type 'any' cannot be serialized");
  },

  checkSerialized(_serialized) {
    return false;
  },

  deserialize(_serialized) {
    throw new Error("Values of type 'any' cannot be serialized");
  },
};
