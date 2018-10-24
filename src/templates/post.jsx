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
import swaggerSpec from '../../third_party/FogController/specs/swagger.yml';

export default class PostTemplate extends React.Component {
  postRef = React.createRef();

  async componentDidMount() {
    const swaggerEl = this.postRef.current.querySelector('swagger-ui');

    if (swaggerEl) {
      // swagger-ui doesn't work in SSR. In fact if you even
      // import it server-side it throws errors.
      const [{ default: SwaggerUI }, _] = await Promise.all([
        import('swagger-ui'),
        import('swagger-ui/dist/swagger-ui.css')
      ]);

      SwaggerUI({
        domNode: swaggerEl,
        //url: 'https://petstore.swagger.io/v2/swagger.json'
        spec: swaggerSpec
      })
    }
  }

  render() {
    const { pageContext, data } = this.props;
    const { slug, type, version } = pageContext;

    let activeLink = `/${type}${slug}`;

    if (version) {
      activeLink = `/${type}/${version}${slug}`;
    }

    const postNode = data.markdownRemark;
    const sidebarMenu = data[type];
    const post = postNode.frontmatter;

    return (
      <Layout location={type}>
        <Helmet>
          <title>{`${post.title} | ${post.category} | ${config.siteTitle}`}</title>
        </Helmet>

        <SEO postPath={slug} postNode={postNode} postSEO />

        <div className="container-fluid">
          <div className="row post">
            <div className="menu-list col-12 col-lg-3">
              <div className="row">
                <PostListing postEdges={sidebarMenu} activeLink={activeLink} />
              </div>
            </div>
            <div className="post-container col-12 col-lg-9 bg-grey">
              <div className="row">
                <div className="offset-1 offset-lg-1 offset-xl-1" />
                <div className="col-12 col-lg-10">
                  <div ref={this.postRef} dangerouslySetInnerHTML={{ __html: postNode.html }} />
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
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        category
      }
      fields {
        nextTitle
        nextSlug
        prevTitle
        prevSlug
        slug
      }
    }

    documentation: documentationJson {
      type
      versions {
        version
        title
        menus {
          title
          subMenus {
            title
            entry {
              ...menuEntry
            }          
          }
        }   
      }
    }

    releases: releasesJson {
      type
      versions {
        title
        menus {
          title
          subMenus {
            title
            entry {
              ...menuEntry
            }          
          }
        }   
      }
    }
  }

  fragment menuEntry on File {
      childMarkdownRemark {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
  }
`;
