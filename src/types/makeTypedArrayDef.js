module.exports = function makeTypedArrayDef(klass) {
  return {
    description: klass.name,
    serializedDescription: `{ $type: "${klass.name}", $value: Array<number> }`,

    check(val) {
      return val instanceof klass;
    },

    serialize(typedArray) {
      return {
        $type: klass.name,
        $value: Array.from(typedArray),
      };
    },

    checkSerialized(serialized) {
      return serialized.$type === klass.name;
    },

    deserialize(serialized) {
      return new klass(serialized.$value);
    },
  };
};
