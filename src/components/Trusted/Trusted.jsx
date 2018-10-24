import React, { Component } from 'react';
import { Link } from 'gatsby';
import './Trusted.scss';

import logoEdgeworx from '../../../static/images/logos/edgeworx.svg';
import logoIoT from '../../../static/images/logos/iot.svg';
import logoEclipse from '../../../static/images/logos/eclipse.svg';

class Trusted extends Component {
  render() {
    return (
      <section className="container trusted">
        <section className="row">
          <section className="col-md-12">
            <div className="title">Sponsored by</div>
            <div className="trusted__container">
              <div className="trusted__item"><Link to="http://edgeworx.io/"><img height="40" srcSet={logoEdgeworx} alt="Edgeworx" /></Link></div>
              <div className="trusted__item"><Link to="https://iot.eclipse.org/"><img height="55" srcSet={logoIoT} alt="IoT Eclipse" /></Link></div>
              <div className="trusted__item"><Link to="https://projects.eclipse.org/proposals/iofog"><img height="40" srcSet={logoEclipse} alt="Eclipse Foundation" /></Link></div>
            </div>
          </section>
        </section>
      </section>
    );
  }
}

export default Trusted;
