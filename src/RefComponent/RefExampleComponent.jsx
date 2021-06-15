import React, { Component, Fragment } from "react";

class RefExample extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.VideoPlay = React.createRef();
  }

  VideoPlayBlock = () => {
    this.VideoPlay.current.play();
    this.VideoPlay.current.style.width = "300px";
  };

  render() {
    return (
      <Fragment>
        <h1 ref={this.h1Element}>Ref Example</h1>
        <video
          style={{ width: "100%" }}
          ref={this.VideoPlay}
          onClick={this.VideoPlayBlock}
        >
          <source src="test.mp4" type="video/mp4"></source>
        </video>
      </Fragment>
    );
  }
}

export default RefExample;
