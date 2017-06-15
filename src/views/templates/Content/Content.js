import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Content extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Content.propTypes = {
  children: PropTypes.any
};

Content.defaultProps = {
  children: null
};

export default Content;
