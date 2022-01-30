const types = require("./types");
const { coercingTypeConstructors, coerce } = require("./coercion");
const apiFunctions = require("./apiFunctions");
const installGlobals = require("./installGlobals");

const serializableTypes = Object.assign(
  {
    installGlobals,
    coerceToType: coerce,
  },
  types,
  coercingTypeConstructors,
  apiFunctions,
);

module.exports = serializableTypes;
