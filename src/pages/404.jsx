import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import config from '../../data/SiteConfig';

class NotFoundPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet title={`404 (Not Found) | ${config.siteTitle}`} />
        <div className="container entry">
          <section className="row">
            <section className="col-md-12">
              <div className="entry__header">
                <h2>Sorry, we can't find that page</h2>
                <p>404 (Not Found)</p>
                <p>
                  It seems the requested page at{' '}
                  <b>{this.props.location.pathname}</b> doesn't exist.
                </p>
              </div>
            </section>
          </section>
        </div>
      </Layout>
    );
  }
}

export default NotFoundPage;
