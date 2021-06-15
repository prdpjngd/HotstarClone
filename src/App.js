import React, { Component, Fragment } from "react";
import { Route, Switch, Link, withRouter,useParams } from "react-router-dom";
import firebase from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddToHomescreen from 'react-add-to-homescreen';

import Login from "./HotStarComponents/AuthComponent/Login";
import Register from "./HotStarComponents/AuthComponent/Register";
import HeaderComponent from "./HotStarComponents/HeaderComponent/Header";
import FooterComponent from "./HotStarComponents/FooterComponent/Footer";
import PasswordReset from "./HotStarComponents/AuthComponent/PasswordReset";
import AddMovieForm from "./HotStarComponents/HotStarAdmin/AddMovieForm";
import ListMovies from "./HotStarComponents/HotStarAdmin/ListMovies";
import ListMovie from "./HotStarComponents/HotStarAdmin/ListMovie";
import PhoneAuth from "./HotStarComponents/AuthComponent/PhoneAuth";
import PlayerPage from './HotStarComponents/HotStarAdmin/PlayerPage'
import NotFoundPage from "./HotStarComponents/HotStarAdmin/NotFoundPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: "" };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      // if (user === null) {
      //   console.log("no user");
      // }
      if (user) {
        let userObj=await user.getIdTokenResult()
        user.admin=userObj.claims.admin|| false
        this.setState({ userData: user });
        // this.props.history.push("/list-movies");
      } else {
        this.setState({ userData: "" });
        this.props.history.push("/login");
      }
    });
  }
  handleAddToHomescreenClick = () => {
    alert(`
      1. Open Share menu
      2. Tap on "Add to Home Screen" button`);
  };  
  
  render() {
    return (
      <Fragment>
        <header>
          <HeaderComponent user={this.state.userData} />
        </header>
        <main style={{minHeight:"1000px"}}>
          <ToastContainer />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/password-reset" component={PasswordReset} />
            <Route path="/phone-auth" component={PhoneAuth} />
            {this.state.userData ? (this.state.userData.admin?
              <Fragment>
                <Route
                  path="/"
                  exact
                  component={() => <ListMovies user={this.state.userData} />}
                />
                <Route
                  path="/profile-page"
                  exact
                  component={() => <AddMovieForm user={this.state.userData} />}
                />
                <Route
                  path="/upload-movies"
                  exact
                  component={() => <AddMovieForm user={this.state.userData} />}
                />
                <Route
                  path="/upload-movies/:imDbId"
                  exact
                  component={() => <AddMovieForm user={this.state.userData} />}
                />
                <Route
                  path="/list-movies"
                  exact
                  component={() => <ListMovies user={this.state.userData} />}
                />
                <Route
                  path="/list-movie/:name/:id"
                  exact
                  component={() => <ListMovie user={this.state.userData} />}
                />
                <Route
                  path="/list-movie/:name/:id/watch/:subId"
                  exact
                  component={() => <PlayerPage user={this.state.userData} />}
                />
                <Route
                  path="/filter/:key/:value"
                  exact
                  component={() => <ListMovies user={this.state.userData} />}
                />
              </Fragment>
            :
            <Fragment>
                <Route
                  path="/"
                  exact
                  component={() => <ListMovies user={this.state.userData} />}
                />
                <Route
                  path="/list-movies"
                  exact
                  component={() => <ListMovies user={this.state.userData} />}
                />
                <Route
                  path="/list-movie/:name/:id"
                  exact
                  component={() => <ListMovie user={this.state.userData} />}
                />
                <Route
                  path="/list-movie/:name/:id/watch/:subId"
                  exact
                  component={() => <PlayerPage user={this.state.userData} />}
                />
                <Route
                  path="/filter/:key/:value"
                  exact
                  component={() => <ListMovies user={this.state.userData} />}
                />
              </Fragment>
            ) : null}
          </Switch>
        </main>
        {/* footer component */}
        <FooterComponent user={this.state.userData} />
        <AddToHomescreen
              title={'Click'} 
              onAddToHomescreenClick={this.handleAddToHomescreenClick} 
            />
      </Fragment>
    );
  }

  Child=()=>{
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
  
    return (
      <div>
        <h3>ID: {id}</h3>
      </div>
    );
  }
}

export default withRouter(App);
