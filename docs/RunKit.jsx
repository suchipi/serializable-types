import * as React from "react";

export default class RunKit extends React.Component {
  componentDidMount() {
    global.RunKit.createNotebook({
      element: this._el,
      source: this.props.children || "",
    });
  }

  render() {
    return <div style={{ margin: "1em 0" }} ref={(el) => (this._el = el)} />;
  }
}
