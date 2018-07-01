/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");

module.exports = decorateTypeDef(
  ({
    description: "Error",
    serializedDescription:
      '{ $type: "Error", $value: { name: string, message: string, stack: string } }',
    check(val) {
      return val instanceof Error;
    },
    serialize(error) {
      return {
        $type: "Error",
        $value: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      };
    },
    checkSerialized(serialized) {
      return serialized.$type === "Error";
    },
    deserialize(serialized) {
      const error = new Error(serialized.$value.message);
      Object.defineProperty(error, "name", { value: serialized.$value.name });
      Object.defineProperty(error, "stack", { value: serialized.$value.stack });
      return error;
    },
  }: TypeDef<Error, { name: string, message: string, stack: string }>)
);
