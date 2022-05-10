import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import HomeTitle from '../components/HomeTitle';
import WhatsNew from '../components/WhatsNew';
import Contributors from '../components/Contributors';
import AboutProject from '../components/AboutProject/AboutProject';

import './home.scss';
import InUse from '../components/InUse';

const image = 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg';

class Index extends React.Component {
  render() {
    return (
      <Layout location="/">
        <Helmet title={config.siteTitle} />
        <SEO />

        <HomeTitle />
        <div class="home-section">
          <WhatsNew />
        </div>
        <div class="home-section">
          <section className="container">
            <div className="sections__header">
              <h4>ioFog bridges the gap between the Edge and the Cloud</h4>
            </div>
            <img src={image} style={{ width: '100%' }} />
          </section>
        </div>
        <div class="home-section" style={{ '--bg-color': '#2FD7F033' }}>
          <AboutProject />
        </div>
        <div class="home-section">
          <section class="quote">
            <section className="container">
              <div class="home__quote">
                “… K8s is great for 1 x 5,000 node cluster, ioFog is great for
                5,000 x 1 nodes clusters and everything in between…”
              </div>
            </section>
          </section>
        </div>
        <div class="home-section">
          <InUse />
        </div>
        <div class="home-section">
          <Contributors />
        </div>
      </Layout>
    );
  }
}

export default Index;
