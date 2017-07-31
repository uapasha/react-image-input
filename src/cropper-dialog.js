import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import messages from './utils/messages';


const cropStyles = {
  cropper: {
    height: 300,
    width: '100%',
  },
};

class CropperDialog extends React.Component {
  static propTypes = {
    imagePreviewUrl: PropTypes.string,
    cancelDialog: PropTypes.func,
    onCrop: PropTypes.func,
    open: PropTypes.bool,
    cropAspectRatio: PropTypes.number,
    alwaysCrop: PropTypes.bool,
  };

  getActions = () => ([
    !this.props.alwaysCrop ? <Button
      label={messages['dont_crop']}
      primary
      onTouchTap={this.handleClose}
    /> : null,
    <Button
      label={messages['crop']}
      primary
      keyboardFocused
      onTouchTap={this.handleCrop}
    />,
  ]);

  handleCrop = () => {
    const { onCrop } = this.props;
    onCrop(this.refs.cropper.getCroppedCanvas());
  };

  handleClose = () => {
    this.props.cancelDialog();
  };

  render() {
    const { open, imagePreviewUrl, cropAspectRatio } = this.props;
    return (
      <Dialog
        title={messages['crop_image']}
        actions={this.getActions()}
        modal
        open={open}
        onRequestClose={this.handleClose}
      >
        {open
          ? <Cropper
            ref="cropper"
            src={imagePreviewUrl}
            style={cropStyles.cropper}
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
