import React, { Component } from 'react';
import { Link } from 'gatsby';
import { FaGithub, FaTwitter, FaSlack } from 'react-icons/fa';
import './Footer.scss';
import config from '../../../data/SiteConfig';

import logoEdgeworx from '../../../static/images/logos/edgeworx.svg';
import logoEclipse from '../../../static/images/logos/eclipse.svg';
import siteLogo from '../../../static/images/logos/iofog.svg';
import logoIoT from '../../../static/images/logos/iot.svg';

class Footer extends Component {
  render() {
    const { copyright } = this.props.config;

    return (
      <footer className="footer">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="row">
                <div className="col-12 col-md-4 footer__main">
                  <Link to="/">
                    <img srcSet={siteLogo} alt="ioFog" />
                  </Link>
                  <p className="description">
                    Eclipse ioFog<sup>TM</sup> is free, open source, and always
                    will be.
                  </p>
                  <p className="footer__copyright d-none d-md-block">
                    {copyright}
                  </p>
                </div>
                <div className="col-12 col-md-3 footer__links">
                  <h4>More information</h4>
                  <div>
                    <span className="chevron right" />
                    <a href="https://www.eclipse.org/legal/">Legal</a>
                  </div>
                  <div>
                    <span className="chevron right" />
                    <a href="https://www.eclipse.org/security/">
                      Report Security Issues
                    </a>
                  </div>
                  <div>
                    <span className="chevron right" />
                    <a href="http://www.eclipse.org/legal/privacy.php">
                      Privacy Policy
                    </a>
                  </div>
                  <div>
                    <span className="chevron right" />
                    <a href="http://www.eclipse.org/legal/termsofuse.php">
                      Terms of Use
                    </a>
                  </div>
                  <div>
                    <span className="chevron right" />
                    <a href="http://www.eclipse.org/legal/copyright.php">
                      Copyright
                    </a>
                  </div>
                  <div>
                    <span className="chevron right" />
                    <a href="http://www.eclipse.org">Eclipse Foundation</a>
                  </div>
                </div>
                <div className="col-12 col-md-3 footer__by">
                  <h4>Contributing Organizations</h4>
                  <div className="item">
                    <a href="http://edgeworx.io/">
                      <img srcSet={logoEdgeworx} alt="Edgeworx" />
                    </a>
                  </div>
                  <div className="item">
                    <a href="https://iot.eclipse.org/">
                      <img height="30" srcSet={logoIoT} alt="IoT Eclipse" />
                    </a>
                  </div>
                  <div className="item">
                    <a href="http://www.eclipse.org">
                      <img
                        srcSet={logoEclipse}
                        alt="Eclipse Foundation Small"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-md-2 footer__follow">
                  <h4>Follow us</h4>
                  <a
                    href={config.userLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href={config.userLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href={config.userLinks.slack}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaSlack />
                  </a>
                </div>
                <div className="col-12 d-md-none">
                  <p className="footer__copyright">{copyright}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
