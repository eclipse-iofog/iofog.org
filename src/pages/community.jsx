import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';

import Community from "../components/Community/Community";

class CommunityPage extends Component {
  render() {
    return (
      <Layout>
        <div className="container entry">
          <Helmet title={`Community | ${config.siteTitle}`} />
          <Community />
        </div>
      </Layout>
    );
  }
}

export default CommunityPage;
