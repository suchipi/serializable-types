const types = require("./types");
const { coercingTypeConstructors } = require("./coercion");
const apiFunctions = require("./apiFunctions");
const installGlobals = require("./installGlobals");

const serializableTypes = Object.assign(
  {
    installGlobals,
  },
  types,
  coercingTypeConstructors,
  apiFunctions
);

module.exports = serializableTypes;
