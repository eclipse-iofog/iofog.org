import React, { Component } from 'react';
import { Link } from 'gatsby';

import logoEdgeworx from '../../../static/images/logos/edgeworx.svg';
import logoOrange from '../../../static/images/logos/edgeworx.svg';
import logoRedHat from '../../../static/images/logos/edgeworx.svg';
import logoVMWare from '../../../static/images/logos/edgeworx.svg';
import logoSiemens from '../../../static/images/logos/edgeworx.svg';

import './index.scss';

const logos = [logoEdgeworx, logoOrange, logoRedHat, logoVMWare, logoSiemens];

class Contributors extends Component {
  render() {
    return (
      <section className="container contributors">
        <section className="row">
          <section className="col-md-12">
            <div className="sections__header">
              <h4>ioFog Contributors</h4>
            </div>
            <div className="logos__container">
              {logos.map((logo, index) => (
                <div className="logo-container">
                  <img className="logo" key={index} src={logo} />
                </div>
              ))}
            </div>
          </section>
        </section>
      </section>
    );
  }
}

export default Contributors;
