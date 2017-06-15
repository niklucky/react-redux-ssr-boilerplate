import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../templates/Header';
import Content from '../../templates/Content';
import Footer from '../../templates/Footer';

class Default extends Component {
  render() {
    return (
      <div >
        <Header />
        <Content>{this.props.children}</Content>
        <Footer />
      </div>
    );
  }
}

Default.propTypes = {
  children: PropTypes.any,
};

Default.defaultProps = {
  children: null
};

export default Default;
