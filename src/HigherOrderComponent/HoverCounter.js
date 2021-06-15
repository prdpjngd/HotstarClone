import React, { Component, Fragment } from "react";
import withCounter from "./withCounter";
class HoverCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { count, IncrementCounter, changeText } = this.props;
    return (
      <Fragment>
        <div>
          <p className="btn btn-danger" onMouseEnter={IncrementCounter}>
            hover me {count} {changeText}
          </p>
        </div>
      </Fragment>
    );
  }
}

export default withCounter(HoverCounter);
