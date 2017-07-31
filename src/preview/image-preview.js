import React, { PropTypes, Component } from 'react';
import images from '../utils/images';
import messages from '../utils/messages';

import CordovaPreview from './basic_components/cordova-preview-component';
import DefaultPreview from './basic_components/default-preview-component';

const defaultFileTypes = ['image/jpeg', 'image/png', 'image/gif'];

class ImagePreview extends Component {
  static propTypes ={
    imageUrl: PropTypes.string,
    defaultImage: PropTypes.oneOfType([
      PropTypes.func, PropTypes.object,
    ]),
    onImageSizeGet: PropTypes.func,
    clearImageData: PropTypes.func,
    setImageUrl: PropTypes.func,
    onError: PropTypes.func,
    options: PropTypes.object,
    isCordova: PropTypes.bool,
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    resize: PropTypes.bool,
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
    const { onImageSizeGet, setImageUrl } = this.props;
    const { files } = e.target;
    if (!files.length) {
      this.props.clearImageData();
    } else if (this.multipleUpload && files[0] instanceof File) {
      this.handleMultipleFiles(files);
    } else if (files.length === 1) {
      if (!(files[0] instanceof File)) {
        if (onImageSizeGet) {
          const image = new Image();
          image.src = files[0];
          image.onload = () => {
            onImageSizeGet({ width: image.width, height: image.height });
          };
        }
        setImageUrl({ imageData: files[0], imageType: 'image/jpeg' });
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          const { imageType } = this.checkFile(reader.result);
          if (!imageType) return;
          if (onImageSizeGet) {
            const image = new Image();
            image.src = reader.result;
            image.onload = () => {
              onImageSizeGet({ width: image.width, height: image.height });
            };
          }
          setImageUrl({ imageData: reader.result, imageType });
        };
      }
    }
    if (this.imageInput) this.imageInput.value = null;
  };

  handleCordovaImage = () => {
    const { resize } = this.props;
    let maxWidth;
    let maxHeight;
    if (resize) {
      maxWidth = this.props.maxWidth;
      maxHeight = this.props.maxHeight;
    }
    const onDeviceReady = () => {
      if (!navigator || !navigator.camera) {
        throw new Error('Camera plugin is not available');
      }
      navigator.camera.getPicture(
        (url) => this.onFileChange({ target: { files: [`data:image/jpeg;base64,${url}`] } }),
        (e) => console.error(e),
        {
          quality: 50,
          targetHeight: maxHeight || 1024,
          targetWidth: maxWidth || 1024,
          sourceType: window.Camera.PictureSourceType.SAVEDPHOTOALBUM,
          destinationType: window.Camera.DestinationType.DATA_URL,
          mediaType: window.Camera.MediaType.PICTURE,
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
    const { onImageSizeGet, setImageUrl } = this.props;
    const promisifiedImagesUrls = [];
    Array.prototype.forEach.call(files, (file) => {
      const promisifiedReader = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const { imageType } = this.checkFile(reader.result);
          if (!imageType) reject('File type is not supported');
          if (!onImageSizeGet) resolve({ imageData: reader.result, imageType });
          else {
            const image = new Image();
            image.src = reader.result;
            image.onload = () => {
              onImageSizeGet({ width: image.width, height: image.height }, () => {
                resolve({ imageData: reader.result, imageType });
              });
            };
          }
        };
      });
      promisifiedImagesUrls.push(promisifiedReader);
    });
    setImageUrl({ promisifiedImagesUrls });
  };

  render() {
    const { isCordova, imageUrl, defaultImage, options, clearImageData } = this.props;
    const fullWidth = options && options.fullWidth;
    return (
      isCordova
        ? <CordovaPreview
          DefaultImage={defaultImage}
          fullWidth={fullWidth}
          clearImageData={clearImageData}
          imageUrl={imageUrl}
          onImageSelect={this.handleCordovaImage}
        />
        : <DefaultPreview
          imageUrl={imageUrl}
          DefaultImage={defaultImage}
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
