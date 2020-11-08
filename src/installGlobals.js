const types = require("./types");
const { coercingTypeConstructors } = require("./coercion");
const apiFunctions = require("./apiFunctions");

function installGlobals() {
  Object.assign(global, apiFunctions, coercingTypeConstructors, {
    boolean: types.boolean,
    integer: types.integer,
    number: types.number,
    string: types.string,
    never: types.never,
  });
}

module.exports = installGlobals;
