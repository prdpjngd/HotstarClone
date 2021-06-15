import React, { Component, Fragment } from "react";
import { withRouter,Link } from "react-router-dom";
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import ListMovie from './ListMovie'
import firebase from "../../firebase";
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';

// player.source = {
//   type: 'video',
//   title: 'Example title',
//   sources: [
//     {
//       src: '/path/to/movie.mp4',
//       type: 'video/mp4',
//       size: 720,
//     },
//     {
//       src: '/path/to/movie.webm',
//       type: 'video/webm',
//       size: 1080,
//     },
//   ],
//   poster: '/path/to/poster.jpg',
//   previewThumbnails: {
//     src: '/path/to/thumbnails.vtt',
//   },
//   tracks: [
//     {
//       kind: 'captions',
//       label: 'English',
//       srclang: 'en',
//       src: '/path/to/captions.en.vtt',
//       default: true,
//     },
//     {
//       kind: 'captions',
//       label: 'French',
//       srclang: 'fr',
//       src: '/path/to/captions.fr.vtt',
//     },
//   ],
// };

class PlayerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie:"" 
    };
  }


  async componentDidMount() {
    await firebase
      .database()
      .ref("hotstarMovie")
      .child(this.props.location.state.id)
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
                <p className="card-text" >{this.state.movie.files[episode][0].title}</p>
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
      year,
      type,
      rating,
      description,
      genre,
      language,
      thumbnail,
      files
    } = this.state.movie;
    let videoSrc = {}
    let date = new Date(year).getFullYear();
    let videoLink=""
    if(files){
      let episode=files[this.props.location.state.subId][0]
      if(episode.link.includes('youtube')){
        videoSrc = {
          type: "video",
          sources: [
            {
              src: episode.link.split('=')[1],
              provider: "youtube"
            }
          ]
        };
      }
      else{
        videoLink=episode.link
        console.log('Video h')
        videoSrc = {
          type: "video",
          sources: [
            {
              src: episode.link,
              type: 'video/mp4',
              size: 720,
            },
            {
              src: episode.link,
              type: 'video/mp4',
              size: 1080,
            }
          ]
        };
      }
    }
    

    return (
      <Fragment>
        <div className="watch-area">
        {/* <ShakaPlayer autoPlay src={videoLink} /> */}
          <Plyr source={videoSrc} />
        </div>
        {/* some cards here... */}
        <section>
          <div class="detail-area">
            <div class="detail-title">
              <h5>{name}</h5>
            </div>
            <span class="tag-holder">
              <a href="/genres/superhero" to="/genres/superhero" target="">
                {genre}
              </a>
            </span>
            <span class="dot"></span>
            <span class="meta-data-holder">
              <span class="meta-deta">{year}</span>
              <span class="dot"></span>
              <span class="meta-deta">{rating}</span>
            </span>
            <div class="description">{description}</div>
          </div>
          <h6>More Like This</h6>
          <div class="cards-wrapper">
            <this.ListEpisodes/>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(PlayerPage);
