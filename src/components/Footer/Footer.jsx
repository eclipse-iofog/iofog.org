import React, { Component } from 'react';
import { Link } from 'gatsby';
import { FaGithub, FaTwitter, FaSlack } from 'react-icons/fa';
import './Footer.scss';
import config from '../../../data/SiteConfig';

import logoEdgeworx from '../../../static/images/logos/edgeworx.svg';
import logoEclipse from '../../../static/images/logos/eclipse.svg';
import siteLogo from '../../../static/images/logos/iofog.svg';

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
                    ioFog is free, open source, and always will be.
                  </p>
                  <p className="footer__copyright d-none d-md-block">
                    {copyright}
                  </p>
                </div>
                <div className="col-12 col-md-3 footer__links">
                  <div>
                    <a href="https://www.eclipse.org/legal/">Legal</a>
                  </div>
                  <div>
                    <Link to="/docs/contributing/guidelines.html">
                      Community guidelines
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-md-3 footer__by">
                  <h4>Sponsored by</h4>
                  <div className="item">
                    <a href="http://edgeworx.io/">
                      <img srcSet={logoEdgeworx} alt="Edgeworx" />
                    </a>
                  </div>
                  <div className="item">
                    <a href="https://projects.eclipse.org/proposals/iofog">
                      <img srcSet={logoEclipse} alt="Eclipse Foundation" />
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
