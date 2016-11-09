import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Cropper from 'react-cropper';
import '/node_modules/cropperjs/dist/cropper.css';
import messages from './messages';


// TODO uapasha handle style
const cropStyle = {
  height: 300,
  width: '100%',
};

const styles = {
  cropper: cropStyle,
};

class CropperDialog extends React.Component {
  static propTypes = {
    imagePreviewUrl: PropTypes.string,
    closeDialog: PropTypes.func,
    onCrop: PropTypes.func,
    open: PropTypes.bool,
    cropAspectRatio: PropTypes.number,
  };

  getActions = () => ([
    <FlatButton
      label={messages['crop']}
      primary
      keyboardFocused
      onTouchTap={this.handleCrop}
    />,
  ]);

  handleCrop = () => {
    const { onCrop, closeDialog } = this.props;
    onCrop(this.refs.cropper.getCroppedCanvas());
    closeDialog();
  };

  render() {
    const { open, imagePreviewUrl, cropAspectRatio } = this.props;
    return (
      <Dialog
        title={messages['crop_image']}
        actions={this.getActions()}
        modal
        open={open}
      >
        {open
          ? <Cropper
            ref="cropper"
            src={imagePreviewUrl}
            style={styles.cropper}
            viewMode={2}
            aspectRatio={cropAspectRatio || 1}
            guides={false}
            modal={false}
            background={false}
          />
          : ''}
      </Dialog>
    );
  }
}

export default CropperDialog;
