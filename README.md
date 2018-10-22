# serializable-types

`serializable-types` is a combination type checker and value (de)serializer for node and the browser.

It's kind of like [`prop-types`](https://npm.im/prop-types), [`flow-runtime`](https://npm.im/flow-runtime), or [`ow`](https://npm.im/ow), but it can use its type awareness to serialize and deserialize values into JSON-safe objects, kinda like [`ejson`](https://npm.im/ejson).

Here's a code example:

```js
import types from "serializable-types";

// --------------
// Checking types
// --------------

types.boolean.check(true); // true
types.boolean.check(42); // false

types.number.check(42); // true
types.number.check(true); // false

types.array(types.boolean).check([true, false, true]); // true

types
  .object({
    foo: types.number,
    bar: types.tuple(types.string, types.number),
    baz: types.array(types.union(types.Date, types.Buffer)),
  })
  .check({
    foo: 42,
    bar: ["hi", 65],
    baz: [new Date(), Buffer.from("bla bla"), new Date()],
  });
// true

// ---------------
// Asserting types
// ---------------

types.boolean.assert(true); // No error
types.boolean.assert(42); // TypeError: Expected boolean, but received 42​​

types.array(types.boolean).assert([true, false, null]);
// TypeError: ​​Expected Array<boolean>, but received: [ true, false, null ]

types
  .object({
    foo: types.number,
    bar: types.tuple(types.string, types.number),
    baz: types.array(types.union(types.Date, types.Buffer)),
  })
  .assert({
    bad: true,
  });
// TypeError: Expected { foo: number, bar: [string, number], baz: Array<Date | Buffer> }, but received: { "bad" : true }

// ----------------------------------
// Serializing values of a given type
// ----------------------------------

types.Buffer.serialize(Buffer.from("hello"));
// { $type: "Buffer", $value: [104, 101, 108, 108, 111] }

types
  .object({
    data: types.union(types.Buffer, types.string),
    encoding: types.string,
  })
  .serialize({
    data: Buffer.from([104, 101, 108, 108, 111]),
    encoding: "utf-8",
  });
// {
//   $type: "object",
//   $value: {
//     data: {
//       $type: "Buffer",
//       $value: [104, 101, 108, 108, 111],
//     },
//     encoding: { $type: "string", $value: "utf-8" },
//   },
// }

// ------------------------------------
// Deserializing values of a known type
// ------------------------------------

types
  .object({
    data: types.union(types.Buffer, types.string),
    encoding: types.string,
  })
  .deserialize({
    $type: "object",
    $value: {
      data: {
        $type: "Buffer",
        $value: [104, 101, 108, 108, 111],
      },
      encoding: { $type: "string", $value: "utf-8" },
    },
  });
// { data: <Buffer 68 65 6c 6c 6f>, encoding: "utf-8" }
```

