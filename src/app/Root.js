import React, { Component, PropTypes } from 'react';

class Root extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Root.propTypes = {
  children: PropTypes.object,
};

Root.defaultProps = {
  children: null,
};

export default Root;
