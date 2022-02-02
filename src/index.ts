const dummy: any = "";

export type TypeDef<T> = {
  description: string;
  serializedDescription: string;
  check(val: any): boolean;
  serialize(val: any): any;
  checkSerialized(serialized: any): boolean;
  deserialize(serialized: any): T;
};

const global: typeof globalThis = dummy;

// `TypeDef`s
export const any: TypeDef<any> = dummy;
export const anyObject: TypeDef<{}> = dummy;
export const boolean: TypeDef<boolean> = dummy;
export const Buffer: TypeDef<typeof global.Buffer> = dummy;
export const Date: TypeDef<typeof global.Date> = dummy;
export const Element: TypeDef<typeof global.Element> = dummy;
export const Error: TypeDef<typeof global.Error> = dummy;
export const false_: TypeDef<false> = dummy; // `false` also exists, but TS won't let us do that
export const Function: TypeDef<never> = dummy;
export const Infinity: TypeDef<number> = dummy;
export const integer: TypeDef<number> = dummy;
export const NaN: TypeDef<number> = dummy;
export const NegativeInfinity: TypeDef<number> = dummy;
export const never: TypeDef<never> = dummy;
export const null_: TypeDef<null> = dummy; // `null` also exists, but TS won't let us do that
export const number: TypeDef<number> = dummy;
export const RegExp: TypeDef<typeof global.RegExp> = dummy;
export const string: TypeDef<string> = dummy;
export const Symbol: TypeDef<typeof global.Symbol> = dummy;
export const true_: TypeDef<true> = dummy; // `true` also exists, but TS won't let us do that
export const Int8Array: TypeDef<typeof global.Int8Array> = dummy;
export const Uint8Array: TypeDef<typeof global.Uint8Array> = dummy;
export const Uint8ClampedArray: TypeDef<
  typeof global.Uint8ClampedArray
> = dummy;
export const Int16Array: TypeDef<typeof global.Int16Array> = dummy;
export const Uint16Array: TypeDef<typeof global.Uint16Array> = dummy;
export const Int32Array: TypeDef<typeof global.Int32Array> = dummy;
export const Uint32Array: TypeDef<typeof global.Uint32Array> = dummy;
export const Float32Array: TypeDef<typeof global.Float32Array> = dummy;
export const Float64Array: TypeDef<typeof global.Float64Array> = dummy;
export const undefined: TypeDef<undefined> = dummy;
export const URL: TypeDef<typeof global.URL> = dummy;

// `TypeDef` constructors
export const array = <T extends CoercableToTypeDef>(
  member: T
): TypeDef<Array<Unwrap<T>>> => dummy;

export const arrayContaining = <T extends CoercableToTypeDef>(
  member: T
): TypeDef<Array<T | any>> => dummy;

export const exactNumber: <T extends number>(num: T) => TypeDef<T> = dummy;

export const exactString: <T extends string>(str: T) => TypeDef<T> = dummy;

export const func: (
  params: Array<any>,
  returnValue: any
) => TypeDef<never> = dummy;

export const instanceOf: (klass: any) => TypeDef<never> = dummy;

export const intersection: (
  ...members: Array<CoercableToTypeDef>
) => TypeDef<any> = dummy;

export const map: <K extends CoercableToTypeDef, V extends CoercableToTypeDef>(
  keyTypeDef: K,
  valueTypeDef: V
) => TypeDef<Map<Unwrap<K>, Unwrap<V>>> = dummy;

export const maybe: <T extends CoercableToTypeDef>(
  typeDef: T
) => TypeDef<Unwrap<T> | undefined | null> = dummy;

export const object: <O extends {}>(
  typeDefObjectMap: O
) => TypeDef<{ [K in keyof O]: Unwrap<O[K]> }> = dummy;

interface _objectMap {
  <V extends CoercableToTypeDef>(valueTypeDef: V): TypeDef<
    Record<string | number | symbol, Unwrap<V>>
  >;

