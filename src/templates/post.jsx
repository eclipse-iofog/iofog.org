import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import './b16-tomorrow-dark.css';
import './post.scss';
import DocsSidebar from '../components/DocsSidebar/DocsSidebar';
import Edgeworx from '../components/Egdeworx/Edgeworx';

export default class PostTemplate extends React.Component {
  findTitle(menus, activePath) {
    for (const menu of menus) {
      for (const sub of menu.subMenus) {
        if (sub.entry.childMarkdownRemark.fields.slug === activePath) {
          return `${sub.title} | ${menu.title} | ${config.siteTitle}`;
        }
      }
    }

    return config.siteTitle;
  }

  componentDidMount() {
    // Web Components don't work when server-side rendering so we need to
    // lazy-load it
    import('./swagger-ui');
  }

  render() {
    const { pageContext, data } = this.props;
    const { slug: activePath } = pageContext;
    const postNode = data.markdownRemark;
    const versions = data.allConfigJson.edges.slice().sort((a, b) => {
      return b.node.version.localeCompare(a.node.version);
    });
    const activeVersion = versions.find(({ node: { fields } }) => {
      return activePath.startsWith(fields.path);
    });

    const title = this.findTitle(activeVersion.node.menus, activePath);

    return (
      <Layout location={activePath}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <SEO title={title} postPath={activePath} postNode={postNode} postSEO />
        <div className="container-fluid">
          <div className="row post">
            <div className="menu-list col-12 col-lg-3">
              <div className="row">
                <DocsSidebar
                  versions={versions}
                  activeVersion={activeVersion}
                  activePath={activePath}
                />
              </div>
            </div>
            <div className="post-container col-12 col-lg-9 bg-grey">
              <div className="row">
                <div className="offset-1 offset-lg-1 offset-xl-1" />
                <div className="col-12 col-lg-10">
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
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
    }

    allConfigJson {
      edges {
        node {
          version
          menus {
            title
            subMenus {
              title
              entry {
                ...menuEntry
              }
            }
          }
          fields {
            path
          }
        }
      }
    }
  }
`;
