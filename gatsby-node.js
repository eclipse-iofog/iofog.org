const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  switch (node.internal.type) {
    case 'ConfigJson': {
      const fileNode = getNode(node.parent);
      createNodeField({
        name: 'path',
        node,
        value: `/${fileNode.relativeDirectory}/`
      });
      break;
    }

    case 'MarkdownRemark': {
      const { relativePath } = getNode(node.parent);
      createFilePath({ node, getNode });

      createNodeField({
        node,
        name: 'slug',
        value: `/${relativePath.replace('.md', '.html')}`
      });
      break;
    }

    default:
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return new Promise((resolve, reject) => {
    const docsComponent = path.resolve('src/templates/post.jsx');
    const releasesComponent = path.resolve('src/templates/releases.jsx');

    resolve(
      graphql(
        `
          {
            allConfigJson {
              edges {
                node {
                  version
                  menus {
                    subMenus {
                      entry {
                        relativePath
                        absolutePath
                      }
                    }
                  }
                  fields {
                    path
                  }
                }
              }
            }

            allMarkdownRemark {
              edges {
                node {
                  fields {
                    slug
                  }
                  fileAbsolutePath
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          reject(result.errors);
        }

        // We want to find the first docs file in the latest version so that we
        // can have /docs redirect to it
        const configs = result.data.allConfigJson.edges
          .slice()
          .sort((a, b) => b.node.version.localeCompare(a.node.version));
        const latestConfig = configs[0].node;
        const latestVersionBasePath = latestConfig.fields.path;
        const latestDocsStartFile =
          latestConfig.menus[0].subMenus[0].entry.absolutePath;
        let foundLatestDocsStartFile = false;

        result.data.allMarkdownRemark.edges.forEach(edge => {
          const { slug } = edge.node.fields;
          if (slug.startsWith('/docs/')) {
            createPage({
              path: slug,
              component: docsComponent,
              context: { slug }
            });
          } else if (slug === '/releases.html') {
            createPage({
              path: slug,
              component: releasesComponent,
              context: { slug }
            });
          } else {
            throw new Error(`Unrecognized slug ${slug}`);
          }

          if (slug.startsWith(latestVersionBasePath)) {
            createRedirect({
              fromPath: `/docs/${slug.slice(latestVersionBasePath.length)}`,
              isPermanent: true,
              redirectInBrowser: true,
              toPath: slug
            });
          }

          // The latest version changes, so we want to do this dynamically for
          // each build
          if (edge.node.fileAbsolutePath === latestDocsStartFile) {
            if (foundLatestDocsStartFile)
              throw new Error(
                `latestDocsStartFile was already found ${latestDocsStartFile}`
              );
            foundLatestDocsStartFile = true;

            createRedirect({
              fromPath: '/docs/',
              isPermanent: true,
              redirectInBrowser: true,
              toPath: slug
            });
          }
        });

        if (!foundLatestDocsStartFile)
          throw new Error(
            `no redirect for /docs setup, didn't find ${latestDocsStartFile}`
          );
      })
    );
  });
};
