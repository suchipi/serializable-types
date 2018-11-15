const types = require("../..");

test("tuple", () => {
  const t = types.tuple(types.number, types.string);
  expect(t.check([1])).toBe(false);
  expect(t.check([1, "hi"])).toBe(true);
  expect(t.check([1, 1])).toBe(false);

  expect(() => {
    t.serialize([1]);
  }).toThrowErrorMatchingInlineSnapshot(`
"Expected [number, string], but received Array [
  1,
]"
`);
});

test("union of tuples", () => {
  const t = types.union(
    types.tuple(types.number),
    types.tuple(types.number, types.maybe(types.number))
  );

  expect(t.serialize([1])).toMatchInlineSnapshot(`
Object {
  "$type": "tuple",
  "$value": Array [
    Object {
      "$type": "number",
      "$value": 1,
    },
  ],
}
`);

  expect(t.serialize([1, 2])).toMatchInlineSnapshot(`
Object {
  "$type": "tuple",
  "$value": Array [
    Object {
      "$type": "number",
      "$value": 1,
    },
    Object {
      "$type": "number",
      "$value": 2,
    },
  ],
}
`);

  expect(t.serialize([1, undefined])).toMatchInlineSnapshot(`
Object {
  "$type": "tuple",
  "$value": Array [
    Object {
      "$type": "number",
      "$value": 1,
    },
    Object {
      "$type": "undefined",
      "$value": undefined,
    },
  ],
}
`);

  expect(() => t.deserialize(t.serialize([1]))).not.toThrowError();
  expect(() => t.deserialize(t.serialize([1, 2]))).not.toThrowError();
  expect(() => t.deserialize(t.serialize([1, undefined]))).not.toThrowError();
});
