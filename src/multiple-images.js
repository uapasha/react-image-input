import React, { PropTypes, Component } from 'react';
import images from './utils/images';
import ImagePreview from './preview/image-preview';

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
     * @param {bool} [multipleUpload = false] - able to select and upload multiple images at once
     * is supported only if no crop applied
     * @ param {object} [sizes] - sizes for saving images in multiple sizes for example:
       * {
       *   small: {
       *     maxWidth: 400,
       *     maxHeight: 300,
       *   },
       *   medium: {
       *     maxWidth: 700,
       *   },
       *   large: {
       *    maxWidth: 1024,
       *    },
       * }
     */
    options: PropTypes.object,
  };

  constructor(props) {
    super(props);
    if (props.options) {
      this.resize = props.options.resize !== false;
      this.maxWidth = props.options.maxWidth || 400;
      this.maxHeight = props.options.maxHeight || 300;
      this.sizes = props.options.sizes;
    } else {
      this.maxWidth = this.defaultMaxImageWidth;
      this.maxHeight = this.defaultMaxImageHeight;
    }
  }

  handleNewUrls = (previewData) => {
    const { promisifiedImagesUrls } = previewData;
    if (promisifiedImagesUrls) {
      if (!this.sizes) {
        this.handleImages(promisifiedImagesUrls);
      } else {
        this.handleResizes(promisifiedImagesUrls);
      }
    } else {
      throw new Error(
        'Image preview should supply { promisifiedImagesUrls } if dealing with multiple upload'
      );
    }
  };

  handleResizes = (promisifiedImagesUrls) => {
    const sizes = this.sizes;
    const imagesAmount = promisifiedImagesUrls.length;
    Promise.all(promisifiedImagesUrls)
      .then((imagesData) => {
        const res = [];
        Object.keys(sizes).forEach(size => (
          res.push(...imagesData.map(
            ({ imageData, imageType }) => (
              images.resizeImage(imageData, imageType, sizes[size].maxWidth, sizes[size].maxHeight)
            )
          )))
        );
        return res;
      })
      .then((resizePromises) => Promise.all(resizePromises))
      .then((resizedImages) => (
          resizedImages.map(({ resizedImageData, imageType }) => (
            images.convertToBlob(resizedImageData, imageType)
          ))
        )
      )
      .then((imagesFiles) => {
        const res = [];
        const sizesAmount = Object.keys(sizes).length;
        const filesAmount = imagesFiles.length;
        imagesFiles.forEach((blob, i) => {
          const size = Object.keys(sizes)[Math.floor(i / filesAmount * sizesAmount)];
          const imageNum = i % imagesAmount;
          if (res[imageNum]) {
            res[imageNum].push({ size, blob });
          } else res[imageNum] = [{ size, blob }];
        });
        this.handleImagesUpload(res);
      })
      .catch(e => console.error(e));
  };

  handleImages = (promisifiedImagesUrls) => {
    if (this.resize) {
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
        .then((imagesFiles) => this.handleImagesUpload(imagesFiles))
        .catch((e) => this.onError(e));
    } else {
      Promise.all(promisifiedImagesUrls)
        .then((imagesData) => (
          imagesData.map(
            ({ imageData, imageType }) => images.convertToBlob(imageData, imageType)
          )
        ))
        .then((imagesFiles) => this.handleImagesUpload(imagesFiles))
        .catch((e) => this.onError(e));
    }
  };

  handleImagesUpload = (imagesFiles) => {
    this.props.onFileSelect(imagesFiles);
  };

  clearImageData = () => {
    this.props.onFileSelect('');
  };

  render() {
    const { options, ...props } = this.props;
    return (
      <ImagePreview
        setImageUrl={this.handleNewUrls}
        clearImageData={this.clearImageData}
        options={options}
        {...props}
      />
    );
  }
}

export default MultipleImages;
