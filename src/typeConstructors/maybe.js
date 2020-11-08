const undefinedDef = require("../types/undefined");

const union = require("./union");

module.exports = function maybe(typeDef) {
  return union(typeDef, undefinedDef);
};
