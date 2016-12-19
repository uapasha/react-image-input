import React, { PropTypes, Component } from 'react';
import images from '../utils/images';
import messages from '../utils/messages';

import CordovaPreview from './basic_components/cordova-preview-component';
import DefaultPreview from './basic_components/default-preview-component';

const defaultFileTypes = ['image/jpeg', 'image/png', 'image/gif'];

class ImagePreview extends Component {
  static propTypes ={
    imageUrl: PropTypes.string,
    DefaultImage: PropTypes.oneOfType([
      PropTypes.func, PropTypes.object,
    ]),
    clearImageData: PropTypes.func,
    setImageUrl: PropTypes.func,
    onError: PropTypes.func,
    options: PropTypes.object,
    isCordova: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    if (props.options) {
      this.allowedFileTypes = props.options.allowedFileTypes
        || ['image/jpeg', 'image/png', 'image/gif'];
      this.acceptFileTypes = this.allowedFileTypes.join(',');
      this.multipleUpload = props.options.multipleUpload
        && !this.props.options.crop
        || false;
    } else {
      this.allowedFileTypes = defaultFileTypes;
    }
  }

  onFileChange = (e) => {
    const { files } = e.target;
    if (!files.length) {
      this.props.clearImageData();
    } else if (this.multipleUpload && files[0] instanceof File) {
      this.handleMultipleFiles(files);
    } else if (files.length === 1) {
      if (!(files[0] instanceof File)) {
        this.props.setImageUrl({ imageData: files[0], imageType: 'image/jpeg' });
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          const { imageType } = this.checkFile(reader.result);
          if (!imageType) return;
          this.props.setImageUrl({ imageData: reader.result, imageType });
        };
      }
    }
    if (this.imageInput) this.imageInput.value = null;
  };

  handleCordovaImage = () => {
    const onDeviceReady = () => {
      if (!navigator || !navigator.camera) {
        throw new Error('Camera plugin is not available');
      }
      navigator.camera.getPicture(
        (url) => this.onFileChange({ target: { files: [`data:image/jpeg;base64,${url}`] } }),
        (e) => console.error(e), {
          quality: 50,
          targetHeight: 1024,
          targetWidth: 1024,
          sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
          destinationType: Camera.DestinationType.DATA_URL,
          mediaType: Camera.MediaType.PICTURE,
          correctOrientation: true,
        }
      );
    };
    document.addEventListener('deviceready', onDeviceReady, false);
  };

  checkFile = (imageUrl) => {
    const { onError } = this.props;
    const imageType = images.getImageType(imageUrl);
    if (!~this.allowedFileTypes.indexOf(imageType)) {
      onError(
        `${messages['wrong_file_type']}${this.allowedFileTypes.join(', ')}`
      );
      return {};
    }
    return { imageType };
  };

  handleMultipleFiles = (files) => {
    const promisifiedImagesUrls = [];
    Array.prototype.forEach.call(files, (file) => {
      const promisifiedReader = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const { imageType } = this.checkFile(reader.result);
          if (!imageType) reject('File type is not supported');
          resolve({ imageData: reader.result, imageType });
        };
      });
      promisifiedImagesUrls.push(promisifiedReader);
    });
    this.props.setImageUrl({ promisifiedImagesUrls });
  };

  render() {
    const { isCordova, imageUrl, DefaultImage, options, clearImageData } = this.props;
    const fullWidth = options && options.fullWidth;
    return (
      isCordova
        ? <CordovaPreview
          DefaultImage={DefaultImage}
          fullWidth={fullWidth}
          clearImageData={clearImageData}
          imageUrl={imageUrl}
          onImageSelect={this.handleCordovaImage}
        />
        : <DefaultPreview
          imageUrl={imageUrl}
          DefaultImage={DefaultImage}
          fullWidth={fullWidth}
          clearImageData={clearImageData}
          allowedFileTypes={this.allowedFileTypes}
          multipleUpload={this.multipleUpload}
          onFileChange={this.onFileChange}
          ref={(preview) => { if (preview) this.imageInput = preview.imageInput; }}
        />
    );
  }
}

export default ImagePreview;
