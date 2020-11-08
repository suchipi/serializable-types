module.exports = function func(params, returnValue) {
  return {
    description: "Function",
    serializedDescription: "Functions cannot be serialized",

    check(val) {
      // Can't actually validate the params of a function without decorating every function that
      // could come through here, which isn't practical at runtime. So this type is mostly just
      // for documentation purposes, and the runtime treats it the same as types.Function.
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
};
