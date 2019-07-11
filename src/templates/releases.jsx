import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import SEO from '../components/SEO/SEO';

export default class ReleasesTemplate extends React.Component {
  render() {
    const { pageContext, data } = this.props;
    const { slug } = pageContext;
    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;

    return (
      <Layout location={slug}>
        <Helmet>
          <title>Eclipse ioFog Releases</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div className="container entry">
          <section className="row community">
            <section className="col-md-12">
              <h1>Releases</h1>
              <aside className="notifications note">
                <h3>
                  <img src="/images/icos/ico-note.svg" alt="" /> Want to install
                  or upgrade?
                </h3>
                <p>
                  This page contains a list of releases and their changes, but
                  installing or upgrading an Eclipse ioFog<sup>TM</sup> network
                  involves multiple components.
                </p>
                <p>
                  See the{' '}
                  <a href="/docs/getting-started/setup-your-controllers.html">
                    setup documentation
                  </a>{' '}
                  to install or upgrade ioFog .
                </p>
              </aside>
              <div
                ref={this.postRef}
                dangerouslySetInnerHTML={{ __html: postNode.html }}
              />
            </section>
          </section>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query PostsBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
    }
  }
`;
