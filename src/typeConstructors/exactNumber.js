module.exports = function exactNumber(num) {
  return {
    description: JSON.stringify(num),
    serializedDescription: `{ $type: "number", $value: ${JSON.stringify(
      num
    )} }`,

    check(val) {
      return val === num;
    },

    serialize(val) {
      return {
        $type: "number",
        $value: val,
      };
    },

    checkSerialized(serialized) {
      return serialized.$type === "number" && serialized.$value === num;
    },

    deserialize(serialized) {
      return serialized.$value;
    },
  };
};
