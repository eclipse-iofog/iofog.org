import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import './b16-tomorrow-dark.css';
import './post.scss';
import PostListing from '../components/PostListing/PostListing';
import Edgeworx from "../components/Egdeworx/Edgeworx";

export default class PostTemplate extends React.Component {
  render() {
    const { pageContext, data } = this.props;
    const { slug, type, version } = pageContext;

    let activeLink = `/${type}${slug}`;

    if (version) {
      activeLink = `/${type}/${version}${slug}`;
    }

    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;
    const postEdges = data.allMarkdownRemark.edges;

    return (
      <Layout location={type}>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>

        <SEO postPath={slug} postNode={postNode} postSEO />

        <div className="container-fluid">
          <div className="row post">
            <div className="menu-list col-12 col-lg-3">
              <div className="row">
                <PostListing postEdges={postEdges} activeLink={activeLink} />
              </div>
            </div>
            <div className="post-container col-12 col-lg-9 bg-grey">
              <div className="row">
                <div className="offset-1 offset-lg-1 offset-xl-1" />
                <div className="col-12 col-lg-10 col-xl-8">
                  <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Edgeworx />
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $type: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
      }
      fields {
        nextTitle
        nextSlug
        prevTitle
        prevSlug
        slug
      }
    }
    
    allMarkdownRemark(filter: {frontmatter: { type: { eq: $type } }}) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            type
            category
            version
          }
        }
      }
    }
  }
`;
