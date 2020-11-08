const prettyFormat = require("pretty-format");

function formatValue(value) {
  return prettyFormat(value);
}

module.exports = formatValue;
