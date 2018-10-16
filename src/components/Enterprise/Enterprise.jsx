import React, { Component } from 'react';
import { Link } from 'gatsby';

import './Enterprise.scss';

class Enterprise extends Component {
  render() {
    return (
      <section className="row">
        <section className="col-md-12 text-center">
          <div className="sections__header text-center">
            <h6>Enterprise</h6>
            <h2>Run software at the edge.</h2>
            <p>This is a placeholder sentence this is a ramp-off page to Edgeworx. <br /> Supporting copy goes here,
              two sentences maximum.</p>
            <Link className="button" to="/">Learn about Edgeworx</Link>
          </div>

          <img src="/images/img-gallery-01.png" className="img-enterprise" alt="" />
        </section>
      </section>
    );
  }
}

export default Enterprise;
