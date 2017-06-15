import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    return (
      <div style={{ position: 'relative' }}>
        {this.props.children}
      </div>
    );
  }
}

Table.propTypes = {
  children: PropTypes.any.isRequired
};

export default Table;
