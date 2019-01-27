import React, { Component } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import './App.css';

const unsplash = new Unsplash({
  applicationId:
    '9191184823b45cbabafe8da09aa2cfc51fbc41965a1ca59bfaf14b917d9406a0',
  secret: '6d3a4556ba0ad99f0d73d67835b403fcddf5cda7b2dd5a6e372b3852e1aad66c'
});

class App extends Component {
  state = { images: [], likes: [] };

  componentDidMount() {
    unsplash.photos
      .listPhotos(2, 15, 'latest')
      .then(toJson)
      .then(images => this.setState({ images }));
  }

  selectImage = selectedImage => {
    this.setState({ selectedImage });
  };

  likeSelectedImage = () => {
    const newLikes = this.state.likes.concat({
      image: this.state.selectedImage.id
    });
    this.setState({ likes: newLikes });
  };

  unlikeSelectedImage = () => {
    const newLikes = this.state.likes.filter(
      like => like.image !== this.state.selectedImage.id
    );
    this.setState({ likes: newLikes });
  };

  get isLiked() {
    return this.state.likes.find(
      like => like.image === this.state.selectedImage.id
    );
  }

  render() {
    const { selectedImage } = this.state;
    return (
      <div className="App">
        {selectedImage && (
          <div id="image-modal">
            <img
              alt="Selected"
              src={selectedImage.urls.full}
              onClick={() => this.selectImage(null)}
            />
            <button
              onClick={
                this.isLiked ? this.unlikeSelectedImage : this.likeSelectedImage
              }>
              {this.isLiked ? 'Liked ❤️' : 'Like'}
            </button>
          </div>
        )}
        {this.state.images.map(image => {
          return (
            <img
              onClick={() => this.selectImage(image)}
              alt="Thumbnail"
              key={image.id}
              src={image.urls.thumb}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
