import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';
import Enterprise from '../components/Enterprise/Enterprise';

class EnterprisePage extends Component {
  render() {
    return (
      <Layout>
        <div className="container entry">
          <Helmet title={`Enterprise | ${config.siteTitle}`} />
          <Enterprise />
        </div>
      </Layout>
    );
  }
}

export default EnterprisePage;
