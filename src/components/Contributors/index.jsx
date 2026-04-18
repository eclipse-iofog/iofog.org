import React, { Component } from 'react';

import logoDatasance from '../../../static/images/contributors/logo-datasance.svg';
import logoEdgeworx from '../../../static/images/contributors/logo-edgeworx.svg';
import logoOrange from '../../../static/images/contributors/logo-orange.svg';
import logoRedHat from '../../../static/images/contributors/logo-redhat.svg';
import logoVMWare from '../../../static/images/contributors/logo-VMware.svg';
import logoSiemens from '../../../static/images/contributors/logo-siemens.svg';

import './index.scss';

const logos = [
  { src: logoDatasance, alt: 'Datasance', className: 'logo--datasance' },
  { src: logoEdgeworx, alt: 'Edgeworx' },
  { src: logoOrange, alt: 'Orange' },
  { src: logoRedHat, alt: 'Red Hat' },
  { src: logoVMWare, alt: 'VMware' },
  { src: logoSiemens, alt: 'Siemens' }
];

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
                <div className="logo-container" key={index}>
                  <img className={`logo ${logo.className || ''}`} src={logo.src} alt={logo.alt} />
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
