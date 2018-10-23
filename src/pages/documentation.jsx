import React, { Component } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Edgeworx from "../components/Egdeworx/Edgeworx";
import PostListing from "../components/PostListing/PostListing";

class DocumentationPage extends Component {
  render() {
    const { data } = this.props;
    const postEdges = (data.allMarkdownRemark || {}).edges || [];

    return (
      <Layout location="documentation">
        <div className="container">
          <Helmet title={`Documentation | ${config.siteTitle}`} />

          <PostListing postEdges={postEdges} />
        </div>

        <Edgeworx />
      </Layout>
    );
  }
}

export default DocumentationPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery123 {
    allMarkdownRemark(
      filter: {frontmatter: {type: { eq: "documentation" }} }
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
            type
          }
        }
      }
    }
  }
`;
