import React, { Component, PropTypes } from 'react';
import { Row, Column } from '../../shared';
import styles from './Tabs.scss';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active
    };
  }
  componentWillReceiveProps(props) {
    if (props.active !== this.state.active) {
      this.setState({ active: props.active });
    }
  }

  handleSelectTab = (tabId) => {
    if (this.props.onSelectTab) {
      return this.props.onSelectTab(tabId);
    }
    return this.setState({ active: tabId });
  };

  renderHeader = () => {
    if (this.props.header === null) {
      return null;
    }
    const keys = Object.keys(this.props.header);
    const width = 100 / keys.length;
    const style = { display: 'inline-block', width: `${width}%` };
    return keys.map((id) => {
      const tab = this.props.header[id];
      const className = (this.state.active === id) ? styles.tabHeaderActive : styles.tabHeader;
      return (
        <div key={id} style={style} onClick={() => (this.handleSelectTab(id))}>
          <div className={className}>
            {tab}
          </div>
        </div>
      );
    });
  };

  renderTabs = () => {
    if (this.props.tabs === null) {
      return null;
    }
    return Object.keys(this.props.tabs).map((id) => {
      const tab = this.props.tabs[id];
      const className = (this.state.active === id) ? styles.tabActive : styles.tab;
      return (
        <div key={id} className={className} >
          {tab}
        </div>
      );
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <Row >
          <Column lg={12} md={12} sm={12} xs={12} >
            <div className={styles.header}>
              {this.renderHeader()}
            </div>
          </Column>
        </Row>
        <div className={styles.content}>
          {this.renderTabs()}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  active: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  header: PropTypes.object.isRequired,
  tabs: PropTypes.object.isRequired,
  onSelectTab: PropTypes.func,
};

Tabs.defaultProps = {
  active: 0,
  onSelectTab: null
};

export default Tabs;
