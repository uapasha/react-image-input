import React, { PropTypes, Component } from 'react';
import Avatar from 'material-ui/Avatar';
import { IconButton } from 'material-ui';
import ImageIcon from 'material-ui/svg-icons/image/image';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import images from './utils/images';
import messages from './utils/messages';

const styles = {
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
      this.allowedFileTypes = this.defaultFileTypes;
    }
  }

  onFileChange = (e) => {
    const { files } = e.target;
    if (!files.length) {
      this.props.clearImageData();
    } else if (files.length === 1) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        const { imageType } = this.checkFile(reader.result);
        if (!imageType) return;
        this.props.setImageUrl({ imageData: reader.result, imageType });
      };
    } else {
      this.handleMultipleFiles(files);
    }
    this.refs.imageInput.value = null;
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
        <img src={imageUrl} style={styles.fullWidthPicture} alt="event" />
      );
    }
    if (imageUrl) {
      return (
        <Avatar src={imageUrl} size={120} />
      );
    }
    return DefaultImage
      ? <DefaultImage />
      : <ImageIcon style={styles.imageIcon} />;
  };

  render() {
    return (
      <IconButton
        containerElement="label"
        style={styles.root}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        {this.renderPreview()}
        <input
          ref="imageInput"
          style={styles.input}
          accept={this.acceptFileTypes}
          size="1000"
          type="file"
          multiple={this.multipleUpload}
          onChange={this.onFileChange}
        />
        {this.state.isHovered
          ? <div style={styles.onHover.root}>
            <FileUpload style={styles.onHover.uploadIcon} />
            {this.props.imageUrl ?
              <IconButton
                style={styles.onHover.deleteIcon}
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
