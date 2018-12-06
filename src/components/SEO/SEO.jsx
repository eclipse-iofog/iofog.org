import React, { Component } from 'react';
import Helmet from 'react-helmet';
import urljoin from 'url-join';
import config from '../../../data/SiteConfig';
import siteLogo from '../../../static/images/logos/iofog.png';

class SEO extends Component {
  render() {
    const { title, postNode, postPath } = this.props;
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const url = config.siteUrl + postPath;

    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : ''
      }
    ];
    return (
      <Helmet>
        {/* General tags */}
        <meta name="image" content={siteLogo} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={siteLogo} />
        <meta
          property="fb:app_id"
          content={config.siteFBAppID ? config.siteFBAppID : ''}
        />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={siteLogo} />
      </Helmet>
    );
  }
}

export default SEO;
