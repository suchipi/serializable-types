/* @flow */
const baseTypes = require("./types");
const typeComposers = require("./typeComposers");

const types = Object.assign({}, baseTypes, typeComposers);

module.exports = types;
