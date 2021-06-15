import React, { Component, Fragment } from "react";
class ChildrenComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "deepshika",
      age: 20,
    };
  }
  render() {
    return (
      <Fragment>
        <h1>Hello children component</h1>
      </Fragment>
    );
  }
}

export default ChildrenComponent;
