module.exports = {
  description: "Function",
  serializedDescription: "Functions cannot be serialized",

  check(val) {
    return typeof val === "function";
  },

  serialize(buffer) {
    throw new TypeError("Functions cannot be serialized");
  },

  checkSerialized(serialized) {
    return false;
  },

  deserialize(serialized) {
    throw new TypeError("Functions cannot be deserialized");
  },
};
