const booleanDef = require("./boolean");

test("boolean", () => {
  expect(booleanDef.check(true)).toBe(true);
  expect(booleanDef.check(false)).toBe(true);
  expect(booleanDef.check(42)).toBe(false);

  expect(booleanDef.serialize(true)).toEqual({
    $type: "boolean",
    $value: true,
  });

  expect(
    booleanDef.checkSerialized({
      $type: "boolean",
      $value: true,
    })
  ).toBe(true);

  expect(
    booleanDef.deserialize({
      $type: "boolean",
      $value: true,
    })
  ).toBe(true);
});
