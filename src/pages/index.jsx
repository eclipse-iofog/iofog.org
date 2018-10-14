import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import BringYourOwnEdge from '../components/BringYourOwnEdge/BringYourOwnEdge';
import RunSoftwareEdge from '../components/RunSoftwareEdge/RunSoftwareEdge';
import WhoUsing from '../components/WhoUsing/WhoUsing';
import AboutProject from '../components/AboutProject/AboutProject';
import Trusted from '../components/Trusted/Trusted';
import Subscription from '../components/Subscription/Subscription';

class Index extends React.Component {
  render() {
    return (
      <Layout location="/">
        <Helmet title={config.siteTitle} />
        <SEO />

        <BringYourOwnEdge />
        <RunSoftwareEdge />
        <WhoUsing />
        <AboutProject />
        <Trusted />
        <Subscription />
      </Layout>
    );
  }
}

export default Index;
