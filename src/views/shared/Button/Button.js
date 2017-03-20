import React, { PropTypes } from 'react';

import Icon from '../Icon';

import styles from './Button.scss';

const Button = (props) => {
  const className = (props.className) ? styles[props.className] : styles.default;
  let icon = null;
  const style = {};
  if (props.icon) {
    icon = (
      <div className={styles.icon}>
        <Icon name={props.icon} size={24} color="#FFFFFF" />
      </div>
    );
    style.paddingLeft = 10;
  }
  return (
    <div className={styles.container} style={props.style}>
      <button className={className} onClick={props.onClick} style={style}>
        {icon}
        {props.value}
      </button>
    </div>
  );
};

Button.defaultProps = {
  className: null,
  value: 'OK',
  icon: null,
  style: null,
};

Button.propTypes = {
  className: PropTypes.any,
  value: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default Button;
