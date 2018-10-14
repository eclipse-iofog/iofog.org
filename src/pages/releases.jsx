import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import config from '../../data/SiteConfig';
import PostListing from '../components/PostListing/PostListing';

class ReleasesPage extends Component {
  render() {
    const { children, data } = this.props;

    const postEdges = data.allMarkdownRemark.edges;

    return (
      <Layout>
        <div className="releases-container">
          <Helmet title={`Releases | ${config.siteTitle}`} />

          <PostListing postEdges={postEdges} />

          {children}
        </div>
      </Layout>
    );
  }
}

export default ReleasesPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
          }
        }
      }
    }
  }
`;