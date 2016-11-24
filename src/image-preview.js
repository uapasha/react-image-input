import React, { PropTypes, Component } from 'react';
import Avatar from 'material-ui/Avatar';
import { IconButton, RaisedButton } from 'material-ui';
import ImageIcon from 'material-ui/svg-icons/image/image';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import images from './utils/images';
import messages from './utils/messages';

const imagePreviewStyles = {
  root: {
    width: 'initial',
    height: '100%',
  },
  imageIcon: {
    height: 120,
    width: 120,
  },
  fullWidthPicture: {
    width: '100%',
  },
  onHover: {
    root: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255,255,255,0.7)',
      top: 0,
      left: 0,
      zIndex: 2,
    },
    uploadIcon: {
      width: 60,
      height: 60,
      position: 'absolute',
      top: 'calc(50% - 30px)',
      right: 'calc(50% - 30px)',
    },
    deleteIcon: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  },
  input: {
    display: 'none',
  },
};

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
  };

  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
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
    console.log('onFileChange files.length: ', files.length);
    if (!files.length) {
      this.props.clearImageData();
    } else if (this.multipleUpload && files.length > 1) {
      this.handleMultipleFiles(files);
    } else if (files.length === 1) {
      if (!typeof files[0] instanceof Blob) {
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
    this.refs.imageInput.value = null;
  };

  handleCordovaImage = () => {
    const onDeviceReady = () => {
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

  renderPreview = () => {
    const { imageUrl, DefaultImage, options } = this.props;
    const fullWidth = options && options.fullWidth;
    if (fullWidth && imageUrl) {
      return (
        <img src={imageUrl} style={imagePreviewStyles.fullWidthPicture} alt="event" />
      );
    }
    if (imageUrl) {
      return (
        <Avatar src={imageUrl} size={120} />
      );
    }
    return DefaultImage
      ? <DefaultImage />
      : <ImageIcon style={imagePreviewStyles.imageIcon} />;
  };

  render() {
    return (
      <IconButton
        containerElement={!navigator.camera ? 'label' : 'div'}
        style={imagePreviewStyles.root}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
        onTouchTap={navigator.camera ? this.handleCordovaImage : () => {}}
      >
        {this.renderPreview()}
        {!navigator.camera
          ? <input
            ref="imageInput"
            style={imagePreviewStyles.input}
            accept={this.acceptFileTypes}
            size="1000"
            type="file"
            multiple={this.multipleUpload}
            onChange={this.onFileChange}
          />
          : ''}
        {this.state.isHovered
          ? <div style={imagePreviewStyles.onHover.root}>
            <FileUpload style={imagePreviewStyles.onHover.uploadIcon} />
            {this.props.imageUrl ?
              <IconButton
                style={imagePreviewStyles.onHover.deleteIcon}
                onTouchTap={() => this.props.clearImageData(true)}
                tooltip={messages['delete_image']}
              >
                <DeleteIcon />
              </IconButton>
              : ''}
          </div>
          : ''}
      </IconButton>
    );
  }
}

export default ImagePreview;
