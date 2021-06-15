/* eslint-disable no-unused-expressions */
import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "../../firebase";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

class ListMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("hotstarMovie")
      .on("value", hotstarMovies => {
        let movieInfo = [];
        hotstarMovies.forEach(movie => {
          movieInfo.push({
            _id: movie.val().id,
            id: movie.key,
            url: movie.val().url,
            name: movie.val().name,
            rating: movie.val().rating,
            description: movie.val().description,
            type: movie.val().type,
            language: movie.val().language,
            year: movie.val().year,
            user: this.props.user,
            thumbnail:movie.val().thumbnail,
            poster:movie.val().poster||movie.val().thumbnail,
            tagList:movie.val().tagList||[],
            slNo:movie.val().slNo||100
          });
        });
        movieInfo=movieInfo.sort(function(a,b){
          return a.slNo||10 - b.slNo||10;
          }
        );
        // for (let index = 0; index < 9; index++) {
        //   movieInfo.push(movieInfo[0])
        // }
        this.setState({ movies: movieInfo });
      });

    try {
    } catch (err) {
      toast.error(err.message);
    }
  }

  ListMovies=(filter={})=>{
    if(this.state.movies.length){
      let Movies = this.state.movies.map(movie => {
        if(filter.tags){
          if(movie.tagList){
            if(movie.tagList.includes(filter.tags)){
              return (<Fragment key={movie.id}>
                <Link to={{
                    pathname: `/list-movie/${movie.name}/${movie.id}`,
                    state: {
                      id: movie.id,
                      name: movie.name
                    },
                  }}>
                    <div className="card1">
                      <img className="card-image" src={movie.thumbnail} alt="Logo" />
                      <div className="image-overlay"></div>
                      <p className="card-text" >{movie.name}</p>
                    </div>
                </Link>
                </Fragment>)
            }
          }
        }
        else if(filter.type){
          if(movie.type){
            if(movie.type===(filter.type)){
              return (<Fragment key={movie.id}>
                <Link to={{
                    pathname: `/list-movie/${movie.name}/${movie.id}`,
                    state: {
                      id: movie.id,
                      name: movie.name
                    },
                  }}>
                    <div className="card1">
                      <img className="card-image" src={movie.thumbnail} alt="Logo" />
                      <div className="image-overlay"></div>
                      <p className="card-text" >{movie.name}</p>
                    </div>
                </Link>
                </Fragment>)
            }
          }
        }
        else{
          return (<Fragment key={movie.id}>
            <Link to={{
                pathname: `/list-movie/${movie.name}/${movie.id}`,
                state: {
                  id: movie.id,
                  name: movie.name
                },
              }}>
                <div className="card1">
                      <img className="card-image" src={movie.thumbnail} alt="Logo" />
                      <div className="image-overlay"></div>
                      <p className="card-text" >{movie.name}</p>
                </div>
            </Link>
            </Fragment>)
        }
      })
      return (Movies)
    }
    else{
    return Array.from({length: 10}, () => Math.floor(Math.random() * 10)).map(()=>{
        return (<div>

        <div className="card1">
        <SkeletonTheme color="#172235" highlightColor="#212d42">
        <Skeleton height={130} width={240} color="#172235" duration={1} count={1}/>
        </SkeletonTheme>
        </div>

      </div>)
    })
    }
  }

  ListMovies2=(filter={})=>{
    if(this.state.movies.length){
      let Movies = this.state.movies.map(movie => {
        if(filter.tags){
          if(movie.tagList){
            console.log(movie.tagList.includes(filter.tags))
            if(movie.tagList.includes(filter.tags)){
              return (        <Fragment key={movie.id}>
                <Link to={{
                    pathname: `/list-movie/${movie.name}/${movie.id}`,
                    state: {
                      id: movie.id,
                      name: movie.name
                    },
                  }}>
                    <div className="card2">
                      <img className="card-image" src={movie.poster} alt="Logo" />
                      <div className="image-overlay"></div>
                      <p className="card-text" >{movie.name}</p>
                    </div>
                </Link>
              </Fragment>)
            }
          }
        }
        else if(filter.type){
          if(movie.type){
            if(movie.type===(filter.type)){
              return (<Fragment key={movie.id}>
                <Link to={{
                    pathname: `/list-movie/${movie.name}/${movie.id}`,
                    state: {
                      id: movie.id,
                      name: movie.name
                    },
                  }}>
                    <div className="card2">
                      <img className="card-image" src={movie.poster} alt="Logo" />
                      <div className="image-overlay"></div>
                      <p className="card-text" >{movie.name}</p>
                    </div>
                </Link>
              </Fragment>)
            }
          }
        }
        else{
          return (<Fragment key={movie.id}>
            <Link to={{
                pathname: `/list-movie/${movie.name}/${movie.id}`,
                state: {
                  id: movie.id,
                  name: movie.name
                },
              }}>
                <div className="card2">
                  <img className="card-image" src={movie.poster} alt="Logo" />
                  <div className="image-overlay"></div>
                  <p className="card-text" >{movie.name}</p>
                </div>
            </Link>
          </Fragment>)
        }
      })
      return (Movies)
    }
    else{
      return Array.from({length: 10}, () => Math.floor(Math.random() * 10)).map(()=>{
        return (<div>

        <div className="card2">
        <SkeletonTheme color="#172235" highlightColor="#212d42">
        <Skeleton height={200} width={140} color="#172235" duration={1} count={1}/>
        </SkeletonTheme>
        </div>

      </div>)
      })
    }
  }

  FilterResult=()=>{
    if(this.props.match.params.key&&this.props.match.params.value){
      let Movies = this.state.movies.map(movie => {
        if(movie[this.props.match.params.key]!=this.props.match.params.value){
          return <></>
        }
        return (<Fragment key={movie.id}>
          <Link  style={{display:"inline-block"}} to={{
              pathname: `/list-movie/${movie.name}/${movie.id}`,
              state: {
                id: movie.id,
                name: movie.name
              },
            }}>
              <div className="card1">
                <img className="card-image" src={movie.thumbnail} alt="Logo" />
                <div className="image-overlay"></div>
                <p className="card-text" >{movie.name}</p>
              </div>
          </Link>
        </Fragment>)
      })
      return Movies
    }
    return <></>
  }

  FilterList=()=>{
    if(this.props.match.params.key&&this.props.match.params.value){
      return (<section>
      <h6>Filter Result </h6>
      <div class="cards-wrapper" style={{display:"inline-block"}} ><this.FilterResult/></div>
      </section>)
    }
    else{
      return <></>
    }
  }


  render() {
    let Movies = this.state.movies.map(movie => (
      <Fragment key={movie.id}>
        <div className="col-md-2 thumbnail_video_block">
          <div className="videoBlock">
            <div className="thumbnail_video">
              <img className="thumbnail_video" src={movie.thumbnail} alt="Logo" />
            </div>
            <div className="videoContentBlock">
              <h5>{movie.name}</h5>

              <div className="movieContentBlock">
                <p>{movie.type},</p>
                <p>{movie.language},</p>
                <p>{movie.year}</p>
              </div>
              <p className="movieDescriptionBlock">{movie.description}</p>
              <p className="watchMovieBlock">
                <span>
                  <span>
                    <i className="fas fa-play"></i>
                  </span>
                  <Link
                    to={{
                      pathname: `/list-movie/${movie.name}/${movie.id}`,
                      state: {
                        id: movie.id,
                        name: movie.name,
                        url: movie.url,
                      },
                    }}
                  >
                    Watch
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    ));

    return (
      <Fragment>
        <div className="home-screen-wrapper">
        </div>

        <div>
      <this.FilterList/>
        <section>
          <h6>Latest & New Arrival</h6>
          <div class="cards-wrapper"><this.ListMovies tags={'latest'}/></div>
        </section>
        <section>
          <h6> Most Popular </h6>
          <div class="cards-wrapper"><this.ListMovies2 tags={'popular'}/></div>
        </section>
        <section>
          <h6>Movies</h6>
          <div class="cards-wrapper"><this.ListMovies type={'movie'}/></div>
        </section>
        <section>
          <h6>Series & TV Shows</h6>
          <div class="cards-wrapper"><this.ListMovies type={'tv-show'} /></div>
        </section>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(ListMovies);
