import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';

import Preview from './preview';
import ActiveOverlay from './active-overlay';

const imagePreviewStyles = {
  root: {
    width: 'initial',
    height: '100%',
  },
  input: {
    display: 'none',
  },
};

class DefaultPreview extends Component {

  static propTypes ={
    imageUrl: PropTypes.string,
    DefaultImage: PropTypes.oneOfType([
      PropTypes.func, PropTypes.object,
    ]),
    clearImageData: PropTypes.func,
    fullWidth: PropTypes.bool,
    allowedFileTypes: PropTypes.array,
    multipleUpload: PropTypes.bool,
    onFileChange: PropTypes.func,
    uploadIconColor: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
    this.imageInputId = `image-input-ID_${Math.random()}`;
  }

  render() {
    const { imageUrl, DefaultImage, fullWidth, clearImageData, allowedFileTypes,
      multipleUpload, onFileChange, uploadIconColor } = this.props;
    return (
      <div>
        <IconButton
          component={
            ({ children }) =>
              <label
                htmlFor={this.imageInputId}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
              >
                {children}
              </label>
          }
          style={imagePreviewStyles.root}
        >
          <Preview DefaultImage={DefaultImage} fullWidth={fullWidth} imageUrl={imageUrl} />
          <ActiveOverlay
            isActive={this.state.isHovered}
            imageExists={!!imageUrl}
            clearImageData={clearImageData}
            uploadIconColor={uploadIconColor}
          />
        </IconButton>
        <input
          key="imageInput"
          id={this.imageInputId}
          ref={(input) => { this.imageInput = input; }}
          style={imagePreviewStyles.input}
          accept={allowedFileTypes}
          size="1000"
          type="file"
          multiple={multipleUpload}
          onChange={onFileChange}
        />
      </div>
    );
  }
}

export default DefaultPreview;
