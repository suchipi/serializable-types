module.exports = {
  description: "RegExp",
  serializedDescription:
    '{ $type: "RegExp", $value: { pattern: string, flags: string } }',

  check(val) {
    return val instanceof RegExp;
  },

  serialize(regexp) {
    return {
      $type: "RegExp",
      $value: {
        pattern: regexp.source,
        flags: regexp.flags,
      },
    };
  },

  checkSerialized(serialized) {
    return serialized.$type === "RegExp";
  },

  deserialize(serialized) {
    return new RegExp(serialized.$value.pattern, serialized.$value.flags);
  },
};
