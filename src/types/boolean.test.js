const typeDef = require("./boolean");

test("boolean", () => {
  expect(typeDef.check(true)).toBe(true);
  expect(typeDef.check(false)).toBe(true);

  expect(typeDef.check(42)).toBe(false);

  expect(typeDef.serialize(true)).toEqual({
    $type: "boolean",
    $value: true,
  });

  expect(
    typeDef.checkSerialized({
      $type: "boolean",
      $value: true,
    })
  ).toBe(true);

  expect(
    typeDef.deserialize({
      $type: "boolean",
      $value: false,
    })
  ).toBe(false);
});
