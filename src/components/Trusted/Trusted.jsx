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
              <div className="trusted__item">
                <a href="http://edgeworx.io/">
                  <img height="40" srcSet={logoEdgeworx} alt="Edgeworx" />
                </a>
              </div>
              <div className="trusted__item">
                <a href="https://iot.eclipse.org/">
                  <img height="55" srcSet={logoIoT} alt="IoT Eclipse" />
                </a>
              </div>
              <div className="trusted__item">
                <a href="https://projects.eclipse.org/proposals/iofog">
                  <img
                    height="50"
                    srcSet={logoEclipse}
                    alt="Eclipse Foundation"
                  />
                </a>
              </div>
            </div>
          </section>
        </section>
      </section>
    );
  }
}

export default Trusted;
