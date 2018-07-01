/* @flow */
export type SerializationWrapper<SerializedValueType> = {
  $type: string,
  $value: SerializedValueType,
};

export type TypeDef<ValueType, SerializedValueType = ValueType> = {
  description: string,
  serializedDescription: string,
  check(val: any): boolean,
  serialize(val: ValueType): SerializationWrapper<SerializedValueType>,
  checkSerialized(serialized: SerializationWrapper<any>): boolean,
  deserialize(serialized: SerializationWrapper<SerializedValueType>): ValueType,
};
