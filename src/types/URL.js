/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");
const URL = global.URL || require("url").URL;

module.exports = decorateTypeDef(
  ({
    description: "URL",
    serializedDescription: '{ $type: "URL", $value: string }',
    check(val) {
      return val instanceof URL;
    },
    serialize(url) {
      return { $type: "URL", $value: url.href };
    },
    checkSerialized(serialized) {
      return serialized.$type === "URL";
    },
    deserialize(serialized) {
      return new URL(serialized.$value);
    },
  }: TypeDef<URL, string>)
);
