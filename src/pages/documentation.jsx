import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Edgeworx from "../components/Egdeworx/Edgeworx";

class DocumentationPage extends Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <Helmet title={`Documentation | ${config.siteTitle}`} />
        </div>

        <Edgeworx />
      </Layout>
    );
  }
}

export default DocumentationPage;
