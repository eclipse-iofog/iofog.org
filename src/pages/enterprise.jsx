import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';
import Subscription from '../components/Subscription/Subscription';
import Enterprise from '../components/Enterprise/Enterprise';

class EnterprisePage extends Component {
  render() {
    return (
      <Layout>
        <Helmet title={`Enterprise | ${config.siteTitle}`} />
        <Enterprise />

        <Subscription />
      </Layout>
    );
  }
}

export default EnterprisePage;
