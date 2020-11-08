module.exports = function set(memberDef) {
  return {
    description: `Set<${memberDef.description}>`,
    serializedDescription: `{ $type: "Set", $value: Array<${
      memberDef.serializedDescription
    }> }`,

    check(val) {
      return (
        val instanceof Set &&
        Array.from(val).every((member) => memberDef.check(member))
      );
    },

    serialize(set) {
      return {
        $type: "Set",
        $value: Array.from(set).map((member) => memberDef.serialize(member)),
      };
    },

    checkSerialized(serialized) {
      return (
        serialized.$type === "Set" &&
        serialized.$value.every((serializedMember) =>
          memberDef.checkSerialized(serializedMember)
        )
      );
    },

    deserialize(serialized) {
      return new Set(
        serialized.$value.map((serializedValue) => {
          return memberDef.deserialize(serializedValue);
        })
      );
    },
  };
};
