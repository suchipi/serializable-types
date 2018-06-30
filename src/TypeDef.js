/* @flow */
export type TypeWrapper<Name: string, Serialized> = {
  $type: Name,
  $value: Serialized,
};

export type TypeDef<T = any, Name: string = string, Serialized = any> = {
  name: Name,
  niceName?: string,
  check(val: T): boolean,
  serialize(val: T): TypeWrapper<Name, Serialized>,
  deserialize(serialized: TypeWrapper<Name, Serialized>): T,
};
