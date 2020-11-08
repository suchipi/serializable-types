module.exports = {
  description: "number",
  serializedDescription: '{ $type: "number", $value: number }',

  check(val) {
    return (
      typeof val === "number" &&
      !Number.isNaN(val) &&
      val !== Infinity &&
      val !== -Infinity
    );
  },

  serialize(number) {
    return {
      $type: "number",
      $value: number,
    };
  },

  checkSerialized(serialized) {
    return serialized.$type === "number";
  },

  deserialize(serialized) {
    return serialized.$value;
  },
};
