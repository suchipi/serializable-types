# serializable-types

`serializable-types` is a combination type checker and value (de)serializer.

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

## API

Every type object has this shape:

```js
interface Type {
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

  // Assert that a given value is of this type. Like `check`, but it throws an error if the value is now of this type.
  assert(val: any): void;
}
```

Further API documentation forthcoming, but in the meantime you can try it out on [RunKit](https://npm.runkit.com/serializable-types)

## License

MIT
