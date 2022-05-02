import React, { Component } from 'react';
import './index.scss';

import icoLightning from '../../../static/images/icos/ico-lightning.svg';
import icoSecurity from '../../../static/images/icos/ico-security.svg';
import icoApps from '../../../static/images/icos/ico-apps.svg';

const links = [
  {
    label: 'Edge Resources',
    description:
      'Easily organize & manage which apps can run on which sensors, cameras & physical edge devices',
    href: ''
  },
  {
    label: 'Application templates',
    description:
      'Create application templates to share your edge app anywhere with anyone.',
    href: ''
  },
  {
    label: 'See the ioFog 3.0 Release notes',
    description:
      'ioFog 3.0 has a few big new features and lots of stability and quality improvements. Check it out.',
    href: ''
  }
];

class WhatsNew extends Component {
  render() {
    return (
      <section className="">
        <section className="container">
          <section className="row">
            <section className="col-12">
              <div className="sections__header">
                <h4>What's new in ioFog 3.0</h4>
              </div>

              <div className="links__container row">
                {links.map((link, index) => (
                  <a href={link.href} key={index} className="link">
                    <div className="link__card">
                      <div className="link__title">{link.label}</div>
                      <div className="link__description">
                        {link.description}
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

export default WhatsNew;
