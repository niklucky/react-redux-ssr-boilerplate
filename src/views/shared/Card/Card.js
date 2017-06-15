import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Card.scss';

class Card extends Component {
  getClassName = () => {
    const { className, onClick } = this.props;
    const cl = [styles.card];
    if (className) {
      cl.push(className);
    }
    if (onClick) {
      cl.push(styles.active);
    }
    return cl.join(' ');
  };

  renderCoverBg = () => {
    const { bg } = this.props;
    if (bg) {
      return (<div className={styles.coverBg} style={{ backgroundImage: `url(${bg})` }} />);
    }
    return null;
  };

  renderCoverImage = () => {
    const { image } = this.props;
    if (image) {
      return (<div className={styles.coverImage} style={{ backgroundImage: image }} />);
    }
    return null;
  };

  renderCoverIcon = () => {
    const { icon } = this.props;
    if (icon) {
      return (<div className={styles.coverIcon}>{icon}</div>);
    }
    return null;
  };

  renderCoverTitle = () => {
    const { coverTitle } = this.props;
    if (coverTitle === null) {
      return null;
    }
    if (typeof coverTitle === 'string') {
      return (<div className={styles.coverTitle}>{coverTitle}</div>);
    }
    return coverTitle;
  };

  renderCover = () => {
    const { image, bg, icon } = this.props;
    if (bg === null && image === null && icon === null) {
      return null;
    }
    return (
      <div className={styles.cover}>
        {this.renderCoverBg()}
        {this.renderCoverImage()}
        {this.renderCoverIcon()}
        {this.renderCoverTitle()}
      </div>
    );
  };

  render() {
    const { title, children, size, onClick } = this.props;
    return (
      <div className={styles[size]} onClick={onClick}>
        <div className={this.getClassName()}>
          {this.renderCover()}
          <div style={{ padding: 20 }}>
            {title &&
            <div className={styles.title}>{title}</div>
            }
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  className: PropTypes.string,
  image: PropTypes.string,
  bg: PropTypes.string,
  icon: PropTypes.any,
  coverTitle: PropTypes.any,
};

Card.defaultProps = {
  children: null,
  size: 'md',
  className: null,
  image: null,
  bg: null,
  icon: null,
  onClick: null,
  coverTitle: null,
  title: null,
};

export default Card;
