import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';

import Community from "../components/Community/Community";

class CommunityPage extends Component {
  render() {
    return (
      <Layout location="community.html">
        <Helmet title={`Community | ${config.siteTitle}`} />
        <Community />
      </Layout>
    );
  }
}

export default CommunityPage;
