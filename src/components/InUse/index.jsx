import React, { Component } from 'react';
import './index.scss';

import icoLightning from '../../../static/images/icos/ico-lightning.svg';
import icoSecurity from '../../../static/images/icos/ico-security.svg';
import icoApps from '../../../static/images/icos/ico-apps.svg';

const links = [
  {
    label: 'Darcy leverages ioFog to revolutionize edge AI for everyone.',
    img: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
    href: ''
  },
  {
    label:
      'Orange telecom leverages iofog to develop edge solutions faster than ever.',
    img: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
    href: ''
  }
];

class InUse extends Component {
  render() {
    return (
      <section className="run-software">
        <section className="container">
          <section className="row">
            <section className="col-12">
              <div className="sections__header">
                <h4>ioFog in use</h4>
              </div>

              <div className="inuse__container row">
                {links.map((link, index) => (
                  <a href={link.href} key={index} className="link">
                    <div className="inuse__card">
                      <div className="inuse__img">
                        <img src={link.img} alt="" />
                      </div>
                      <div className="inuse__card-content">
                        <div className="inuse__title">{link.label}</div>
                        <div className="inuse__link">Read Case Study</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </section>
        </section>
      </section>
    );
  }
}

export default InUse;
