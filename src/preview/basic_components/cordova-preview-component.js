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

class CordovaPreview extends Component {

  static propTypes ={
    imageUrl: PropTypes.string,
    DefaultImage: PropTypes.oneOfType([
      PropTypes.func, PropTypes.object,
    ]),
    clearImageData: PropTypes.func,
    fullWidth: PropTypes.bool,
    onImageSelect: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  handleTouch = () => {
    if (!this.state.isActive) {
      this.setState({
        isActive: true,
      });
    } else {
      this.props.onImageSelect();
      this.setState({
        isActive: false,
      });
    }
  };

  render() {
    const { DefaultImage, fullWidth, imageUrl, clearImageData } = this.props;
    return (
      <div>
        <IconButton
          style={imagePreviewStyles.root}
          onTouchTap={!this.state.isActive ? this.handleTouch : () => {}}
        >
          <ActiveOverlay
            isActive={this.state.isActive}
            imageExists={!!imageUrl}
            clearImageData={clearImageData}
            onUploadTouch={this.handleTouch}
          />
          <Preview DefaultImage={DefaultImage} fullWidth={fullWidth} imageUrl={imageUrl} />
        </IconButton>
      </div>
    );
  }
}

export default CordovaPreview;
