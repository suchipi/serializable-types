/* @flow */
import type { TypeDef, SerializationWrapper } from "../TypeDef";
import type { DecoratedTypeDef } from "../decorateTypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = function array<MemberT, MemberSerialized>(
  memberDef: TypeDef<MemberT, MemberSerialized>
): DecoratedTypeDef<
  Array<MemberT>,
  Array<SerializationWrapper<MemberSerialized>>
> {
  return decorateTypeDef({
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
  });
};
