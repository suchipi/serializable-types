module.exports = function array(memberDef) {
  return {
    description: `Array<${memberDef.description}>`,
    serializedDescription: `{ $type: "array", $value: Array<${
      memberDef.serializedDescription
    }> }`,

    check(val) {
      return (
        Array.isArray(val) && val.every((member) => memberDef.check(member))
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
        serialized.$value.every((serializedMember) =>
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
