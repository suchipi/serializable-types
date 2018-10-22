import * as React from "react";

export default class NextButton extends React.Component {
  render() {
    return (
      <div
        style={{
          textAlign: "right",
        }}
      >
        <a
          style={{
            fontSize: "1.5em",
            textDecoration: "none",
            backgroundColor: "rgb(206,92,0)",
            color: "white",
            padding: "0.5em",
            borderRadius: "2px",
          }}
          {...this.props}
        />
      </div>
    );
  }
}
