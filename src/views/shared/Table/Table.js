import React, { Component, PropTypes } from 'react';

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
