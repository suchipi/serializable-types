/* @flow */
import type { TypeDef } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");

type SerializedElement = {
  element: { tagName: string, namespaceURI: ?string },
  attributes: Array<{ namespaceURI: ?string, name: string, value: string }>,
  children: Array<SerializedElement>,
};

// TODO: only copies child elements, not child nodes, so text nodes are lost
module.exports = decorateTypeDef(
  ({
    description: "Element",
    serializedDescription:
      '{ $type: "Element", $value: { element: { tagName: string, namespaceURI: ?string }, attributes: Array<{ namespaceURI: ?string, name: string, value: string }>, innerHTML: string } }',
    check(val) {
      return val instanceof Element;
    },
    serialize(element: Element) {
      return {
        $type: "Element",
        $value: {
          element: {
            tagName: element.tagName,
            namespaceURI: element.namespaceURI,
          },
          attributes: Array.from(element.attributes).map(
            ({ namespaceURI, name, value }) => ({ namespaceURI, name, value })
          ),
          children: Array.from(element.children).map((child) =>
            this.serialize(child)
          ),
        },
      };
    },
    checkSerialized(serialized) {
      return serialized.$type === "Element";
    },
    deserialize(serialized) {
      const document = global.document;
      if (document == null) {
        throw new Error(
          "Cannot deserialize an Element without a global document in scope"
        );
      }
      const { element, attributes, children } = serialized.$value;
      let el;
      if (element.namespaceURI != null) {
        el = document.createElementNS(element.namespaceURI, element.tagName);
      } else {
        el = document.createElement(element.tagName);
      }
      attributes.forEach(({ namespaceURI, name, value }) => {
        if (namespaceURI != null) {
          el.setAttributeNS(namespaceURI, name, value);
        } else {
          el.setAttribute(name, value);
        }
      });
      children.forEach((child) => el.appendChild(this.deserialize(child)));
      return el;
    },
  }: TypeDef<Element, SerializedElement>)
);
