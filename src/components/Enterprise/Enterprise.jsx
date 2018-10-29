import React, { Component } from 'react';
import { Link } from 'gatsby';
import './Enterprise.scss';
import imgGallery from '../../../static/images/edgeworx-illustration-01.svg';

class Enterprise extends Component {
  render() {
    return (
      <div className="container entry">
        <section className="row">
          <section className="col-md-12">
            <div className="entry__header">
              <h6>Enterprise</h6>
              <h2>Enterprise-scale support and management</h2>
              <p>24/7 SLA, powerful administration tools, managed security, and more.</p>
              <a href="http://edgeworx.io/">Learn about Edgeworx</a>
            </div>

            <div className="img-holder">
              <img srcSet={imgGallery} alt="" />
            </div>
          </section>
        </section>
      </div>
    );
  }
}

export default Enterprise;
