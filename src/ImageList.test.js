import React from 'react';
import ReactDOM from 'react-dom';
import ImageList from './ImageList';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from 'react-testing-library';
import 'jest-dom/extend-expect';

describe('ImageList', () => {
  const images = [
    { id: 1, urls: { thumb: 'test1', full: 'full-image-url-1' } },
    { id: 2, urls: { thumb: 'test2', full: 'full-image-url-2' } },
    { id: 3, urls: { thumb: 'test3', full: 'full-image-url-3' } }
  ];

  it('displays a list of images', () => {
    const { getByTestId } = render(<ImageList images={images} />);
    expect(getByTestId('image-1')).toHaveAttribute('src', 'test1');
    expect(getByTestId('image-2')).toHaveAttribute('src', 'test2');
    expect(getByTestId('image-3')).toHaveAttribute('src', 'test3');
  });

  it('allows the user to open the image modal', () => {
    const { getByTestId } = render(<ImageList images={images} />);
    fireEvent.click(getByTestId('image-1'));
    expect(getByTestId('image-modal')).not.toBeNull();
    expect(getByTestId('selected-image')).toHaveAttribute(
      'src',
      'full-image-url-1'
    );
  });

  it('allows the user to close the image modal', () => {
    const { queryByTestId, getByTestId } = render(<ImageList images={images} />);
    fireEvent.click(getByTestId('image-1'));
    fireEvent.click(getByTestId('selected-image'));
    expect(queryByTestId('image-modal')).toBeNull();
  });

  it('allows the user to like an image', () => {});

  it('allows the user to unlike an image', () => {});
});