  <V extends CoercableToTypeDef, K extends CoercableToTypeDef>(
    valueTypeDef: V,
    keyTypeDef: K
  ): TypeDef<Record<Unwrap<K>, Unwrap<V>>>;
}
export const objectMap: _objectMap = dummy;

export const predicate: (
  matcherFunction: (input: any) => boolean
) => TypeDef<any> = dummy;

export const set: <T>(memberTypeDef: TypeDef<T>) => TypeDef<Set<T>> = dummy;

export const shape: <O extends {}>(
  typeDefObjectMap: O
) => TypeDef<Partial<{ [K in keyof O]: UnwrapTypeDef<O[K]> }>> = dummy;

export const stringMatching: (regex: RegExp) => TypeDef<string> = dummy;

export const symbolFor: (tag: string) => TypeDef<symbol> = dummy;

export const tuple: (
  ...memberTypeDefs: Array<any>
) => TypeDef<Array<any>> = dummy;

export const union: (...memberTypeDefs: Array<any>) => TypeDef<any> = dummy;

// Utility functions
export const assertType: (
  value: any,
  typeDef: CoercableToTypeDef
) => void = dummy;

export const isOfType: <V, T extends CoercableToTypeDef>(
  value: V,
  typeDef: T
) => value is V extends Unwrap<T> ? Unwrap<T> : never = dummy;

export const serializeWithType: <V, T extends CoercableToTypeDef>(
  value: V,
  typeDef: DoCoerceToTypeDef<T> extends TypeDef<V> ? T : never
) => any = dummy;

export const deserializeWithType: <T extends CoercableToTypeDef>(
  serialized: any,
  typeDef: T
) => Unwrap<T> = dummy;

export const installGlobals: () => void = dummy;

export const coerceToType: <V extends CoercableToTypeDef>(
  value: V
) => DoCoerceToTypeDef<V> = dummy;

type UnwrapTypeDef<SomeTypeDef> = SomeTypeDef extends TypeDef<infer U>
  ? U
  : never;

export type CoercableToTypeDef =
  | TypeDef<any>
  | true
  | false
  | null
  | undefined
  | number
  | (typeof object | typeof Object)
  | typeof global.URL
  | typeof global.Symbol
  | typeof global.RegExp
  | typeof global.Function
  | typeof global.Error
  | typeof global.Element
  | typeof global.Buffer
  | typeof global.Date
  | typeof global.String
  | typeof global.Number
  | typeof global.Boolean
  | typeof global.Array
  | string
  | number
  | Array<any>
  | Function
  | {};

type DoCoerceToTypeDef<V> =
  // prettier-ignore
  V extends TypeDef<any> ? V :
  V extends true ? typeof true_ :
  V extends false ? typeof false_ :
  V extends null ? typeof null_ :
  V extends undefined ? TypeDef<undefined> :
  V extends number ? TypeDef<number> :
  V extends (typeof object | typeof Object) ? typeof anyObject :
  V extends typeof global.URL ? typeof URL :
  V extends typeof global.Symbol ? typeof Symbol :
  V extends typeof global.RegExp ? typeof RegExp :
  V extends typeof global.Function ? typeof Function :
  V extends typeof global.Error ? typeof Error :
  V extends typeof global.Element ? typeof Element :
  V extends typeof global.Buffer ? typeof Buffer :
  V extends typeof global.Date ? typeof Date :
  V extends typeof global.String ? typeof string :
  V extends typeof global.Number ? typeof number :
  V extends typeof global.Boolean ? typeof boolean :
  V extends typeof global.Array ? TypeDef<Array<any>> :
  V extends string ? TypeDef<V> : // exactString
  V extends number ? TypeDef<V> : // exactNumber
  V extends Array<any> ? TypeDef<Array<any>> : // tuple
  V extends Function ? TypeDef<never> :
  V extends {} ? TypeDef<{ [K in keyof V]: DoCoerceToTypeDef<V[K]> }> :
  never;

export type Unwrap<T extends CoercableToTypeDef> = UnwrapTypeDef<
  DoCoerceToTypeDef<T>
>;
