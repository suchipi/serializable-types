const makeError = require("./makeError");
const { coerce } = require("./coercion");

function assertType(value, type) {
  const normalizedType = coerce(type);
  if (!normalizedType.check(value)) {
    throw makeError(normalizedType.description, value);
  }
}

function isOfType(value, type) {
  return coerce(type).check(value);
}

function serializeWithType(value, type) {
  const normalizedType = coerce(type);
  if (!normalizedType.check(value)) {
    throw makeError(normalizedType.description, value);
  }

  return normalizedType.serialize(value);
}

function deserializeWithType(serialized, type) {
  const normalizedType = coerce(type);
  if (!normalizedType.checkSerialized(serialized)) {
    throw makeError(normalizedType.serializedDescription, serialized);
  }

  return normalizedType.deserialize(serialized);
}

module.exports = {
  assertType,
  isOfType,
  serializeWithType,
  deserializeWithType,
};
