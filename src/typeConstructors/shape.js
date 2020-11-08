const object = require("./object");

const maybe = require("./maybe");

module.exports = function shape(objectDef) {
  const shapeDef = {};
  const entries = Object.entries(objectDef);
  entries.forEach(([key, typeDef]) => {
    shapeDef[key] = maybe(typeDef);
  });
  return object(shapeDef);
};
