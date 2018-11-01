import React, { Component } from 'react';
import Helmet from 'react-helmet';
import config from '../../data/SiteConfig';
import '../../static/styles/index.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import favIcon16 from '../../static/images/favicon-16x16.png';
import favIcon32 from '../../static/images/favicon-32x32.png';
import favIcon96 from '../../static/images/favicon-96x96.png';

require("prismjs/themes/prism-okaidia.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");

export default class MainLayout extends Component {
  render() {
    const { children } = this.props;
    const configDate = { copyright: config.copyright };
    const isHomePage = this.props.location === '/';

    let wrapperClasses = 'page-wrapper ';

    if (isHomePage) {
      wrapperClasses += 'home'
    }

    return (
      <div className={wrapperClasses}>
        <Header location={this.props.location} />

        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,500" rel="stylesheet" />
          <link href={favIcon16} rel="icon" type="image/png" sizes="16x16" />
          <link href={favIcon32} rel="icon" type="image/png" sizes="32x32" />
          <link href={favIcon96} rel="icon" type="image/png" sizes="96x96" />
        </Helmet>

        {children}

        <Footer config={configDate} />
      </div>
    );
  }
}
