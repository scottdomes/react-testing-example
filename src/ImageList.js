import React, { Component } from 'react';

class ImageList extends Component {
  state = { likes: [] };

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
    const { images } = this.props;
    return (
      <div className="App">
        {selectedImage && (
          <div id="image-modal" data-testid="image-modal">
            <img
              data-testid="selected-image"
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
        {images.map(image => {
          return (
            <img
              data-testid={`image-${image.id}`}
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

export default ImageList;
