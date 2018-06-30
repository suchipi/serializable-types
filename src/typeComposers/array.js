/* @flow */
import type { TypeDef, TypeWrapper } from "../TypeDef";

module.exports = function array<MemberT, MemberName: string, MemberSerialized>(
  memberDef: TypeDef<MemberT, MemberName, MemberSerialized>
): TypeDef<
  Array<MemberT>,
  "array",
  Array<TypeWrapper<MemberName, MemberSerialized>>
> {
  return {
    name: "array",
    niceName: `Array<${memberDef.niceName || memberDef.name}>`,
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
    deserialize(serialized) {
      return serialized.$value.map((serializedValue) => {
        return memberDef.deserialize(serializedValue);
      });
    },
  };
};
