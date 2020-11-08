module.exports = {
  description: "Symbol",
  serializedDescription: '{ $type: "Symbol", $value: string }',

  check(val) {
    return typeof val === "symbol";
  },

  serialize(val) {
    const key = Symbol.keyFor(val);

    if (key == null) {
      throw new Error(
        "Can only serialize symbols from the global symbol registry."
      );
    }

    return {
      $type: "Symbol",
      $value: key,
    };
  },

  checkSerialized(serialized) {
    return serialized.$type === "Symbol";
  },

  deserialize(serialized) {
    return Symbol.for(serialized.$value);
  },
};
