import React, { Component } from 'react';
import Helmet from 'react-helmet';
import config from '../../data/SiteConfig';
import './bootstrap-no-print.scss'
import './index.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

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
        </Helmet>

        {children}

        <Footer config={configDate} />
      </div>
    );
  }
}
