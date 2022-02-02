module.exports = function arrayContaining(memberDef) {
  return {
    description: `Array containing at least one ${memberDef.description}`,
    serializedDescription: `{ $type: "array", $value: Array containing at least one ${
      memberDef.serializedDescription
    } }`,

    check(val) {
      return (
        Array.isArray(val) && val.some((member) => memberDef.check(member))
      );
    },

    serialize(array) {
      return {
        $type: "array",
        $value: array.map((member) => memberDef.serialize(member)),
      };
    },

    checkSerialized(serialized) {
      return (
        serialized.$type === "array" &&
        serialized.$value.some((serializedMember) =>
          memberDef.checkSerialized(serializedMember)
        )
      );
    },

    deserialize(serialized) {
      return serialized.$value.map((serializedValue) => {
        return memberDef.deserialize(serializedValue);
      });
    },
  };
};
