// Use eval("require") so webpack doesn't bundle the `url` module
const URL = global.URL || eval("require")("url").URL;

module.exports = {
  description: "URL",
  serializedDescription: '{ $type: "URL", $value: string }',

  check(val) {
    return val instanceof URL;
  },

  serialize(url) {
    return {
      $type: "URL",
      $value: url.href,
    };
  },

  checkSerialized(serialized) {
    return serialized.$type === "URL";
  },

  deserialize(serialized) {
    return new URL(serialized.$value);
  },
};
