/** === input picture-field component for formsy-form ===
 */

import React, { PropTypes } from 'react';
import { HOC } from 'formsy-react';
import ImageField from './image-field';

const FormsyImageField = ({ setValue, ...props }) => (
  <ImageField onFileSelect={setValue} {...props} />
);

FormsyImageField.propTypes = {
  setValue: PropTypes.func,
};

export default HOC(FormsyImageField); // eslint-disable-line new-cap
