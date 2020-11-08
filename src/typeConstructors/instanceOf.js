module.exports = function instanceOf(klass) {
  return {
    description: `${klass.name}`,
    serializedDescription: `Serialized ${klass.name}`,

    check(val) {
      return val instanceof klass;
    },

    serialize(val) {
      if (klass.serialize) {
        return klass.serialize(val);
      } else {
        throw new Error(
          "Cannot serialize class instances unless their class has a static 'serialize' method."
        );
      }
    },

    checkSerialized(serialized) {
      if (klass.checkSerialized) {
        return klass.checkSerialized(serialized);
      } else {
        throw new Error(
          "Cannot use checkSerialized with class unless the class has a static 'checkSerialized' method."
        );
      }
    },

    deserialize(serialized) {
      if (klass.deserialize) {
        return klass.deserialize(serialized);
      } else {
        throw new Error(
          "Cannot deserialize class instances unless their class has a static 'deserialize' method."
        );
      }
    },
  };
};
