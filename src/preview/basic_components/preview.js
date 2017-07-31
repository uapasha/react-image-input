import React, { PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';

const previewStyles = {
  imageIcon: {
    height: 120,
    width: 120,
  },
  fullWidthPicture: {
    width: '100%',
  },
};


const Preview = ({ imageUrl, DefaultImage, fullWidth }) => {
  if (fullWidth && imageUrl) {
    return (
      <img src={imageUrl} style={previewStyles.fullWidthPicture} alt="event" />
    );
  }
  if (imageUrl) {
    return (
      <Avatar src={imageUrl} style={{ width: 120, height: 120 }} />
    );
  }
  return DefaultImage
    ? <DefaultImage />
    : <ImageIcon style={previewStyles.imageIcon} />;
};

Preview.propTypes = {
  imageUrl: PropTypes.string,
  DefaultImage: PropTypes.oneOfType([
    PropTypes.func, PropTypes.object,
  ]),
  fullWidth: PropTypes.bool,
};

export default Preview;
