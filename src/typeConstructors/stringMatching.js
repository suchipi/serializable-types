module.exports = function stringMatching(regex) {
  return {
    description: `string matching ${regex.toString()}`,
    serializedDescription: `{ $type: "string", $value: string matching ${regex.toString()} }`,

    check(val) {
      return regex.test(val);
    },

    serialize(val) {
      return {
        $type: "string",
        $value: val,
      };
    },

    checkSerialized(serialized) {
      return serialized.$type === "string" && regex.test(serialized.$value);
    },

    deserialize(serialized) {
      return serialized.$value;
    },
  };
};
