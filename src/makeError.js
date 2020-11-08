const formatValue = require("./formatValue");

const makeError = function makeError(description, value) {
  return new TypeError(
    `Expected ${description}, but received ${formatValue(value)}`
  );
};

module.exports = makeError;
