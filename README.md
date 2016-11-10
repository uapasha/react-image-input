# react-image-input

Simple include image upload into your react project

## Usage

1. npm install react-image-input
2. import 'react-image-input'

## Components:

- Image-input field
- formsy-react input field
- universal image select and preview component

## Props: 


@param {string} [savedImage] - url to image that is already saved

    savedImage: PropTypes.string,

@param {function} [defaultImage] - React component that renders
placeholder if savedImage is not provided

    defaultImage: PropTypes.oneOfType([
      PropTypes.func, PropTypes.object,
    ]),

@param {function} onFileSelect - will be called when image selection
process is completed. Returns an array of Blobs

    onFileSelect: PropTypes.func.isRequired,

 @param {function} [onError] - callback called when user select wrong fileType

    onError: PropTypes.func,

@param {bool} [isUploading] - state of uploading of the image
be called when left button is pressed

    isUploading: PropTypes.bool,

 @param {function} onImageDelete - callback called when deleteImage button pressed

    onImageDelete: PropTypes.func,

@param {object} [options] - options for the component

@param {array} [options.allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif']] -
allowed file types in form of 'image/jpeg'

@param {bool} [options.fullWidth = false] - format of the image to be displayed

@param {bool} [options.resize = true] - resize image before upload

@param {number} [options.maxHeight = 300] - max value for height of resized image in px

@param {number} [options.maxWidth = 400] - max value for width of resized image in px

@crop {bool} [options.crop = true] - crop image before upload

@param {number} [options.cropAspectRatio = 1] - cropAspectRatio

@param {bool} [options.immediateUpload = false] - upload image immediately

@param {bool} [multipleUpload = false] - able to select and upload multiple images at once
is supported only if no crop applied

    options: PropTypes.object,
## License

MIT
