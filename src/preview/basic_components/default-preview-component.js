import React, { PropTypes, Component } from 'react';
import { IconButton } from 'material-ui';

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
  };

  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  render() {
    const { imageUrl, DefaultImage, fullWidth, clearImageData, allowedFileTypes,
      multipleUpload, onFileChange } = this.props;
    return (
      <IconButton
        containerElement="label"
        style={imagePreviewStyles.root}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        <Preview DefaultImage={DefaultImage} fullWidth={fullWidth} imageUrl={imageUrl} />
        <input
          key="imageInput"
          ref={(input) => { this.imageInput = input; }}
          style={imagePreviewStyles.input}
          accept={allowedFileTypes}
          size="1000"
          type="file"
          multiple={multipleUpload}
          onChange={onFileChange}
        />
        <ActiveOverlay
          isActive={this.state.isHovered}
          imageExists={!!imageUrl}
          clearImageData={clearImageData}
        />
      </IconButton>
    );
  }
}

export default DefaultPreview;
