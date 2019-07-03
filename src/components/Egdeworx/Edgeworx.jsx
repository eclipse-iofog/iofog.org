import React, { Component } from 'react';
import { Link } from 'gatsby';
import './Edgeworx.scss';

import imgGallery from '../../../static/images/edgeworx-illustration-01.svg';

class Edgeworx extends Component {
  render() {
    return (
      <section className="edgeworx">
        <section className="container">
          <section className="row align-items-center">
            <section className="col-12 col-md-8" />
            <section className="col-12 col-md-4">
              <img srcSet={imgGallery} alt="" />
            </section>
          </section>
        </section>
      </section>
    );
  }
}

export default Edgeworx;
