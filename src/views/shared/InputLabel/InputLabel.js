import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputLabel.scss';

const InputLabel = props => (
  <div className={styles.container}>
    {props.label}
  </div>
);

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

export default InputLabel;