Try it out on [RunKit](https://npm.runkit.com/serializable-types)!

## API

The `types` namespace exported by this module has two kinds of objects on it: `TypeDef`s and functions which return `TypeDef`s.

A `TypeDef` is an object that represents a given type within JavaScript, that has methods on it that can be used to work with values of that type.

Every `TypeDef` has this shape:

```js
interface TypeDef {
  // Description of the type, eg `Buffer` or `Array<number>`
  description: string;

  // Description of the type this serializes to, eg `{ $type: "boolean", $value: boolean }`
  serializedDescription: string;

  // Check if a given value is of this type. Returns true if it's this type, false otherwise.
  check(val: any): boolean;

  // Serialize the given value so that it can be encoded as JSON.
  // If the given value is not of this type, an error will be thrown.
  serialize(val: any): Object;

  // Check if a given object can be deserialized to this type. True if it can, false otherwise.
  checkSerialized(serialized: Object): boolean;

  // Deserialize the given object into this type.
  // If the given object cannot be deserialized into this type, an error will be thrown.
  deserialize(serialized: Object): any;

  // Assert that a given value is of this type. Like `check`, but it throws an error if the value is not of this type.
  assert(val: any): void;
}
```

Here is a list of all the `TypeDef`s:

- `types.boolean`
- `types.Buffer`
- `types.Date`
- `types.Element`
- `types.Error`
- `types.false`
- `types.Function`
- `types.integer`
- `types.NaN`
- `types.null`
- `types.number`
- `types.RegExp`
- `types.string`
- `types.Symbol`
- `types.true`
- `types.Int8Array`
- `types.Uint8Array`
- `types.Uint8ClampedArray`
- `types.Int16Array`
- `types.Uint16Array`
- `types.Int32Array`
- `types.Uint32Array`
- `types.Float32Array`
- `types.Float64Array`
- `types.undefined`
- `types.URL`

And here is a list of all the functions which return `TypeDef`s:

- `types.array(memberTypeDef)`
- `types.exactString(string)`
- `types.intersection(...memberTypeDefs)`
- `types.map(keyTypeDef, valueTypeDef)`
- `types.maybe(typeDef)`
- `types.object(typeDefObjectMap)`
- `types.objectMap(valueTypeDef, keyTypeDef)`
- `types.set(memberTypeDef)`
- `types.shape(typeDefObjectMap)`
- `types.tuple(...memberTypeDefs)`
- `types.union(...memberTypeDefs)`

Both the `TypeDef`s and the functions which return `TypeDef`s are documented below.

### `types.boolean`

A `TypeDef` which represents boolean values, either `true` or `false`.

### `types.Buffer`

A `TypeDef` which represents a [`Buffer`](https://nodejs.org/api/buffer.html#buffer_buffer).

### `types.Date`

A `TypeDef` which represents a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

### `types.Element`

A `TypeDef` which represents an [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element).

### `types.Error`

A `TypeDef` which represents an [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

### `types.false`

A `TypeDef` which represents the value `false`.

### `types.Function`

A `TypeDef` which represents a `Function`. Note that functions cannot be (de)serialized.

### `types.integer`

A `TypeDef` which represents integers.

### `types.NaN`

A `TypeDef` which represents the value `NaN`.

### `types.null`

A `TypeDef` which represents the value `null`.

### `types.number`

A `TypeDef` which represents all numbers except `NaN`.

### `types.RegExp`

A `TypeDef` which represents a [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

### `types.string`

A `TypeDef` which represents any string value.

### `types.Symbol`

A `TypeDef` which represents a [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol). Note: only shared Symbols from the global Symbol registry can be (de)serialized.

### `types.true`

A `TypeDef` which represents the value `true`.

### `types.Int8Array`, `types.Uint8Array`, `types.Uint8ClampedArray`, `types.Int16Array`, `types.Uint16Array`, `types.Int32Array`, `types.Uint32Array`, `types.Float32Array`, `types.Float64Array`

`TypeDef`s which represent [typed array views](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays).

### `types.undefined`

A `TypeDef` which represents the value `undefined`.

### `types.URL`

A `TypeDef` which represents a WHATWG [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.

### `types.array(memberTypeDef)`

A function which returns a `TypeDef` which represents a homogenous Array of the given type; for example, `types.array(types.boolean)` represents an Array of unbounded length containing only booleans. This is like `Array<boolean>` in Flow/TypeScript.

### `types.exactString(string)`

A function which returns a `TypeDef` which represents an exact string. For example, `types.exactString("foo")`. This is most useful when combined with `types.union` to simulate enums; for example, `types.union(types.exactString("GET"), types.exactString("POST"))`, which is like `"GET" | "POST"` in Flow/TypeScript.

### `types.intersection(...memberTypeDefs)`

A function which returns a `TypeDef` which represents the intersection of the given `TypeDef`s. It's kind of like a logical "AND". For example:

```js
types.intersection(
  types.object({
    foo: types.number,
  }),
  types.object({
    bar: types.number,
  })
);
```

This is like `{ foo: number } & { bar: number }` in Flow/TypeScript.

### `types.map(keyTypeDef, valueTypeDef)`

A function which returns a `TypeDef` which represents a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), containing the given key and value types. For example, `types.map(types.string, types.Buffer)`. This is like `Map<string, Buffer>` in Flow/TypeScript.

### `types.maybe(typeDef)`

A function which returns a `TypeDef` which represents the union between the given `TypeDef` and `undefined`. For example: `types.maybe(types.string)`. This is similar to `?string` in Flow and `string?` in TypeScript.

This is most useful in object types for representing optional properties, eg:

```js
types.object({
  size: types.number,
  data: types.maybe(types.Buffer),
});
```

### `types.object(typeDefObjectMap)`

A function which returns a `TypeDef` which represents an Object whose properties are typed by the passed `typeDefObjectMap`. For example:

```js
types.object({
  size: types.number,
  data: types.union(types.string, types.Buffer),
  encoding: types.maybe(types.string),
});

// This is similar to the following in Flow/TypeScript:
// {
//   size: number,
//   data: string | Buffer,
//   encoding?: string
// }
```

### `types.objectMap(valueTypeDef, keyTypeDef?)`

A function which returns a `TypeDef` which represents an Object whose keys are arbitrary and whose values are the same. For example:

```js
types.objectMap(types.number, types.string);
// This is similar to `{ [string]: number }` in Flow/TypeScript.
```

Note that the value `TypeDef` is the first argument and the key `TypeDef` is the second argument, which may be somewhat unintuitive. This is because the key `TypeDef` is optional and defaults to `types.union(types.string, types.Symbol)`.

```js
types.objectMap(types.number);
// This is similar to `{ [string | Symbol]: number }` in Flow/TypeScript.
```

### `types.set(memberTypeDef)`

A function which returns a `TypeDef` which represents a [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), containing the given member type. For example, `types.set(types.string)`. This is like `Set<string>` in Flow/TypeScript.

### `types.shape(typeDefObjectMap)`

A function which is the same as `types.object` but all of the object properties in the returned `TypeDef` are wrapped with `types.maybe`. This is similar to `$Shape` in Flow, and is useful for config options, React Props, etc.

### `types.tuple(...memberTypeDefs)`

A function which returns a `TypeDef` which represents an Array of fixed length with typed values at each index. For example:

```js
types.tuple(types.string, types.number);
// This is like `[string, number]` in Flow/TypeScript.
```

### `types.union(...memberTypeDefs)`

A function which returns a `TypeDef` which represents the union of the given `TypeDef`s. It kind of works like a logical "OR". For example:

```js
types.union(types.string, types.number);
// This is like `string | number` in Flow/TypeScript.
```

## License

MIT
