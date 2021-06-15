import React, { Component } from "react";
import faker from "faker/locale/en_IND";
const withCounter = (WrappedComponent) => {
  class Counter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0,
        text: null,
      };
    }
    IncrementCounter = () => {
      this.setState((prevState) => {
        return { count: prevState.count + 1, text: faker.name.findName() };
      });
    };

    render() {
      return (
        <WrappedComponent
          count={this.state.count}
          IncrementCounter={this.IncrementCounter}
          changeText={this.state.text}
        />
      );
    }
  }
  return Counter;
};

export default withCounter;
