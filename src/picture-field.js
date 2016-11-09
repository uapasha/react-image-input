/** === input for uploading image component for react ===
 * User can select picture and crop it
 * You can also resize image before upload
 */

import React, { PropTypes, Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import images from '/lib/images';
import CropperDialog from './cropper-dialog';
import ImagePreview from './image-preview';

const styles = {
  root: {
    textAlign: 'center',
    position: 'relative',
  },
};

class PictureField extends Component {
  static propTypes = {
    /**
     *  @param {string} [savedImage] - url to image that is already saved
     */
    savedImage: PropTypes.string,
    /**
     * @param {function} [defaultImage] - React component that renders
     * placeholder if savedImage is not provided
     */
    defaultImage: PropTypes.oneOfType([
      PropTypes.func, PropTypes.object,
    ]),
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
     * @param {bool} [isUploading] - state of uploading of the image
     * be called when left button is pressed
     */
    isUploading: PropTypes.bool,
    /**
     *  @param {function} onImageDelete - callback called when deleteImage button pressed
     */
    onImageDelete: PropTypes.func,
    /**
     * @param {object} [options] - options for the component
     * @param {array} [options.allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif']] -
     * allowed file types in form of 'image/jpeg'
     * @param {bool} [options.fullWidth = false] - format of the image to be displayed
     * @param {bool} [options.resize = true] - resize image before upload
     * @param {number} [options.maxHeight = 300] - max value for height of resized image in px
     * @param {number} [options.maxWidth = 400] - max value for width of resized image in px
     * @crop {bool} [options.crop = true] - crop image before upload
     * @param {number} [options.cropAspectRatio = 1] - cropAspectRatio
     * @param {bool} [options.immediateUpload = false] - upload image immediately
     * @param {bool} [multipleUpload = false] - able to select and upload multiple images at once
     * is supported only if no crop applied
     */
    options: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: '',
      isCropperOpen: false,
      imageType: '',
    };
    if (props.options) {
      this.resize = props.options.resize !== false;
      this.crop = props.options.crop !== false;
      this.immediateUpload = props.options.immediateUpload;
      this.maxWidth = props.options.maxWidth || 400;
      this.maxHeight = props.options.maxHeight || 300;
    } else {
      this.maxWidth = this.defaultMaxImageWidth;
      this.maxHeight = this.defaultMaxImageHeight;
    }
  }

  onCrop = (canvas) => {
    // toBlob polyfill
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value(callback, type, quality) {
          const binStr = atob(this.toDataURL(type, quality).split(',')[1]);
          const len = binStr.length;
          const arr = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }
          callback(new Blob([arr], { type: type || 'image/png' }));
        },
      });
    }
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.handleUpload({
          imageData: reader.result,
          imageType: this.state.imageType,
          blob,
        });
      };
    }, `${this.state.imageType}`);
  };

  convertToBlob = (dataUrl, type) => {
    const binStr = atob(dataUrl.split(',')[1]);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: type || 'image/png' });
  };

  handleNewUrl = (previewData) => {
    const { promisifiedImagesUrls, imageData, imageType } = previewData;
    if (promisifiedImagesUrls) {
      this.handleMultipleImages(promisifiedImagesUrls);
      return;
    }
    if (!this.resize && !this.crop) {
      this.handleUpload({
        imageData,
        imageType,
      });
    } else if (this.resize) {
      images.resizeImage(imageData, imageType, this.maxWidth, this.maxHeight)
        .then(({ resizedImageData }) => {
          if (this.crop) {
            this.setState({
              imagePreviewUrl: resizedImageData,
              imageType,
              isCropperOpen: true,
            });
          } else {
            this.handleUpload({
              imageData: resizedImageData,
              imageType,
            });
          }
        })
        .catch((err) => this.props.onError(err));
    } else if (this.crop) {
      this.setState({
        imagePreviewUrl: imageData,
        imageType,
        isCropperOpen: true,
      });
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
          this.convertToBlob(resizedImageData, imageType)
          ))
        )
      )
      .then((imagesFiles) => this.handleUpload({ imagesFiles }))
      .catch((e) => this.onError(e));
  };

  handleUpload = ({ imageData, imageType, blob, imagesFiles }) => {
    if (imagesFiles) {
      this.props.onFileSelect(imagesFiles);
      this.setState({
        imagePreviewUrl: '',
        imageType: '',
      });
    } else if (this.immediateUpload) {
      this.props.onFileSelect([blob || this.convertToBlob(imageData, imageType)]);
      this.setState({
        imagePreviewUrl: '',
        imageType: '',
      });
    } else {
      this.props.onFileSelect([blob || this.convertToBlob(imageData, imageType)]);
      this.setState({
        imagePreviewUrl: imageData,
        imageType,
      });
    }
  };

  clearImageData = (deleteImage) => {
    this.setState({ imagePreviewUrl: '' });
    this.props.onFileSelect('');
    if (deleteImage && this.props.savedImage) {
      this.props.onImageDelete();
    }
  };

  render() {
    const { savedImage, isUploading, options, ...props } = this.props;
    const cropAspectRatio = options && options.cropAspectRatio;
    const { imagePreviewUrl } = this.state;
    return (
      <div>
        <div style={styles.root}>
          {isUploading
            ? <div className="image-upload-uploading">
              <CircularProgress />
            </div>
            : ''}
          <ImagePreview
            imageUrl={imagePreviewUrl || savedImage}
            setImageUrl={this.handleNewUrl}
            clearImageData={this.clearImageData}
            options={options}
            {...props}
          />
        </div>
        <CropperDialog
          imagePreviewUrl={this.state.imagePreviewUrl}
          imageType={this.state.imageType}
          open={this.state.isCropperOpen}
          closeDialog={() => this.setState({ isCropperOpen: false })}
          onCrop={this.onCrop}
          cropAspectRatio={cropAspectRatio}
        />
      </div>
    );
  }
}

export default PictureField; // eslint-disable-line new-cap
