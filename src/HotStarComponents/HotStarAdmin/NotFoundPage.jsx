import React, { Component, Fragment } from "react";
import { withRouter,Link } from "react-router-dom";



class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  async componentDidMount() {
  }

  render() {
    return (
      <Fragment>
        <div className="watch-area">
        <div className="content-wrapper">
            <h3 style={{textAlign:"center"}}>404</h3>
            <p style={{textAlign:"center"}}>Oh! Page not found</p>
            <button type="button" className="home-btn" onClick={(e) => {
            window.location.href='/';
            }}>Disney+ Hotstar HOME</button>
            </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(NotFoundPage);
