import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import './b16-tomorrow-dark.css';
import './post.scss';
import PostListing from '../components/PostListing/PostListing';

export default class PostTemplate extends React.Component {
  render() {
    const { pageContext, data } = this.props;
    const { slug } = pageContext;
    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;
    const postEdges = data.allMarkdownRemark.edges;

    if (!post.id) {
      post.id = slug;
    }

    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }


    return (
      <Layout>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>

        <SEO postPath={slug} postNode={postNode} postSEO />

        <div className="post container">
          <div className="menu-list">
            <PostListing postEdges={postEdges} />
          </div>
          <div className="post-container bg-grey">
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          </div>
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
