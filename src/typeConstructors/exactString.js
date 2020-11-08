module.exports = function exactString(str) {
  return {
    description: JSON.stringify(str),
    serializedDescription: `{ $type: "string", $value: ${JSON.stringify(
      str
    )} }`,

    check(val) {
      return val === str;
    },

    serialize(val) {
      return {
        $type: "string",
        $value: val,
      };
    },

    checkSerialized(serialized) {
      return serialized.$type === "string" && serialized.$value === str;
    },

    deserialize(serialized) {
      return serialized.$value;
    },
  };
};
