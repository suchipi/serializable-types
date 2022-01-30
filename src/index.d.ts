// `TypeDef`s
export const anyObject: TypeDef<{}>;
export const boolean: TypeDef<boolean>;
export const Buffer: TypeDef<Buffer>;
export const Date: TypeDef<Date>;
export const Element: TypeDef<Element>;
export const Error: TypeDef<Error>;
export const false_: TypeDef<false>; // `false` also exists, but TS won't let us do that
export const Function: TypeDef<never>;
export const Infinity: TypeDef<number>;
export const integer: TypeDef<number>;
export const NaN: TypeDef<number>;
export const NegativeInfinity: TypeDef<number>;
export const never: TypeDef<never>;
export const null_: TypeDef<null>; // `null` also exists, but TS won't let us do that
export const number: TypeDef<number>;
export const RegExp: TypeDef<RegExp>;
export const string: TypeDef<string>;
export const Symbol: TypeDef<Symbol>;
export const true_: TypeDef<true>; // `true` also exists, but TS won't let us do that
export const Int8Array: TypeDef<Int8Array>;
export const Uint8Array: TypeDef<Uint8Array>;
export const Uint8ClampedArray: TypeDef<Uint8ClampedArray>;
export const Int16Array: TypeDef<Int16Array>;
export const Uint16Array: TypeDef<Uint16Array>;
export const Int32Array: TypeDef<Int32Array>;
export const Uint32Array: TypeDef<Uint32Array>;
export const Float32Array: TypeDef<Float32Array>;
export const Float64Array: TypeDef<Float64Array>;
export const undefined: TypeDef<undefined>;
export const URL: TypeDef<URL>;

// `TypeDef` constructors
export const array: <T>(member: TypeDef<T>) => TypeDef<Array<T>>;
export const exactNumber: <T extends number>(num: T) => TypeDef<T>;
export const exactString: <T extends string>(str: T) => TypeDef<T>;
export const func: (
  params: Array<TypeDef<any>>,
  returnValue: TypeDef<any>
) => TypeDef<never>;
export const instanceOf: (klass: any) => TypeDef<never>;
export const intersection: (...members: Array<TypeDef<any>>) => TypeDef<any>;
export const map: <K extends string | number | symbol, V>(
  keyTypeDef: TypeDef<K>,
  valueTypeDef: TypeDef<V>
) => TypeDef<Map<K, V>>;
export const maybe: <T>(typeDef: TypeDef<T>) => TypeDef<T | undefined | null>;
export const object: <O extends {}>(
  typeDefObjectMap: O
) => TypeDef<{ [K in keyof O]: UnwrapTypeDef<O[K]> }>;
export const objectMap: <V, K extends string | number | symbol>(
  valueTypeDef: TypeDef<V>,
  keyTypeDef: TypeDef<K>
) => TypeDef<Record<K, V>>;
export const set: <T>(memberTypeDef: TypeDef<T>) => TypeDef<Set<T>>;
export const shape: <O extends {}>(
  typeDefObjectMap: O
) => TypeDef<Partial<{ [K in keyof O]: UnwrapTypeDef<O[K]> }>>;
export const symbolFor: (tag: string) => TypeDef<symbol>;
export const tuple: (...memberTypeDefs: Array<any>) => TypeDef<Array<any>>;
export const union: (...memberTypeDefs: Array<any>) => TypeDef<any>;

// Utility functions
export const assertType: (value: any, typeDef: CoercableToTypeDef) => void;
export const isOfType: <T extends CoercableToTypeDef>(
  value: any,
  typeDef: T
) => value is UnwrapTypeDef<T>;
export const serializeWithType: <V, T extends CoercableToTypeDef>(
  value: V,
  typeDef: CoerceToTypeDef<T> extends TypeDef<V> ? T : never
) => any;
export const deserializeWithType: <T extends CoercableToTypeDef>(
  serialized: any,
  typeDef: T
) => UnwrapTypeDef<CoerceToTypeDef<T>>;
export const installGlobals: () => void;
export const coerceToType: <V extends CoercableToTypeDef>(
  value: V
) => CoerceToTypeDef<V>;

export type TypeDef<T> = {
  description: string;
  serializedDescription: string;
  check(val: any): boolean;
  serialize(val: any): any;
  checkSerialized(serialized: any): boolean;
  deserialize(serialized: any): T;
};

export type UnwrapTypeDef<SomeTypeDef> = SomeTypeDef extends TypeDef<infer U>
  ? U
  : never;

export type CoercableToTypeDef =
  // prettier-ignore
  TypeDef<any>
    | true
    | false
    | null
    | undefined
    | number
    | (st["object"] | typeof Object)
    | typeof URL
    | typeof Symbol
    | typeof RegExp
    | typeof Function
    | typeof Error
    | typeof Element
    | typeof Buffer
    | typeof Date
    | typeof String
    | typeof Number
    | typeof Boolean
    | string
    | number
    | Array<any>
    | Function
    | {};

export type CoerceToTypeDef<V> =
  // prettier-ignore
  V extends TypeDef<any> ? V :
    V extends true ? st["true"] :
    V extends false ? st["false"] :
    V extends null ? st["null"] :
    V extends undefined ? st["undefined"] :
    V extends number ? TypeDef<number> :
    V extends (st["object"] | typeof Object) ? st["anyObject"] :
    V extends typeof URL ? st["URL"] :
    V extends typeof Symbol ? st["Symbol"] :
    V extends typeof RegExp ? st["RegExp"] :
    V extends typeof Function ? st["Function"] :
    V extends typeof Error ? st["Error"] :
    V extends typeof Element ? st["Element"] :
    V extends typeof Buffer ? st["Buffer"] :
    V extends typeof Date ? st["Date"] :
    V extends typeof String ? st["string"] :
    V extends typeof Number ? st["number"] :
    V extends typeof Boolean ? st["boolean"] :
    V extends string ? TypeDef<V> :
    V extends number ? TypeDef<V> :
    V extends Array<any> ? TypeDef<Array<any>> : // tuple
    V extends Function ? TypeDef<never> :
    V extends {} ? TypeDef<{ [K in keyof V]: CoerceToTypeDef<V[K]> }> :
    never;
