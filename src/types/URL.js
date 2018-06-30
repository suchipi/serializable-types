/* @flow */
import type { TypeDef } from "../TypeDef";
const URL = global.URL || require("url").URL;

module.exports = ({
  name: "URL",
  check(val) {
    return val instanceof URL;
  },
  serialize(url) {
    return { $type: "URL", $value: url.href };
  },
  deserialize(serialized) {
    return new URL(serialized.$value);
  },
}: TypeDef<URL, "URL", string>);
