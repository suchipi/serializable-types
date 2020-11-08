const typeDef = require("./Buffer");

test("Buffer", () => {
  const b = Buffer.from("abc");

  expect(typeDef.check(b)).toBe(true);
  expect(typeDef.check("not a buffer")).toBe(false);

  expect(typeDef.serialize(b)).toEqual({
    $type: "Buffer",
    $value: [97, 98, 99],
  });

  expect(
    typeDef.checkSerialized({
      $type: "Buffer",
      $value: [97, 98, 99],
    })
  ).toBe(true);

  const b2 = typeDef.deserialize({
    $type: "Buffer",
    $value: [97, 98, 99],
  });
  expect(Buffer.isBuffer(b2)).toBe(true);
  expect(b2.toString()).toBe("abc");
});
