module.exports = {
  description: "integer",
  serializedDescription: '{ $type: "integer", $value: number }',

  check(val) {
    return typeof val === "number" && parseInt(String(val)) === val;
  },

  serialize(integer) {
    return {
      $type: "integer",
      $value: integer,
    };
  },

  checkSerialized(serialized) {
    return serialized.$type === "integer";
  },

  deserialize(serialized) {
    return serialized.$value;
  },
};
