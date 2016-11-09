/** === input picture-field component for formsy-form ===
 */

import React, { PropTypes } from 'react';
import { HOC } from 'formsy-react';
import PictureField from './picture-field';

const FormsyPictureField = ({ setValue, ...props }) => (
  <PictureField onFileSelect={setValue} {...props} />
);

FormsyPictureField.propTypes = {
  setValue: PropTypes.func,
};

export default HOC(FormsyPictureField); // eslint-disable-line new-cap
