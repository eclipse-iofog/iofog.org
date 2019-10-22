const config = require('./data/SiteConfig');
const urljoin = require('url-join');

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),
    rssMetadata: {
      site_url: urljoin(config.siteUrl, config.pathPrefix),
      feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${urljoin(
        config.siteUrl,
        config.pathPrefix
      )}/logos/iofog.png`,
      copyright: config.copyright
    }
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`,
        ignore: ['**/_third_party/*', `${__dirname}/content/docs/next`]
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // https://github.com/jtstodola/gatsby-remark-embed-markdown/issues/1
          // We need gatsby-remark-prismjs on embedded markdown
          // {
          //   resolve: "gatsby-remark-embed-markdown",
          //   options: {
          //     // Example code links are relative to this dir.
          //     // eg examples/path/to/file.js
          //     directory: `${__dirname}/templates/`,
          //   }
          // },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 690
            }
          },
          {
            resolve: `gatsby-remark-relative-images`
          },
          {
            resolve: 'gatsby-remark-responsive-iframe'
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              showLineNumbers: true
            }
          },
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              // Deactivate the plugin globally (default: true)
              active: true,
              // Add a custom css class
              class: 'emoji-icon',
              // Select the size (available size: 16, 24, 32, 64)
              size: 64,
              // Add custom styles
              styles: {
                display: 'inline',
                margin: '0',
                'margin-top': '1px',
                position: 'relative',
                top: '5px',
                width: '25px'
              }
            }
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-copy-linked-files'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-catch-links`,
      options: {
        excludePattern: /rest-api\.html/
      }
    },
    'gatsby-plugin-twitter',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icons: [
          {
            src: '/logos/iofog.svg'
          },
          {
            src: '/logos/iofog.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logos/iofog.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    'gatsby-plugin-offline'
  ]
};
