/** === input for uploading image component for react ===
 * User can select picture and crop it
 * You can also resize image before upload
 */

import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import SingleImage from './single-image';
import MultipleImages from './multiple-images';

const styles = {
  root: {
    textAlign: 'center',
    position: 'relative',
  },
  uploading: {
    root: {
      position: 'fixed',
      height: '100%',
      width: 'calc(100% - 12px)',
      backgroundColor: 'rgba(255,255,255,0.6)',
      top: '0',
      left: '0',
      margin: '0 6px',
      zIndex: '2000',
    },
    progress: {
      top: 'calc(50% - 50px)',
    },
  },
};

const ImageField = (props) => {
  const { isUploading, ...other } = props;
  // TODO uapasha return error if crop and multiple images selected instead of failing quietly
  const multipleUpload = other.options.multipleUpload
    && !other.options.crop
    || false;
  return (
    <div>
      <div style={styles.root}>
        {isUploading
          ? <div style={styles.uploading.root}>
            <CircularProgress style={styles.uploading.progress} />
          </div>
          : ''}
          {multipleUpload
          ? <MultipleImages {...other} />
          : <SingleImage {...other} />}
      </div>
    </div>
  );
};

ImageField.propTypes = {
  /**
   *  @param {string} [savedImage] - url to image that is already saved
   */
  savedImage: PropTypes.string,
  /**
   * @param {function} [defaultImage] - React component that renders
   * placeholder if savedImage is not provided
   */
  defaultImage: PropTypes.oneOfType([
    PropTypes.func, PropTypes.object,
  ]),
  /**
   * @param {function} onFileSelect - will be called when image selection
   * process is completed. Returns an array of Blobs
   */
  onFileSelect: PropTypes.func.isRequired,
  /**
   *  @param {function} [onError] - callback called when user select wrong fileType
   */
  onError: PropTypes.func,
  /**
   * @param {bool} [isUploading] - state of uploading of the image
   * be called when left button is pressed
   */
  isUploading: PropTypes.bool,
  /**
   *  @param {function} onImageDelete - callback called when deleteImage button pressed
   */
  onImageDelete: PropTypes.func,
  /**
   * @param {object} [options] - options for the component
   * @param {array} [options.allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif']] -
   * allowed file types in form of 'image/jpeg'
   * @param {bool} [options.fullWidth = false] - format of the image to be displayed
   * @param {bool} [options.resize = true] - resize image before upload
   * @param {number} [options.maxHeight = 300] - max value for height of resized image in px
   * @param {number} [options.maxWidth = 400] - max value for width of resized image in px
   * @crop {bool} [options.crop = true] - crop image before upload
   * @param {number} [options.cropAspectRatio = 1] - cropAspectRatio
   * @param {bool} [options.immediateUpload = false] - upload image immediately
   * @param {bool} [multipleUpload = false] - able to select and upload multiple images at once
   * is supported only if no crop applied
   */
  options: PropTypes.object,
};

export default ImageField;
