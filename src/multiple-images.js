import React, { PropTypes, Component } from 'react';
import images from './utils/images';
import ImagePreview from './image-preview';


class MultipleImages extends Component {
  static propTypes = {
    /**
     * @param {function} onFileSelect - will be called when image selection
     * process is completed. Returns an array of Blobs
     */
    onFileSelect: PropTypes.func.isRequired,
    /**
     *  @param {function} [onError] - callback called when user select wrong fileType
     */
    onError: PropTypes.func,
    /**
     * @param {object} [options] - options for the component
     * @param {array} [options.allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif']] -
     * allowed file types in form of 'image/jpeg'
     * @param {bool} [options.fullWidth = false] - format of the image to be displayed
     * @param {bool} [options.resize = true] - resize image before upload
     * @param {number} [options.maxHeight = 300] - max value for height of resized image in px
     * @param {number} [options.maxWidth = 400] - max value for width of resized image in px
     * @param {bool} [options.immediateUpload = false] - upload image immediately
     * @param {bool} [multipleUpload = false] - able to select and upload multiple images at once
     * is supported only if no crop applied
     */
    options: PropTypes.object,
  };

  constructor(props) {
    super(props);
    if (props.options) {
      this.resize = props.options.resize !== false;
      this.immediateUpload = props.options.immediateUpload;
      this.maxWidth = props.options.maxWidth || 400;
      this.maxHeight = props.options.maxHeight || 300;
    } else {
      this.maxWidth = this.defaultMaxImageWidth;
      this.maxHeight = this.defaultMaxImageHeight;
    }
  }

  handleNewUrl = (previewData) => {
    const { promisifiedImagesUrls } = previewData;
    if (promisifiedImagesUrls) {
      this.handleMultipleImages(promisifiedImagesUrls);
    } else {
      throw new Error(
        'Image preview should supply promisifiedImagesUrls if dealing with multiple upload'
      );
    }
  };

  handleMultipleImages = (promisifiedImagesUrls) => {
    Promise.all(promisifiedImagesUrls)
      .then((imagesData) => (
        imagesData.map(
          ({ imageData, imageType }) => (
            images.resizeImage(imageData, imageType, this.maxWidth, this.maxHeight)
          )
        )
      ))
      .then((resizePromises) => Promise.all(resizePromises))
      .then((resizedImages) => (
          resizedImages.map(({ resizedImageData, imageType }) => (
            images.convertToBlob(resizedImageData, imageType)
          ))
        )
      )
      .then((imagesFiles) => this.handleMultipleImagesUpload(imagesFiles))
      .catch((e) => this.onError(e));
  };

  handleMultipleImagesUpload = (imagesFiles) => {
    this.props.onFileSelect(imagesFiles);
  };

  clearImageData = () => {
    this.props.onFileSelect('');
  };

  render() {
    const { options, ...props } = this.props;
    return (
      <ImagePreview
        setImageUrl={this.handleNewUrl}
        clearImageData={this.clearImageData}
        options={options}
        {...props}
      />
    );
  }
}

export default MultipleImages;
