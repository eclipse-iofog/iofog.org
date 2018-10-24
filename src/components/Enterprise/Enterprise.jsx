import React, { Component } from 'react';
import { Link } from 'gatsby';
import './Enterprise.scss';
import imgGallery from '../../../static/images/edgeworx-web.svg';

class Enterprise extends Component {
  render() {
    return (
      <div className="container entry">
        <section className="row">
          <section className="col-md-12">
            <div className="entry__header">
              <h6>Enterprise</h6>
              <h2>Run software at the edge.</h2>
              <p>This is a placeholder sentence this is a ramp-off page to Edgeworx. Supporting copy goes here, two sentences maximum.</p>
              <Link className="button" to="/">Learn about Edgeworx</Link>
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
