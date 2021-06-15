import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "../../firebase";
import "./FooterStyles.css";

class FooterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(_ => {
        toast.success("successfully user signout");
        this.props.history.push("/login");
      })
      .catch(err => toast.error(err.message));
  };

  render() {
    let { photoURL, displayName, email } = this.props.user;

    let AnonymousUser = () => {
      return (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link text-uppercase" to="/login">
              login
            </Link>
          </li>
        </Fragment>
      );
    };

    let AdminUser = () => {
      return (
        <Fragment>
          <li className="nav-item profile_block">
            <a className="nav-link text-uppercase">
              <img src={photoURL} alt={displayName} />
            </a>
            <ul className="dropdownMenu">
              <li>
                <a href="/">Watchlist</a>
              </li>
              <li>
                <a href="/">My Profile ({displayName})</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-uppercase" to="/upload-movies">
                  Upload Movies
                </Link>
              </li>
              <li>
                <a href="/login" onClick={this.signOut}>
                  signout
                </a>
              </li>
            </ul>
          </li>
        </Fragment>
      );
    };

    let AuthUser = () => {
      return (
        <Fragment>
          <li className="nav-item profile_block">
            <a className="nav-link text-uppercase">
              <img src={photoURL} alt={displayName} />
            </a>
            <ul className="dropdownMenu">
              <li>
                <a href="/">Watchlist</a>
              </li>
              <li>
              <a href="/">My Profile ({displayName})</a>
              </li>
              <li>
                <a href="/login" onClick={this.signOut}>
                  signout
                </a>
              </li>
            </ul>
          </li>
        </Fragment>
      );
    };
    return (
      <Fragment>
              <footer class="site-footer">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-12 col-md-6">
                      <h6>About</h6>
                      <p class="text-justify">Coldstar.net <i>It is a OpenSource </i> initiative  only for educational purpose for upcoming programmers to Learn Web Development. ColdStar focuses on to Clone Other Websites Stylings . We will help programmers build up concepts in different programming languages that include  HTML, CSS, Bootstrap, JavaScript, Algorithm.</p>
                    </div>

                    <div class="col-xs-6 col-md-3">
                      <h6>Categories</h6>
                      <ul class="footer-links">
                        <li><a href="/type/tv-shows">TV</a></li>
                        <li><a href="/type/movie">Movies</a></li>
                        <li><a href="/type/sports">Sports</a></li>
                        <li><a href="/type/kids">Kids</a></li>
                        <li><a href="/type/premium">Premium</a></li>
                      </ul>
                    </div>

                    <div class="col-xs-6 col-md-3">
                      <h6>Quick Links</h6>
                      <ul class="footer-links">
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/contact">Contribute</a></li>
                        <li><a href="/dmca">dmca</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="container">
                  <div class="row">
                    <div class="col-md-8 col-sm-6 col-xs-12">
                      <p class="copyright-text">Copyright &copy; 2021 All Rights Reserved by 
                  <a href="/"> Coldstar.net</a>
                      </p>
                    </div>

                    {/* <div class="col-md-4 col-sm-6 col-xs-12">
                      <ul class="social-icons">
                        <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                        <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                        <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
                        <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>   
                      </ul>
                    </div> */}
                  </div>
                </div>
          </footer>
      </Fragment>
    );
  }
}

export default withRouter(FooterComponent);
