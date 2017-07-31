import React, { PropTypes } from 'react';
import { IconButton } from 'material-ui';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FileUpload from 'material-ui/svg-icons/file/file-upload';

import messages from '../../utils/messages';


const onHoverStyles = {
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
};

const ActiveOverlay = ({ isActive, clearImageData, imageExists, onUploadTouch }) => (
  isActive
    ? <div style={onHoverStyles.root}>
      <FileUpload
        style={onHoverStyles.uploadIcon}
        onTouchTap={onUploadTouch || function () {}}
      />
      {imageExists ?
        <IconButton
          style={onHoverStyles.deleteIcon}
          onTouchTap={() => clearImageData(true)}
          tooltip={messages['delete_image']}
        >
          <DeleteIcon />
        </IconButton>
        : ''}
    </div>
    : null
);

ActiveOverlay.propTypes = {
  isActive: PropTypes.bool,
  clearImageData: PropTypes.func,
  imageExists: PropTypes.bool,
  onUploadTouch: PropTypes.func,
};

export default ActiveOverlay;
