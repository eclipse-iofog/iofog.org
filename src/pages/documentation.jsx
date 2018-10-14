import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";

class DocumentationPage extends Component {
  render() {
    return (
      <Layout>
        <div className="about-container">
          <Helmet title={`Documentation | ${config.siteTitle}`} />
        </div>
      </Layout>
    );
  }
}

export default DocumentationPage;
