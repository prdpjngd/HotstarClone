import React, { Component, Fragment } from "react";

class LifeCycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "shashi",
      count: 0,
    }; //initializing state
    console.log("CONSTRUCTOR BLOCK EXECUTING ...initializing state");
    this.changeName = this.changeName.bind(this);
  }
  static getDerivedStateFromProps(prop, state) {
    console.log("I am getDerivedStateFromProps");
    return null;
  }

  async componentDidMount() {
    //best place for calling Ajax calls or network calls
    let res = await window.fetch("https://api.github.com/users");
    let data = await res.json();
    console.log(data);
    console.log(
      "COMPONENTDIDMOUNT LOADS ONLY ONCE IN A DOM BEST PLACE FOR CALLING AJAX"
    );
  }
  changeName() {
    this.setState({ count: this.state.count + 1 });
    //re rendering getDerivedStateFromProps , and render

    console.log(this.state.count);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("SHOULD COMPONENT UPDATE");
    return this.state.name !== nextState.name;
    // return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("GET SNAPSHOT BEFORE UPDATE");
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("COMPONENT DID UPDATE");
    return null;
  }
  render() {
    console.log("I am Render method i will be loading every time DOM updated");
    return (
      <Fragment>
        <h1>Life Cycle Methods in react {this.state.count}</h1>
        <button onClick={this.changeName}>Update count</button>
      </Fragment>
    );
  }
}

export default LifeCycle;
