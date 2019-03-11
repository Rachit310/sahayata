import React from 'react';

import SEO from '@containers/SEO';
import NavBar from '@components/NavBar';

class PageLayout extends React.Component {
  render () {
    return (
      <div className={'page-layout'}>
        <SEO
          pageTitle={this.props.pageTitle}
          pageUri={this.props.pageUri}
          asset={this.props.asset}
          channel={this.props.channel}
        />
        <NavBar />
        <div className={'content'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PageLayout;
