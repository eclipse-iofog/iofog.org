import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';

class CommunityPage extends Component {
  render() {
    return (
      <Layout location="case-studies.html">
        <Helmet title={`Case Studies | ${config.siteTitle}`} />
        Hello world
      </Layout>
    );
  }
}

export default CommunityPage;
