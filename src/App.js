import React, { Component } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import ImageList from './ImageList';
import './App.css';

const unsplash = new Unsplash({
  applicationId:
    '9191184823b45cbabafe8da09aa2cfc51fbc41965a1ca59bfaf14b917d9406a0',
  secret: '6d3a4556ba0ad99f0d73d67835b403fcddf5cda7b2dd5a6e372b3852e1aad66c'
});

class App extends Component {
  state = { images: [] };

  componentDidMount() {
    unsplash.photos
      .listPhotos(2, 15, 'latest')
      .then(toJson)
      .then(images => this.setState({ images }));
  }

  render() {
    return <ImageList images={this.state.images} />;
  }
}

export default App;
