import React, { Component, Fragment } from "react";
import firebase from "../../firebase";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Video } from "video-metadata-thumbnails";
import axios from "axios";
import { FormCheck } from 'react-bootstrap';
class AddMovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie:{
        name: "",
        imDbId:"",
        thumbnail:"",
        genre: "",
        year: "",
        description: "",
        rating: 0,
        language: "",
        type: "",
        duration: "",
        video: "",
        url: "",
        files:{},
        files2:[],
        tagList:[]
      }
    }
  }

  handleCheck = async e => {
    this.setState(prevState=>{
      let root=Object.assign({}, prevState);
      if(e.target.checked){
        root['movie']['tagList'].push(e.target.name)
        root['movie']['tagList']=[...new Set(root['movie']['tagList'])]
        return root
      }
      else{
        root['movie']['tagList'].pop(e.target.name)
        root['movie']['tagList']=[...new Set(root['movie']['tagList'])]
        return root
      }
    })
  }

  handleChange = async e => {
    e.preventDefault()
    if(e.target.name.split('.')[0]==='root'){
      this.setState(prevState=>{
        let root=Object.assign({}, prevState);
        root['movie'][e.target.name.split('.')[1]]=e.target.value
        return root
      })
    }
    else{
      // this.setState(prevState=>{
      //   let root=Object.assign({}, prevState);
      //   root['movie']['files2'][e.target.name.split('.')[0]]['0'][e.target.name.split('.')[1]]=e.target.value
      //   return root
      // })
    }
  };

  AddFile = async e => {
    e.preventDefault()
    let fileId=Math.random().toString(36).toUpperCase().slice(2,6)
    this.setState(prevState=>{
      let root=Object.assign({}, prevState);
      root['movie']['files'][fileId]={
        '0':{
          link:"",
          thumbnail:"",
          slNo:0,
          title:""
        }
      }
      return root
    })
  }

  AddFileToArray = async e => {
    e.preventDefault()
    let fileId=Math.random().toString(36).toUpperCase().slice(2,6)
    this.setState(prevState=>{
      let root=Object.assign({}, prevState);
      root['movie']['files2']=root['movie']['files2']
      .concat([{
        fileId:fileId,
        link:"",
        thumbnail:"",
        slNo:0,
        title:""
      }])
      return root
    })
    this.setState(prevState=>{
      let root=Object.assign({}, prevState);
      root['movie']['files'][fileId]={
        '0':{
          link:"",
          thumbnail:"",
          slNo:0,
          title:""
        }
      }
      return root
    })
  }

  getFromImDb = async e => {
    //connect to real time database;
    console.log(this.state.movie)
    let movieDetails = this.state.movie;
    let imDbId=movieDetails.imDbId.split('/')[4]
    var config = {
      method: 'get',
      url: `http://www.omdbapi.com/?i=${imDbId}&apikey=584b5752`,
      headers: { 
        'Cookie': '__cfduid=d0d2785f85d8d6c88b1c1ad261138a4fc1618045023'
      }
    };
    let response=await (await axios(config)).data
    this.setState(prevState=>{
      let root=Object.assign({}, prevState);
      root['movie']={
          "imDbId":movieDetails.imDbId,
          "barStatus" : true,
          "description" : response.Plot,
          "duration" : response.Runtime,
          "files" : root['movie'].files,
          "genre" : response.Genre,
          "language" : movieDetails.language,
          "maxVal" : 100,
          "minVal" : 0,
          "name" : response.Title,
          "progress" : 100,
          "rating" : response.Rated,
          "thumbnail" : movieDetails.thumbnail,
          "type" : movieDetails.type||'movie',
          "year" : response.Year,
          "released":response.Released,
          "director":response.Director,
          "writer":response.Writer,
          "actors":response.Actors,
          "poster":response.Poster||"",
          "country":response.Country||"",
          "tagList":response.tagList||[]
      }
      return root
    })
  }


  handleSubmit = async e => {
    e.preventDefault();
    try {
      let final=this.state.movie;
      delete final.files2
      firebase
      .database()
      .ref("hotstarMovie/"+this.state.movie.imDbId.split('/')[4])
      .set({
        ...this.state.movie,
      });
      toast.success("successfully movie created");
    } catch (err) {
      toast.error(err.messages);
    }
  };


  async jsonConcat(o1, o2) {
    for (var key in o2) {
     o1[key] = o2[key];
    }
    return o1;
  }

  async componentDidMount() {
    if(this.props.match.params.imDbId){
      await firebase
      .database()
      .ref("hotstarMovie")
      .child(this.props.match.params.imDbId)
      .on("value", snapShot => {
        let newPost = snapShot.val();
        newPost.id=snapShot.key
        let allFilesId=Object.keys(newPost.files)
        if(allFilesId.length){
          newPost.files2=allFilesId.map(fileId => {
            return {
              fileId:fileId,
              link:newPost.files[fileId]['0'].link,
              thumbnail:newPost.files[fileId]['0'].thumbnail,
              slNo:newPost.files[fileId]['0'].slNo,
              title:newPost.files[fileId]['0'].title
            }
          })
        }
        this.setState(async prevState=>{
          let root=Object.assign({}, prevState);
          root.movie=await this.jsonConcat(root.movie,newPost)
          console.log(root)
          return root
        })
      });
    }
    else{
      console.log("new File Upload")
    }
  };

  handleFileChange = idx => e => {
    let changedFileId=""
    let files2 = this.state.movie.files2.map((file, sidx) => {
      if (idx !== sidx) return file;
      file[e.target.name]=e.target.value;
      changedFileId=file.fileId
      return file
    });
    this.setState(prevState=>{
      let root=Object.assign({}, prevState);
      root['movie']['files'][changedFileId]['0'][e.target.name]=e.target.value
      root['movie']['files2']=files2
      return root
    })
  };


  render() {
    console.log(this.state.movie)
    const ColoredLine = ({ color }) => (
      <hr
          style={{
              color: color,
              backgroundColor: color,
              height: 0.5
          }}
      />
    );
    const ListAllFiles=()=>{
      let allFilesId=Object.keys(this.state.movie.files)
      if(allFilesId.length){
        let finalList=allFilesId.map(fileId => {
          return(
            <Fragment key={fileId}>
            
            <div className="col-md-5">
              <div className="form-group">
                <label htmlFor="subId">subId</label>
                <input
                  type="text"
                  className="form-control"
                  name={fileId+".subId"}
                  value={fileId}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                name={fileId+".title"}
                value={this.state.movie.files[fileId]['0'].title}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="link">File Link</label>
              <input
                type="text"
                className="form-control"
                name={fileId+".link"}
                value={this.state.movie.files[fileId]['0'].link}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="link">Sub Thumbnail</label>
              <input
                type="text"
                className="form-control"
                name={fileId+".thumbnail"}
                value={this.state.movie.files[fileId]['0'].thumbnail}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-md-12"><ColoredLine color="grey" /></div>
            </Fragment>
          )
        });
        return finalList
      }
      else{
        return(
          <Fragment>
          </Fragment>
        )
      }
    }


    return (
      <Fragment>
        <section className="upload-card authBlock">
          <section className="card col-md-8 mx-auto">
            <article className="form-block">
              <h5 className="h5 font-weight-bold p-4">Add Movie to continue</h5>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="imDbId">ImDb Link</label>
                        <input
                          type="text"
                          className="form-control"
                          name="root.imDbId"
                          value={this.state.movie.imDbId||""}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                    <label className="btn btn-link" onClick={this.getFromImDb} htmlFor="imDbId">Get Info From ImDb ⟳</label>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <img style={{height:"200px",width:"auto"}} src={this.state.movie.poster||""} alt="Logo" />
                      </div>
                    </div>  
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="thumbnail">Name of Content </label>
                        <input
                          type="text"
                          className="form-control"
                          name="root.name"
                          value={this.state.movie.name||""}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="thumbnail">Thumbnail Poster [Link]</label>
                        <input
                          type="text"
                          className="form-control"
                          name="root.thumbnail"
                          value={this.state.movie.thumbnail||""}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="form-group">
                        <label htmlFor="language">Language [comma separated]</label>
                        <input
                          type="text"
                          className="form-control"
                          name="root.language"
                          value={this.state.movie.language||""}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select
                          name="root.type"
                          id="type"
                          className="form-control"
                          value={this.state.movie.type||""}
                          onChange={this.handleChange}
                        >
                          <option value="movie">Movie</option>
                          <option value="tv-show">TV Show</option>
                          <option value="tv-show">Sports</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <FormCheck type={'checkbox'}  name={`latest`}
                              label={`Latest & Trending`} onChange={this.handleCheck} checked={this.state.movie.tagList.includes('latest')}/>
                        <FormCheck type={'checkbox'}  name={`popular`}
                              label={`Most Popular`} onChange={this.handleCheck} checked={this.state.movie.tagList.includes('popular')}/>
                        <FormCheck type={'checkbox'}  name={`recommended`}
                              label={`Recommended`} onChange={this.handleCheck} checked={this.state.movie.tagList.includes('recommended')}/>
                      </div>
                    </div>

                    <div className="col-md-12"><ColoredLine color="white" /></div>
                    {this.state.movie.files2.map((file,i) => {
                        return(
                          <Fragment key={file.fileId}>
                          
                          <div className="col-md-5">
                            <div className="form-group">
                              <label htmlFor="subId">subId</label>
                              <input
                                type="text"
                                className="form-control"
                                name={"fileId"}
                                value={file.fileId}
                                onChange={this.handleFileChange(i)}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-5">
                          <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              name={"title"}
                              value={file.title}
                              onChange={this.handleFileChange(i)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="form-group">
                            <label htmlFor="link">File Link</label>
                            <input
                              type="text"
                              className="form-control"
                              name={"link"}
                              value={file.link}
                              onChange={this.handleFileChange(i)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="form-group">
                            <label htmlFor="link">Sub Thumbnail</label>
                            <input
                              type="text"
                              className="form-control"
                              name={"thumbnail"}
                              value={file.thumbnail}
                              onChange={this.handleFileChange(i)}
                            />
                          </div>
                        </div>
                        <div className="col-md-12"><ColoredLine color="grey" /></div>
                          </Fragment>
                        )
                      })}
                    <div className="col-md-5">
                      <div className="form-group">
                        <label htmlFor="subId">subId</label>
                        <input
                          type="text"
                          className="form-control"
                          name={"root.slNo"}
                          value={this.state.movie.slNo||""}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button onClick={this.AddFileToArray} className="btn btn-outline-primary">
                    Add File +
                  </button>

                  <div className="form-group p-2">
                    <button type="submit" className="btn float-right btn-outline-primary">
                      Submit Movie
                    </button>
                  </div>
                </form>
              </div>
            </article>
          </section>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(AddMovieForm);
