import React, { Component } from 'react';
import { Link } from 'gatsby';
import './Trusted.scss';

import logoEdgeworx from '../../../static/images/logos/logo-edgeworx.svg';
import logoEclipse from '../../../static/images/logos/logo-eclipse-footer.png';

class Trusted extends Component {
  render() {
    return (
      <section className="container trusted">
        <section className="row">
          <section className="col-md-12">
            <div className="title">Sponsored by</div>

            <div className="trusted__container">
              <div className="trusted__item"><Link to="/"><img height="40" srcSet={logoEdgeworx} alt="Edgeworx" /></Link></div>
              <div className="trusted__item"><Link to="/"><img height="40" srcSet={logoEclipse} alt="Eclipse Foundation" /></Link></div>
            </div>
          </section>
        </section>
      </section>
    );
  }
}

export default Trusted;
