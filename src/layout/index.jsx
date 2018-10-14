import React, { Component } from 'react';
import Helmet from 'react-helmet';
import config from '../../data/SiteConfig';
import './bootstrap-no-print.scss'
import './index.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default class MainLayout extends Component {
  render() {
    const { children } = this.props;
    const configDate = { copyright: config.copyright };

    return (
      <div className="test">
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
