/* @flow */
import type { TypeDef, SerializationWrapper } from "../TypeDef";
const decorateTypeDef = require("../decorateTypeDef");

type SerializedElement = {
  element: { tagName: string, namespaceURI: ?string },
  attributes: Array<{ namespaceURI: ?string, name: string, value: string }>,
  children: Array<
    SerializationWrapper<SerializedElement> | SerializationWrapper<string>
  >,
};

module.exports = decorateTypeDef(
  ({
    description: "Element | TextNode",
    serializedDescription:
      '{ $type: "Node", $value: string | { element: { tagName: string, namespaceURI: ?string }, attributes: Array<{ namespaceURI: ?string, name: string, value: string }>, children: Array } }',
    check(val) {
      return (
        val instanceof global.Node && (val.nodeType === 1 || val.nodeType === 3)
      );
    },
    serialize(node) {
      if (node instanceof Element) {
        return {
          $type: "Element",
          $value: {
            element: {
              tagName: node.tagName,
              namespaceURI: node.namespaceURI,
            },
            attributes: Array.from(node.attributes).map(
              ({ namespaceURI, name, value }) => ({ namespaceURI, name, value })
            ),
            children: Array.from(node.childNodes).map((child) =>
              this.serialize(child)
            ),
          },
        };
      } else {
        return {
          $type: "TextNode",
          $value: node.nodeValue,
        };
      }
    },
    checkSerialized(serialized) {
      return serialized.$type === "Element" || serialized.$type === "Node";
    },
    deserialize(serialized) {
      const document = global.document;
      if (document == null) {
        throw new Error(
          "Cannot deserialize an Element without a global document in scope"
        );
      }
      if (typeof serialized.$value === "string") {
        return document.createTextNode(serialized.$value);
      } else {
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
      }
    },
  }: TypeDef<Element | Node, SerializedElement | string>)
);
