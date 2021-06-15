import React, { Component, Fragment } from "react";
import { withRouter,Link,useParams} from "react-router-dom";

import firebase from "../../firebase";

class ListMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: "",
      duration: "",
      user:"",
    };
  }
  VideoPlayOrPaused = () => {
  };

  async componentDidMount() {
    await firebase
      .database()
      .ref("hotstarMovie")
      .child(this.props.match.params.id)
      .on("value", snapShot => {
        let newPost = snapShot.val();
        this.setState({ movie: newPost });
      });
  }

  ListEpisodes=()=>{
    if(this.state.movie.files){
      let filesIds=Object.keys(this.state.movie.files);
      let Movies = filesIds.map(episode => (
        <Fragment key={episode}>
          <Link to={{
              pathname: `/list-movie/${this.state.movie.name}/${this.props.match.params.id}/watch/${episode}`,
              state: {
                id: this.props.match.params.id,
                name: this.props.match.params.name,
                subId: episode,
              },
            }}>
              <div className="card1">
                <img className="card-image" src={this.state.movie.files[episode][0].thumbnail||this.state.movie.thumbnail} alt="Logo" />
                <div className="image-overlay"></div>
                <p className="card-text" >{(this.state.movie.files[episode][0].title.length>75)?this.state.movie.files[episode][0].title.slice(0,75)+"...":this.state.movie.files[episode][0].title}</p>
              </div>
          </Link>
        </Fragment>
      ))
      return (Movies)
    }
    else{
      return (<h6>Loading.....</h6>)
    }
  }
  render() {
    let {
      name,
      url,
      year,
      type,
      rating,
      description,
      language,
      thumbnail,
      files
    } = this.state.movie;
    let date = new Date(year).getFullYear();
    let filesIds=[]
    if(this.state.movie.files){
      filesIds=Object.keys(this.state.movie.files);
      let value="TRAILER"
      filesIds=filesIds.filter(function(item) {
        return item !== value
      })
    }
    return (
      <Fragment>
        <section className="moviesBlock movieBlockId">
          <article className="row mainPlayerBlock">
            <main ref={this.mainVideoRef}>
              <h2>{name}</h2>
              <div className="descriptionBlock hide-mobile">
                <ul>
                  <li>
                    <span>{date}</span>
                  </li>
                  <li>
                    <span>{type}</span>
                  </li>
                  <li>
                    <span>{rating}</span>
                  </li>
                  <li>
                    <span>{language}</span>
                  </li>
                </ul>
              </div>
              <div>
                <p>{description}</p>
              </div>
              <footer>
                <div className="watchBlock">
                  <span>
                    <i className="fas fa-play"></i>
                  </span>
                  <Link to={{
                      pathname: `/list-movie/${name}/${this.props.match.params.id}/watch/${filesIds[0]||'TRAILER'}`,
                      state: {
                        id: this.props.match.params.id,
                        name: this.props.match.params.name,
                        subId: filesIds[0]||'TRAILER',
                      },
                    }}>
                    Watch Now
                  </Link>
                  {(this.props.user.admin===true?
                                        <><span> | </span>
                                        <Link to={{
                                          pathname: `/upload-movies/${this.props.match.params.id}`,
                                        }}>
                                        Edit Files
                                        </Link></>:<></>)}

                </div>
              </footer>
            </main>
            <div className="containerBlock"></div>
            {/* <div className="image-gradient" ref={this.image_gradientRef}></div> */}
            <aside className="afterFullWidth" ref={this.afterFullWidth}>
                <img className="thumbnail_video" src={thumbnail} alt="Logo" />
            </aside>
          </article>
        </section>
        <section className="top-space-70">
          <h6>Select from These</h6>
          <div class="cards-wrapper"><this.ListEpisodes/></div>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(ListMovie);
